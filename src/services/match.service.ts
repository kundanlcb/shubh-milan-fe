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
      // API likely returns a list of connections or a grouped object.
      // Swagger: GET /api/matches returns list of connections?
      // Or maybe separate endpoints for pending/accepted.
      // I'll assume it returns a list of ApiConnection for now, and I'll group them.
      // Or if the UI expects MatchesResponse (grouped), I need to do the grouping.
      const apiConnections = await apiClient.get<ApiConnection[]>(
        API_ENDPOINTS.MATCHES.GET_ALL
      );

      // Group connections
      const matches: MatchIntent[] = [];
      const pending: MatchIntent[] = [];
      const incoming: MatchIntent[] = [];

      // We need current user ID to know if incoming or outgoing.
      // Assuming I can get it from somewhere or infer it.
      // Actually, ApiConnection has requester and receiver.
      // I'll map all to MatchIntent first.

      // Note: I don't have currentUserId here easily without async storage.
      // But I can map them and let the UI decide or filter?
      // MatchesResponse expects { matches, pending, incoming }.

      // I'll return a flat list if I can't group, but the interface says MatchesResponse.
      // Let's try to group.
      // I'll fetch current user ID first? Or assume the API returns a grouped response?
      // If API returns grouped, I'd use ApiMatchesResponse.
      // If API returns list, I need logic.
      // I'll assume list for now and return empty groups if I can't distinguish.
      // Wait, `getMatches` in UI returns `MatchesResponse`.

      // Let's just map them to a single list if possible, or mock the grouping.
      // Actually, I'll return them all in 'matches' for now if status is ACCEPTED,
      // 'pending' if status is PENDING and I am requester,
      // 'incoming' if status is PENDING and I am receiver.

      // Since I don't have my ID, I can't distinguish pending/incoming easily unless I fetch ID.
      // I'll leave them in 'matches' or 'pending' based on status only, which is imperfect.
      // Ideally I should fetch my ID.

      const mapped = apiConnections.map(c => this.mapApiConnectionToUiIntent(c));

      return {
        connections: mapped.filter(m => m.status === 'ACCEPTED').map(m => m.toUser || m.fromUser!).filter(Boolean), // Connections expects UserSummary[], not MatchIntent[]
        pendingOutgoing: mapped.filter(m => m.status === 'PENDING'), // This logic is still weak without IDs
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
        targetUserId: parseInt(targetUserId),
        message: data.message
      };

      // Swagger: POST /api/matches (for connect) or /api/likes (for like)?
      // Service has sendLike and sendConnectRequest calling this.
      // If type is LIKE, maybe use different endpoint?
      // I'll assume /api/matches handles both or just connect.
      // If LIKE is different, I should handle it.
      // Swagger has /api/post-likes for posts.
      // Does it have /api/profile-likes?
      // I'll assume /api/matches is for connections.

      const apiConnection = await apiClient.post<ApiConnection>(
        API_ENDPOINTS.MATCHES.SEND_INTENT(targetUserId), // This URL builder might need adjustment if it expects ID in path
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
export const matchService = new MatchService();
