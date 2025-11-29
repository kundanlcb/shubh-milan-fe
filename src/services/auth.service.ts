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
  ApiLoginRequest,
  ApiRegisterRequest,
  ApiUser,

} from '../types/api.types';

class AuthService {
  /**
   * User login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const apiRequest: ApiLoginRequest = {
        identifier: credentials.emailOrPhone,
        password: credentials.password,
      };

      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.LOGIN,
        apiRequest
      );

      // Store tokens in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      if (response.userId) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, response.userId.toString());
      }

      // Store user profile if available
      const user = response.user || {
        id: response.userId?.toString() || '',
        fullName: '',
        email: '',
        phone: '',
        roles: [],
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      };

      if (user) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
      }

      // Return the login response
      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        userId: response.userId?.toString() || '',
        user: user,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * User registration
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      // Convert UI data to API format
      const birthYear = parseInt(data.profile.age.toString(), 10) > 0
        ? new Date().getFullYear() - data.profile.age
        : new Date().getFullYear() - 25;
      const dob = `${birthYear}-01-01`;

      const apiRequest: ApiRegisterRequest = {
        fullName: data.fullName,
        email: data.email,
        mobile: data.phone,
        password: data.password,
        gender: data.profile.gender,
        dob: dob,
        religion: data.profile.religion,
        caste: '', // Not collected in UI currently
        motherTongue: data.profile.motherTongue,
        maritalStatus: '', // Not collected in UI currently
        city: data.profile.location,
        state: '', // Not collected in UI currently
        country: 'India', // Default
        profilePhoto: data.profile.photos?.[0] || undefined,
      };

      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.REGISTER,
        apiRequest
      );

      // Registration successful - API returns { userId, status: "success" }
      // No tokens returned, user needs to login after registration
      return {
        userId: response.userId ? response.userId.toString() : undefined,
        success: response.status === 'success' || !!response.userId,
      };
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

  // Helper to map API User to UI User
  private mapApiUserToUiUser(apiUser: ApiUser | any): User {
    // Handle case where apiUser might be just the user object or nested
    const user = apiUser.user || apiUser;
    return {
      id: user.id?.toString() || '',
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.mobile || '',
      roles: user.roles || [],
      status: user.status || 'ACTIVE',
      createdAt: user.createdAt || new Date().toISOString(),
      lastLogin: user.lastLogin
    };
  }
}

// Export singleton instance
export const authService = new AuthService();
