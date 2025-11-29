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
  ApiConnection,
  ApiConnectionRequest,
  ApiUser,
  UserSummary,
} from '../types/api.types';

class MatchService {
  /**
   * Get all matches (connections, pending, incoming)
   */
  async getMatches(): Promise<MatchesResponse> {
    try {
      const apiConnections = await apiClient.get<ApiConnection[]>(
        API_ENDPOINTS.MATCHES.GET_ALL
      );

      const mapped = apiConnections.map(c => this.mapApiConnectionToUiIntent(c));

      return {
        connections: mapped
          .filter(m => m.status === 'ACCEPTED')
          .map(m => m.toUser || m.fromUser!)
          .filter(Boolean),
        pendingOutgoing: mapped.filter(m => m.status === 'PENDING'),
        pendingIncoming: []
      };
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
      const apiRequest: ApiConnectionRequest = {
        targetUserId: parseInt(targetUserId, 10),
        message: data.message
      };

      const apiConnection = await apiClient.post<ApiConnection>(
        API_ENDPOINTS.MATCHES.SEND_INTENT(targetUserId),
        apiRequest
      );
      return this.mapApiConnectionToUiIntent(apiConnection);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Accept a match intent
   */
  async acceptIntent(intentId: string): Promise<MatchIntent> {
    try {
      // Swagger: POST /api/matches/{connectionId}/accept ?
      // Or PUT /api/matches/{connectionId}?
      // I'll use the endpoint config.
      const apiConnection = await apiClient.post<ApiConnection>(
        API_ENDPOINTS.MATCHES.ACCEPT(intentId)
      );
      return this.mapApiConnectionToUiIntent(apiConnection);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Decline a match intent
   */
  async declineIntent(intentId: string): Promise<MatchIntent> {
    try {
      const apiConnection = await apiClient.post<ApiConnection>(
        API_ENDPOINTS.MATCHES.DECLINE(intentId)
      );
      return this.mapApiConnectionToUiIntent(apiConnection);
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

  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  private mapApiConnectionToUiIntent(apiConn: ApiConnection): MatchIntent {
    return {
      id: apiConn.id?.toString() || '',
      requesterId: apiConn.requester?.id?.toString() || '',
      targetId: apiConn.receiver?.id?.toString() || '',
      fromUser: this.mapApiUserToSummary(apiConn.requester),
      toUser: this.mapApiUserToSummary(apiConn.receiver),
      type: 'CONNECT', // API doesn't seem to distinguish LIKE/CONNECT in Connection object?
      status: (apiConn.status as any) || 'PENDING',
      createdAt: apiConn.createdAt || new Date().toISOString()
    };
  }

  private mapApiUserToSummary(apiUser?: ApiUser): UserSummary {
    if (!apiUser) return {
      id: '', name: 'Unknown', avatar: '', location: '', age: 0, profession: '', religion: '', gender: 'Other', salary: 0, education: ''
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
      salary: apiUser.profile?.salary || 0,
      education: apiUser.profile?.education || ''
    };
  }
}

// Export singleton instance
export const matchService = new MatchService();
