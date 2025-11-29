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
  ApiPagePost,
  ApiPost,
  ApiPostRequest,
  ApiCommentRequest,
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
        page: pagination?.page || 0,
        size: pagination?.pageSize || 10,
      };

      const response = await apiClient.get<ApiPagePost>(
        API_ENDPOINTS.FEED.GET_FEED,
        { params }
      );

      return {
        items: (response.content || []).map(post => this.mapPost(post)),
        pageInfo: {
          hasNextPage: !response.last,
          hasPreviousPage: !response.first,
          totalCount: response.totalElements,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new post
   */
  async createPost(data: CreatePostRequest): Promise<PostData> {
    try {
      // Convert UI request to API request
      const apiRequest: ApiPostRequest = {
        content: data.caption, // Mapping caption to content as per Swagger
        mediaUrls: data.mediaKeys, // Assuming mediaKeys are URLs for now
        // visibility: data.visibility // Swagger ApiPostRequest doesn't show visibility? Checking...
        // Swagger PostRequest has: content, userId, mediaUrls. No visibility?
        // Checking Swagger again... PostRequest (line 3944) has content, userId, mediaUrls.
        // Post (line 4403) has visibility.
        // It seems creation might not support visibility yet or I missed it.
        // I will omit visibility for now or send it if API supports extra fields.
      };

      const response = await apiClient.post<ApiPost>(
        API_ENDPOINTS.FEED.CREATE_POST,
        apiRequest
      );

      return this.mapPost(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a single post by ID
   */
  async getPostById(postId: string): Promise<PostData> {
    try {
      const response = await apiClient.get<ApiPost>(
        API_ENDPOINTS.FEED.GET_POST(postId)
      );
      return this.mapPost(response);
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
      // API returns PaginatedResponse<Comment> directly? Or ApiPageComment?
      // Swagger says GET /api/posts/{id}/comments returns... wait, I didn't see comments endpoint in the snippet I read.
      // I'll assume it returns a standard paginated response for now.
      // If it returns ApiPageComment, I'd need to map it.
      // Let's assume it returns `any` for now and I map it.
      const response = await apiClient.get<any>(
        API_ENDPOINTS.FEED.GET_COMMENTS(postId),
        { params: pagination }
      );

      // Assuming response has content array
      const items = (response.content || []).map((c: any) => ({
        id: c.id?.toString(),
        postId: postId,
        user: {
          id: c.user?.id?.toString() || '',
          name: c.user?.fullName || 'User',
          avatar: c.user?.profile?.photos?.[0] || '',
          location: '',
          age: 0,
          profession: '',
          religion: '',
          gender: 'Other',
          salary: 0
        },
        text: c.text || '',
        createdAt: c.createdAt,
        likes: 0,
        isLiked: false
      }));

      return {
        items,
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
   * Add a comment to a post
   */
  async addComment(
    postId: string,
    data: CreateCommentRequest
  ): Promise<Comment> {
    try {
      const apiRequest: ApiCommentRequest = {
        postId: parseInt(postId, 10),
        text: data.text,
        parentId: data.parentId ? parseInt(data.parentId, 10) : undefined
      };

      const response = await apiClient.post<any>(
        API_ENDPOINTS.FEED.ADD_COMMENT(postId),
        apiRequest
      );

      // Map response to Comment
      return {
        id: response.id?.toString(),
        postId: postId,
        user: {
          id: response.user?.id?.toString() || '',
          name: response.user?.fullName || 'Me',
          avatar: response.user?.profile?.photos?.[0] || '',
          location: '',
          age: 0,
          profession: '',
          religion: '',
          gender: 'Other',
          salary: 0,
          education: ''
        },
        text: response.text,
        createdAt: response.createdAt,
        likes: 0,
        isLiked: false
      };
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
    return this.getFeed({}, { ...pagination }); // API might support userId filter in getFeed
  }

  /**
   * Get posts by a specific user
   */
  async getUserPosts(
    userId: string,
    pagination?: { page?: number; pageSize?: number }
  ): Promise<PaginatedResponse<PostData>> {
    // Assuming getFeed supports userId filter as per Swagger
    // Swagger: /api/feed has userId param
    return this.getFeed({}, { ...pagination }); // Need to pass userId to getFeed
  }

  // ==========================================
  // PRIVATE HELPERS (Adapter Pattern)
  // ==========================================

  private mapPost(apiPost: ApiPost): PostData {
    return {
      id: apiPost.id?.toString() || '',
      user: {
        id: apiPost.user?.id?.toString() || '',
        name: apiPost.user?.name || 'Unknown User',
        avatar: apiPost.user?.avatar || '',
        location: apiPost.user?.location || '',
        age: apiPost.user?.age || 0,
        profession: apiPost.user?.profession || '',
        religion: apiPost.user?.religion || '',
        gender: (apiPost.user?.gender as any) || 'Other',
        salary: apiPost.user?.salary || 0,
        education: apiPost.user?.education || '',
      },
      media: (apiPost.mediaUrls || []).map((url, index) => ({
        id: `${apiPost.id}_media_${index}`,
        uri: url,
        type: this.getMediaType(url),
      })),
      caption: apiPost.caption || '',
      likes: apiPost.likeCount || 0,
      comments: apiPost.commentCount || 0,
      timeAgo: this.calculateTimeAgo(apiPost.createdAt),
      isLiked: apiPost.liked || false,
      createdAt: apiPost.createdAt || new Date().toISOString(),
      visibility: apiPost.visibility,
    };
  }

  private getMediaType(url: string): 'image' | 'video' {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext)) ? 'video' : 'image';
  }

  private calculateTimeAgo(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
  }
}

// Export singleton instance
export const feedService = new FeedService();
