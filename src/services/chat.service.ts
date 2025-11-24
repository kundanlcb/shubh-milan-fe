/**
 * Chat Service
 * Handles chat threads and messaging
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api.client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/api.config';
import type {
  ChatThread,
  ChatMessage,
  SendMessageRequest,
  CreateThreadRequest,
  PaginatedResponse,
  ApiChat,
  ApiChatMessage,
  ApiSendMessageRequest,
  ApiUser,
  UserSummary,
} from '../types/api.types';

class ChatService {
  /**
   * Get all chat threads
   */
  async getChatThreads(): Promise<ChatThread[]> {
    try {
      const apiChats = await apiClient.get<ApiChat[]>(API_ENDPOINTS.CHAT.GET_THREADS);
      const currentUserId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
      return apiChats.map(chat => this.mapApiChatToUiThread(chat, currentUserId || ''));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new chat thread
   */
  async createThread(data: CreateThreadRequest): Promise<ChatThread> {
    try {
      // API expects participant ID to create a chat
      // Swagger: POST /api/chats?userId={userId}
      // Or body? Let's assume body or query param based on typical usage.
      // If CreateThreadRequest has participantId.
      const apiChat = await apiClient.post<ApiChat>(
        API_ENDPOINTS.CHAT.CREATE_THREAD,
        { userId: data.participantId } // Assuming body with userId
      );
      const currentUserId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
      return this.mapApiChatToUiThread(apiChat, currentUserId || '');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get messages in a thread
   */
  async getMessages(
    threadId: string,
    pagination?: { before?: string; pageSize?: number }
  ): Promise<PaginatedResponse<ChatMessage>> {
    try {
      // API returns PaginatedResponse<ApiChatMessage> or list?
      // Swagger: GET /api/chats/{id}/messages
      const response = await apiClient.get<any>(
        API_ENDPOINTS.CHAT.GET_MESSAGES(threadId),
        { params: pagination }
      );

      // Map response
      const items = (response.content || []).map((msg: ApiChatMessage) => this.mapApiMessageToUiMessage(msg, threadId));

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
   * Send a message (REST API fallback)
   * Note: For real-time messaging, use WebSocket connection
   */
  async sendMessage(data: SendMessageRequest): Promise<ChatMessage> {
    try {
      const apiRequest: ApiSendMessageRequest = {
        content: data.content,
        type: (data.type?.toUpperCase() as any) || 'TEXT',
        mediaUrl: data.mediaUrl
      };

      const apiMessage = await apiClient.post<ApiChatMessage>(
        API_ENDPOINTS.CHAT.GET_MESSAGES(data.threadId), // POST to /api/chats/{id}/messages
        apiRequest
      );
      return this.mapApiMessageToUiMessage(apiMessage, data.threadId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark messages as read
   */
  async markMessagesAsRead(threadId: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.CHAT.MARK_READ(threadId));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get unread message count
   */
  async getUnreadCount(): Promise<number> {
    try {
      const response = await apiClient.get<{ count: number }>(
        API_ENDPOINTS.CHAT.UNREAD_COUNT
      );
      return response.count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get or create a thread with a user
   * Convenience method to start a conversation
   */
  async getOrCreateThread(userId: string): Promise<ChatThread> {
    try {
      // First, try to find existing thread
      const threads = await this.getChatThreads();
      const existingThread = threads.find(
        (thread) =>
          thread.participant1.id === userId || thread.participant2.id === userId
      );

      if (existingThread) {
        return existingThread;
      }

      // If no thread exists, create one
      return await this.createThread({ participantId: userId });
    } catch (error) {
      throw error;
    }
  }

  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  private mapApiChatToUiThread(apiChat: ApiChat, currentUserId: string): ChatThread {
    // Identify participants
    // ApiChat has users: ApiUser[]
    const otherUser = apiChat.users?.find(u => u.id?.toString() !== currentUserId) || apiChat.users?.[0];
    const me = apiChat.users?.find(u => u.id?.toString() === currentUserId) || apiChat.users?.[0];

    return {
      id: apiChat.id?.toString() || '',
      participant1: this.mapApiUserToSummary(me),
      participant2: this.mapApiUserToSummary(otherUser),
      lastMessage: apiChat.lastMessage ? this.mapApiMessageToUiMessage(apiChat.lastMessage, apiChat.id?.toString() || '') : undefined,
      unreadCount: apiChat.unreadCount || 0,
      lastMessageAt: apiChat.updatedAt || new Date().toISOString()
    };
  }

  private mapApiMessageToUiMessage(apiMsg: ApiChatMessage, threadId: string): ChatMessage {
    return {
      id: apiMsg.id?.toString() || '',
      threadId: threadId,
      senderId: apiMsg.senderId?.toString() || '',
      content: apiMsg.content || '',
      sentAt: apiMsg.createdAt || new Date().toISOString(),
      isRead: apiMsg.read || false,
      type: (apiMsg.type?.toLowerCase() as 'text' | 'image' | 'video') || 'text',
      mediaUrl: apiMsg.mediaUrl
    };
  }

  private mapApiUserToSummary(apiUser?: ApiUser): UserSummary {
    if (!apiUser) return {
      id: '', name: 'Unknown', avatar: '', location: '', age: 0, profession: '', religion: '', gender: 'Other', salary: 0
    };
    return {
      id: apiUser.id?.toString() || '',
      name: apiUser.fullName || 'Unknown',
      avatar: apiUser.profile?.photos?.[0] || '',
      location: apiUser.profile?.location || '',
      age: apiUser.profile?.age || 0,
      profession: apiUser.profile?.profession || '',
      religion: apiUser.profile?.religion || '',
      gender: (apiUser.profile?.gender as any) || 'Other',
      salary: apiUser.profile?.salary || 0
    };
  }
}

// Export singleton instance
export const chatService = new ChatService();
