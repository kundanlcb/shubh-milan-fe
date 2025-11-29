/**
 * API Client
 * Axios-based HTTP client with authentication and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAPIConfig, STORAGE_KEYS, HTTP_STATUS, setDynamicBaseURL } from '../config/api.config';
import type { ApiError } from '../types/api.types';
import { SnackbarManager } from '../components/Snackbar';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    const apiConfig = getAPIConfig();
    this.client = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public updateBaseURL(baseURL: string) {
    this.client.defaults.baseURL = baseURL;
    setDynamicBaseURL(baseURL);
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const token = await this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const apiConfig = getAPIConfig();
        if (apiConfig.enableLogging) {
          console.log('API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors and refresh token
    this.client.interceptors.response.use(
      (response) => {
        const apiConfig = getAPIConfig();
        if (apiConfig.enableLogging) {
          console.log('API Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data,
          });
        }

        // Show success snackbar for mutation requests
        const method = response.config.method?.toLowerCase();
        if (method === 'post' || method === 'put' || method === 'patch' || method === 'delete') {
          // Don't show for background token refresh or specific endpoints if needed
          if (!response.config.url?.includes('/auth/refresh')) {
            // Optional: Check if response has a message to show
            // const message = response.data?.message || 'Success';
            // SnackbarManager.show({ message, type: 'success' });
            // For now, let's stick to generic success or specific if provided, but user asked for popup for success/failures.
            // I'll use a generic success unless data.message exists.
            const message = response.data?.message || 'Operation successful';
            SnackbarManager.show({ message, type: 'success' });
          }
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized - attempt token refresh
        if (
          error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
          !originalRequest._retry
        ) {
          if (this.isRefreshing) {
            // Queue the request while token is being refreshed
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return this.client(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshAccessToken();
            this.processQueue(null, newToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            await this.clearAuth();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        const apiError = this.handleError(error);

        // Show error snackbar
        // Don't show for 401 as it might be handled by refresh logic or redirect
        if (error.response?.status !== HTTP_STATUS.UNAUTHORIZED) {
          SnackbarManager.show({ message: apiError.message, type: 'error' });
        }

        return Promise.reject(apiError);
      }
    );
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private handleError(error: AxiosError): ApiError {
    const apiConfig = getAPIConfig();
    if (apiConfig.enableLogging) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    if (error.response) {
      // Server responded with error
      const data = error.response.data as any;
      return {
        code: data?.code || `HTTP_${error.response.status}`,
        message: data?.message || error.message || 'An error occurred',
        details: data?.details,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
      };
    } else {
      // Error setting up request
      return {
        code: 'REQUEST_ERROR',
        message: error.message || 'An unexpected error occurred',
      };
    }
  }

  private async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  private async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await this.client.post<any>(
        '/auth/refresh',
        { refreshToken }
      );

      const responseData = response.data?.data || response.data;
      const { accessToken, refreshToken: newRefreshToken } = responseData;

      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      if (newRefreshToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  private async clearAuth(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_ID,
        STORAGE_KEYS.USER_PROFILE,
      ]);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  }

  // Public methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<any>(url, config);
    // Handle both wrapped { data: {...} } and direct response formats
    return response.data?.data !== undefined ? response.data.data : response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<any>(url, data, config);
    // Handle both wrapped { data: {...} } and direct response formats
    return response.data?.data !== undefined ? response.data.data : response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<any>(url, data, config);
    // Handle both wrapped { data: {...} } and direct response formats
    return response.data?.data !== undefined ? response.data.data : response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<any>(url, data, config);
    // Handle both wrapped { data: {...} } and direct response formats
    return response.data?.data !== undefined ? response.data.data : response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<any>(url, config);
    // Handle both wrapped { data: {...} } and direct response formats
    return response.data?.data !== undefined ? response.data.data : response.data;
  }

  // Upload with progress
  async upload<T>(
    url: string,
    data: FormData,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const response = await this.client.post<any>(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    // Handle both wrapped { data: {...} } and direct response formats
    return response.data?.data !== undefined ? response.data.data : response.data;
  }

  // Get the raw axios instance if needed
  getInstance(): AxiosInstance {
    return this.client;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
