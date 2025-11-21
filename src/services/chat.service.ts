/**
 * Chat Service
 * Handles chat threads and messaging
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import type {
  ChatThread,
  ChatMessage,
  SendMessageRequest,
  CreateThreadRequest,
  PaginatedResponse,
} from '../types/api.types';

class ChatService {
  /**
   * Get all chat threads
   */
  async getChatThreads(): Promise<ChatThread[]> {
    try {
      return await apiClient.get<ChatThread[]>(API_ENDPOINTS.CHAT.GET_THREADS);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new chat thread
   */
  async createThread(data: CreateThreadRequest): Promise<ChatThread> {
    try {
      return await apiClient.post<ChatThread>(
        API_ENDPOINTS.CHAT.CREATE_THREAD,
        data
      );
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
      return await apiClient.get<PaginatedResponse<ChatMessage>>(
        API_ENDPOINTS.CHAT.GET_MESSAGES(threadId),
        { params: pagination }
      );
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
      return await apiClient.post<ChatMessage>(
        API_ENDPOINTS.CHAT.GET_MESSAGES(data.threadId),
        data
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark messages as read
   */
  async markMessagesAsRead(threadId: string): Promise<void> {
    try {
      await apiClient.post(`/chat/threads/${threadId}/read`);
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
        '/chat/unread-count'
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
}

// Export singleton instance
export const chatService = new ChatService();
