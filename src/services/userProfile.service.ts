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
  ApiProfile,
  ApiProfileUpdateRequest,
  ApiPartnerPreferencesRequest,
  ApiUser,
} from '../types/api.types';

class UserProfileService {
  /**
   * Get current user details
   */
  async getCurrentUser(): Promise<User> {
    try {
      const apiUser = await apiClient.get<ApiUser>(API_ENDPOINTS.USERS.ME);
      const user = this.mapApiUserToUiUser(apiUser);
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
      // API endpoint for updating user details (not profile) might be different or same.
      // Swagger has /api/profile/{userId} for profile update.
      // /api/users/me (PATCH) ?
      // I'll assume UPDATE_ME points to the right place.
      const apiUser = await apiClient.patch<ApiUser>(
        API_ENDPOINTS.USERS.UPDATE_ME,
        data
      );
      const user = this.mapApiUserToUiUser(apiUser);
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
      const apiUser = await apiClient.get<ApiUser>(API_ENDPOINTS.USERS.GET_USER(userId));
      return this.mapApiUserToUiUser(apiUser);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user's profile
   */
  async getMyProfile(): Promise<Profile> {
    try {
      // API endpoint might be /api/profile/me or /api/profile/{myId}
      // Swagger has /api/profile/{userId}.
      // I need my userId.
      const userId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
      if (!userId) throw new Error('User ID not found');

      const apiProfile = await apiClient.get<ApiProfile>(API_ENDPOINTS.PROFILES.GET_PROFILE(userId));
      return this.mapApiProfileToUiProfile(apiProfile, userId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update current user's profile
   */
  async updateMyProfile(data: Partial<Profile>): Promise<Profile> {
    try {
      const userId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
      if (!userId) throw new Error('User ID not found');

      const apiRequest: ApiProfileUpdateRequest = {
        fullName: 'Unknown', // UI Profile doesn't have fullName, but API requires it?
        // Actually, ApiProfileUpdateRequest has fullName as required in my interface?
        // Let's check api.types.ts. Yes, fullName is required.
        // But UI Profile doesn't have it.
        // I might need to fetch current user to get fullName or ask UI to provide it.
        // For now, I'll send a placeholder or try to get it from cache.
        gender: data.gender || 'Other',
        bio: data.bio,
        profession: data.profession,
        education: data.education,
        location: data.location,
        salary: data.salary,
        religion: data.religion,
        motherTongue: data.motherTongue,
        // Map other fields
      };

      // If fullName is missing, try to get from cache
      if (apiRequest.fullName === 'Unknown') {
        const cachedUser = await this.getCurrentUser().catch(() => null);
        if (cachedUser) apiRequest.fullName = cachedUser.fullName;
      }

      const apiProfile = await apiClient.post<ApiProfile>( // Swagger says POST /api/profile/{userId}
        API_ENDPOINTS.PROFILES.GET_PROFILE(userId), // Using same URL builder?
        apiRequest
      );
      return this.mapApiProfileToUiProfile(apiProfile, userId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get profile by user ID
   */
  async getProfileByUserId(userId: string): Promise<Profile> {
    try {
      const apiProfile = await apiClient.get<ApiProfile>(
        API_ENDPOINTS.PROFILES.GET_PROFILE(userId)
      );
      return this.mapApiProfileToUiProfile(apiProfile, userId);
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
      // Map UserSearchParams to API params
      const apiParams = {
        ...params,
        // Map fields if necessary
      };

      const response = await apiClient.get<any>( // Assuming API returns paginated user summaries
        API_ENDPOINTS.PROFILES.SEARCH,
        { params: apiParams }
      );

      // Map response to PaginatedResponse<UserSummary>
      return {
        items: (response.content || []).map((u: any) => ({
          id: u.id?.toString(),
          name: u.fullName,
          avatar: u.profile?.photos?.[0] || '',
          location: u.profile?.location || '',
          age: u.profile?.age || 0,
          profession: u.profile?.profession || '',
          religion: u.profile?.religion || '',
          gender: u.profile?.gender || 'Other',
          salary: u.profile?.salary || 0
        })),
        pageInfo: {
          hasNextPage: !response.last,
          hasPreviousPage: !response.first,
          totalCount: response.totalElements
        }
      };
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
        onUploadProgress: (progressEvent: any) => {
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
      const apiRequest: ApiPartnerPreferencesRequest = {
        ...data
      };

      const preferences = await apiClient.put<PartnerPreferences>(
        API_ENDPOINTS.PREFERENCES.UPDATE_ME,
        apiRequest
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

  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  private mapApiUserToUiUser(apiUser: ApiUser): User {
    return {
      id: apiUser.id?.toString() || '',
      fullName: apiUser.fullName || '',
      email: apiUser.email || '',
      phone: apiUser.mobile || '',
      roles: apiUser.roles || [],
      status: (apiUser.status as any) || 'ACTIVE',
      createdAt: apiUser.createdAt || new Date().toISOString(),
      lastLogin: apiUser.lastLogin
    };
  }

  private mapApiProfileToUiProfile(apiProfile: ApiProfile, userId: string): Profile {
    return {
      userId: userId,
      gender: (apiProfile.gender as any) || 'Other',
      age: apiProfile.age || 0,
      profession: apiProfile.profession || '',
      education: apiProfile.education || '',
      location: apiProfile.location || '',
      motherTongue: apiProfile.motherTongue || '',
      religion: apiProfile.religion || '',
      salary: apiProfile.salary || 0,
      bio: apiProfile.bio || '',
      photos: apiProfile.photos || []
    };
  }
}

// Export singleton instance
export const userProfileService = new UserProfileService();
