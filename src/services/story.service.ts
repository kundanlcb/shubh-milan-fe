/**
 * Story Service
 * Handles stories functionality
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import type { Story, CreateStoryRequest } from '../types/api.types';

class StoryService {
  /**
   * Get all stories
   */
  async getAllStories(): Promise<Story[]> {
    try {
      return await apiClient.get<Story[]>(API_ENDPOINTS.STORIES.GET_ALL);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new story
   */
  async createStory(data: CreateStoryRequest): Promise<Story> {
    try {
      return await apiClient.post<Story>(API_ENDPOINTS.STORIES.CREATE, data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a single story by ID
   */
  async getStoryById(storyId: string): Promise<Story> {
    try {
      return await apiClient.get<Story>(
        API_ENDPOINTS.STORIES.GET_STORY(storyId)
      );
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
}

// Export singleton instance
export const storyService = new StoryService();
