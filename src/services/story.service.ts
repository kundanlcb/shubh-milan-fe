/**
 * Story Service
 * Handles stories functionality
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import type { Story, CreateStoryRequest, ApiStory, ApiStoryRequest } from '../types/api.types';

class StoryService {
  /**
   * Get all stories
   */
  async getAllStories(): Promise<Story[]> {
    try {
      const apiStories = await apiClient.get<ApiStory[]>(API_ENDPOINTS.STORIES.GET_ALL);
      return apiStories.map(story => this.mapApiStoryToUiStory(story));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new story
   */
  async createStory(data: CreateStoryRequest): Promise<Story> {
    try {
      const apiRequest: ApiStoryRequest = {
        mediaUrl: data.mediaKey, // Assuming key is URL or handled by backend
        mediaType: data.type.toUpperCase()
      };

      const apiStory = await apiClient.post<ApiStory>(API_ENDPOINTS.STORIES.CREATE, apiRequest);
      return this.mapApiStoryToUiStory(apiStory);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a single story by ID
   */
  async getStoryById(storyId: string): Promise<Story> {
    try {
      const apiStory = await apiClient.get<ApiStory>(
        API_ENDPOINTS.STORIES.GET_STORY(storyId)
      );
      return this.mapApiStoryToUiStory(apiStory);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark story as viewed
   */
  async viewStory(storyId: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.STORIES.VIEW_STORY(storyId));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get stories grouped by user
   */
  async getStoriesGroupedByUser(): Promise<
    Array<{ userId: string; userName: string; userAvatar: string; stories: Story[] }>
  > {
    try {
      const stories = await this.getAllStories();

      // Group stories by user
      const groupedMap = new Map<
        string,
        { userId: string; userName: string; userAvatar: string; stories: Story[] }
      >();

      stories.forEach((story) => {
        if (!story.user) return;

        const userId = story.userId;
        if (!groupedMap.has(userId)) {
          groupedMap.set(userId, {
            userId,
            userName: story.user.name,
            userAvatar: story.user.avatar,
            stories: [],
          });
        }

        groupedMap.get(userId)!.stories.push(story);
      });

      // Sort stories within each group by createdAt
      const grouped = Array.from(groupedMap.values());
      grouped.forEach((group) => {
        group.stories.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      return grouped;
    } catch (error) {
      throw error;
    }
  }

  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  private mapApiStoryToUiStory(apiStory: ApiStory): Story {
    return {
      id: apiStory.id?.toString() || '',
      userId: apiStory.user?.id?.toString() || '',
      user: apiStory.user ? {
        id: apiStory.user.id?.toString() || '',
        name: apiStory.user.fullName || 'Unknown',
        avatar: apiStory.user.profile?.photos?.[0] || '',
        location: apiStory.user.profile?.location || '',
        age: apiStory.user.profile?.age || 0,
        profession: apiStory.user.profile?.profession || '',
        religion: apiStory.user.profile?.religion || '',
        gender: (apiStory.user.profile?.gender as any) || 'Other',
        salary: apiStory.user.profile?.salary || 0
      } : undefined,
      uri: apiStory.mediaUrl || '',
      type: (apiStory.mediaType?.toLowerCase() as 'image' | 'video') || 'image',
      createdAt: apiStory.createdAt || new Date().toISOString(),
      expiresAt: apiStory.expiresAt || new Date().toISOString(),
      viewersCount: apiStory.viewCount || 0,
      isViewed: false // API doesn't return this
    };
  }
}

// Export singleton instance
export const storyService = new StoryService();
