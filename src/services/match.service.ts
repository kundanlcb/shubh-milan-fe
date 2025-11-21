/**
 * Match Service
 * Handles match intents and connections
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import type {
  MatchIntent,
  SendIntentRequest,
  MatchesResponse,
} from '../types/api.types';

class MatchService {
  /**
   * Get all matches (connections, pending, incoming)
   */
  async getMatches(): Promise<MatchesResponse> {
    try {
      return await apiClient.get<MatchesResponse>(
        API_ENDPOINTS.MATCHES.GET_ALL
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send a match intent (like or connect request)
   */
  async sendIntent(
    targetUserId: string,
    data: SendIntentRequest
  ): Promise<MatchIntent> {
    try {
      return await apiClient.post<MatchIntent>(
        API_ENDPOINTS.MATCHES.SEND_INTENT(targetUserId),
        data
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Accept a match intent
   */
  async acceptIntent(intentId: string): Promise<MatchIntent> {
    try {
      return await apiClient.post<MatchIntent>(
        API_ENDPOINTS.MATCHES.ACCEPT(intentId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Decline a match intent
   */
  async declineIntent(intentId: string): Promise<MatchIntent> {
    try {
      return await apiClient.post<MatchIntent>(
        API_ENDPOINTS.MATCHES.DECLINE(intentId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send a like to a user
   */
  async sendLike(targetUserId: string): Promise<MatchIntent> {
    try {
      return await this.sendIntent(targetUserId, { type: 'LIKE' });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send a connect request to a user
   */
  async sendConnectRequest(targetUserId: string): Promise<MatchIntent> {
    try {
      return await this.sendIntent(targetUserId, { type: 'CONNECT' });
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const matchService = new MatchService();
