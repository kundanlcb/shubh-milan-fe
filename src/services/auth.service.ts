/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api.client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/api.config';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
  User,
} from '../types/api.types';

class AuthService {
  /**
   * User login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      // Store tokens and user info
      await this.storeAuthData(response);

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * User registration
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        data
      );

      // Store tokens
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, response.userId);

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * User logout
   */
  async logout(): Promise<void> {
    try {
      // Call logout API to invalidate tokens on server
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with local logout even if API fails
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage
      await this.clearAuthData();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<RefreshTokenResponse>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      // Update tokens in storage
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

      return response;
    } catch (error) {
      // If refresh fails, clear auth data
      await this.clearAuthData();
      throw error;
    }
  }

  /**
   * Send OTP for verification
   */
  async sendOTP(emailOrPhone: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.OTP_SEND, {
        [emailOrPhone.includes('@') ? 'email' : 'phone']: emailOrPhone,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify OTP
   */
  async verifyOTP(code: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.OTP_VERIFY, { code });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return !!token;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current user ID
   */
  async getCurrentUserId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
    } catch (error) {
      return null;
    }
  }

  /**
   * Get current user profile from storage
   */
  async getCachedUserProfile(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Store authentication data
   */
  private async storeAuthData(data: LoginResponse): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.ACCESS_TOKEN, data.accessToken],
        [STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken],
        [STORAGE_KEYS.USER_ID, data.userId],
        [STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.user)],
      ]);
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  }

  /**
   * Clear authentication data
   */
  private async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_ID,
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.PREFERENCES,
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  /**
   * Get stored access token
   */
  async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      return null;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
