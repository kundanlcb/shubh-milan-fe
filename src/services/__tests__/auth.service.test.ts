/**
 * Auth Service Tests
 * Example unit tests for authentication service
 * Note: These are example tests. Actual implementation may vary.
 */

import { authService } from '../auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../api.client';

// Mock the API client
jest.mock('../api.client');
jest.mock('@react-native-async-storage/async-storage');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully and store tokens', async () => {
      const mockResponse = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        userId: 'user-123',
        user: {
          id: 'user-123',
          fullName: 'Test User',
          email: 'test@example.com',
          phone: '+911234567890',
          roles: ['USER'],
          status: 'ACTIVE' as const,
          createdAt: '2024-01-01T00:00:00Z',
        },
      };

      (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        emailOrPhone: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual(mockResponse);
      expect(AsyncStorage.multiSet).toHaveBeenCalled();
    });

    it('should throw error on invalid credentials', async () => {
      const mockError = {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
      };

      (apiClient.post as jest.Mock).mockRejectedValue(mockError);

      await expect(
        authService.login({
          emailOrPhone: 'wrong@example.com',
          password: 'wrongpass',
        })
      ).rejects.toEqual(mockError);
    });
  });

  describe('logout', () => {
    it('should logout and clear storage', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({});

      await authService.logout();

      expect(AsyncStorage.multiRemove).toHaveBeenCalled();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('access-token');

      const result = await authService.isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false when token does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });
});
