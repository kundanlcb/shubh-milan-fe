/**
 * Notification Service
 * Handles notifications functionality
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import type { Notification, PaginatedResponse } from '../types/api.types';

class NotificationService {
  /**
   * Get all notifications
   */
  async getNotifications(pagination?: {
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Notification>> {
    try {
      return await apiClient.get<PaginatedResponse<Notification>>(
        API_ENDPOINTS.NOTIFICATIONS.GET_ALL,
        { params: pagination }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    try {
      await apiClient.post(
        API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    try {
      await apiClient.post('/notifications/read-all');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(): Promise<number> {
    try {
      const response = await apiClient.get<{ count: number }>(
        '/notifications/unread-count'
      );
      return response.count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await apiClient.delete(`/notifications/${notificationId}`);
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
