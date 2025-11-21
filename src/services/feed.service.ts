/**
 * Feed and Posts Service
 * Handles feed, posts, likes, and comments
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import type {
  PostData,
  CreatePostRequest,
  FeedFilters,
  PaginatedResponse,
  Comment,
  CreateCommentRequest,
} from '../types/api.types';

class FeedService {
  /**
   * Get feed with filters
   */
  async getFeed(
    filters?: FeedFilters,
    pagination?: { page?: number; pageSize?: number }
  ): Promise<PaginatedResponse<PostData>> {
    try {
      const params = {
        ...filters,
        ...pagination,
      };
      return await apiClient.get<PaginatedResponse<PostData>>(
        API_ENDPOINTS.FEED.GET_FEED,
        { params }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new post
   */
  async createPost(data: CreatePostRequest): Promise<PostData> {
    try {
      return await apiClient.post<PostData>(
        API_ENDPOINTS.FEED.CREATE_POST,
        data
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a single post by ID
   */
  async getPostById(postId: string): Promise<PostData> {
    try {
      return await apiClient.get<PostData>(
        API_ENDPOINTS.FEED.GET_POST(postId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Like a post
   */
  async likePost(postId: string): Promise<{ likes: number; isLiked: boolean }> {
    try {
      return await apiClient.post<{ likes: number; isLiked: boolean }>(
        API_ENDPOINTS.FEED.LIKE_POST(postId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Unlike a post
   */
  async unlikePost(postId: string): Promise<{ likes: number; isLiked: boolean }> {
    try {
      return await apiClient.delete<{ likes: number; isLiked: boolean }>(
        API_ENDPOINTS.FEED.UNLIKE_POST(postId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Toggle like on a post (convenience method)
   */
  async toggleLike(
    postId: string,
    isCurrentlyLiked: boolean
  ): Promise<{ likes: number; isLiked: boolean }> {
    try {
      if (isCurrentlyLiked) {
        return await this.unlikePost(postId);
      } else {
        return await this.likePost(postId);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get comments for a post
   */
  async getComments(
    postId: string,
    pagination?: { page?: number; pageSize?: number }
  ): Promise<PaginatedResponse<Comment>> {
    try {
      return await apiClient.get<PaginatedResponse<Comment>>(
        API_ENDPOINTS.FEED.GET_COMMENTS(postId),
        { params: pagination }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add a comment to a post
   */
  async addComment(
    postId: string,
    data: CreateCommentRequest
  ): Promise<Comment> {
    try {
      return await apiClient.post<Comment>(
        API_ENDPOINTS.FEED.ADD_COMMENT(postId),
        data
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user's own posts
   */
  async getMyPosts(pagination?: {
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<PostData>> {
    try {
      return await apiClient.get<PaginatedResponse<PostData>>(
        API_ENDPOINTS.FEED.GET_FEED,
        {
          params: {
            ...pagination,
            onlyMyPosts: true,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get posts by a specific user
   */
  async getUserPosts(
    userId: string,
    pagination?: { page?: number; pageSize?: number }
  ): Promise<PaginatedResponse<PostData>> {
    try {
      return await apiClient.get<PaginatedResponse<PostData>>(
        API_ENDPOINTS.FEED.GET_FEED,
        {
          params: {
            ...pagination,
            userId,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const feedService = new FeedService();
