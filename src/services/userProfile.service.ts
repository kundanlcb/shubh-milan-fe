/**
 * User and Profile Service
 * Handles user profile operations
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api.client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/api.config';
import type {
  User,
  Profile,
  PartnerPreferences,
  UserSearchParams,
  PaginatedResponse,
  UserSummary,
  PresignUploadRequest,
  PresignUploadResponse,
} from '../types/api.types';

class UserProfileService {
  /**
   * Get current user details
   */
  async getCurrentUser(): Promise<User> {
    try {
      const user = await apiClient.get<User>(API_ENDPOINTS.USERS.ME);
      // Cache user profile
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update current user
   */
  async updateCurrentUser(data: Partial<User>): Promise<User> {
    try {
      const user = await apiClient.patch<User>(
        API_ENDPOINTS.USERS.UPDATE_ME,
        data
      );
      // Update cached profile
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    try {
      return await apiClient.get<User>(API_ENDPOINTS.USERS.GET_USER(userId));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user's profile
   */
  async getMyProfile(): Promise<Profile> {
    try {
      return await apiClient.get<Profile>(API_ENDPOINTS.PROFILES.ME);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update current user's profile
   */
  async updateMyProfile(data: Partial<Profile>): Promise<Profile> {
    try {
      return await apiClient.patch<Profile>(
        API_ENDPOINTS.PROFILES.UPDATE_ME,
        data
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get profile by user ID
   */
  async getProfileByUserId(userId: string): Promise<Profile> {
    try {
      return await apiClient.get<Profile>(
        API_ENDPOINTS.PROFILES.GET_PROFILE(userId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search/filter users
   */
  async searchUsers(
    params: UserSearchParams
  ): Promise<PaginatedResponse<UserSummary>> {
    try {
      return await apiClient.get<PaginatedResponse<UserSummary>>(
        API_ENDPOINTS.PROFILES.SEARCH,
        { params }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get presigned URLs for photo upload
   */
  async getPhotoUploadUrls(
    request: PresignUploadRequest
  ): Promise<PresignUploadResponse> {
    try {
      return await apiClient.post<PresignUploadResponse>(
        API_ENDPOINTS.PROFILES.PHOTOS_PRESIGN,
        request
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload photo to presigned URL
   */
  async uploadPhotoToPresignedUrl(
    url: string,
    file: Blob | File,
    contentType: string,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    try {
      const instance = apiClient.getInstance();
      await instance.put(url, file, {
        headers: {
          'Content-Type': contentType,
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
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get partner preferences
   */
  async getPartnerPreferences(): Promise<PartnerPreferences> {
    try {
      const preferences = await apiClient.get<PartnerPreferences>(
        API_ENDPOINTS.PREFERENCES.ME
      );
      // Cache preferences
      await AsyncStorage.setItem(
        STORAGE_KEYS.PREFERENCES,
        JSON.stringify(preferences)
      );
      return preferences;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update partner preferences
   */
  async updatePartnerPreferences(
    data: Partial<PartnerPreferences>
  ): Promise<PartnerPreferences> {
    try {
      const preferences = await apiClient.put<PartnerPreferences>(
        API_ENDPOINTS.PREFERENCES.UPDATE_ME,
        data
      );
      // Update cached preferences
      await AsyncStorage.setItem(
        STORAGE_KEYS.PREFERENCES,
        JSON.stringify(preferences)
      );
      return preferences;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get cached partner preferences
   */
  async getCachedPreferences(): Promise<PartnerPreferences | null> {
    try {
      const prefsJson = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return prefsJson ? JSON.parse(prefsJson) : null;
    } catch (error) {
      return null;
    }
  }
}

// Export singleton instance
export const userProfileService = new UserProfileService();
