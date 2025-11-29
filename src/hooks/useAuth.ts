import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services';
import type { User, RegisterRequest } from '../types/api.types';
import { getErrorMessage, logError } from '../utils/errorHandler';

interface UseAuthResult {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuth = (): UseAuthResult => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const cachedUser = await authService.getCachedUserProfile();
        if (cachedUser) {
          setUser(cachedUser);
        }
      }
    } catch (err) {
      logError(err, 'useAuth.checkAuth');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (emailOrPhone: string, password: string) => {
    try {
      setError(null);
      await authService.login({ emailOrPhone, password });
      // After successful login, fetch user data
      const cachedUser = await authService.getCachedUserProfile();
      if (cachedUser) {
        setUser(cachedUser);
      }
      setIsAuthenticated(true);
    } catch (err) {
      logError(err, 'useAuth.login');
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setError(null);
      await authService.register(data);
      setIsAuthenticated(true);
      // After registration, fetch user data
      await checkAuth();
    } catch (err) {
      logError(err, 'useAuth.register');
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      logError(err, 'useAuth.logout');
      // Still log out locally even if API fails
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { userProfileService } = await import('../services');
      const updatedUser = await userProfileService.getCurrentUser();
      setUser(updatedUser);
    } catch (err) {
      logError(err, 'useAuth.refreshUser');
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshUser,
  };
};
