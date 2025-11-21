/**
 * Error Handler Utility
 * Centralized error handling and user-friendly messages
 */

import type { ApiError } from '../types/api.types';

export class AppError extends Error {
  code: string;
  details?: Record<string, any>;

  constructor(code: string, message: string, details?: Record<string, any>) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

/**
 * Convert API error to user-friendly message
 */
export const getErrorMessage = (error: any): string => {
  // Handle API errors
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    const apiError = error as ApiError;
    return getUserFriendlyMessage(apiError.code, apiError.message);
  }

  // Handle AppError
  if (error instanceof AppError) {
    return getUserFriendlyMessage(error.code, error.message);
  }

  // Handle standard Error
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Fallback
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Get user-friendly error message based on error code
 */
const getUserFriendlyMessage = (code: string, defaultMessage: string): string => {
  const errorMessages: Record<string, string> = {
    // Network errors
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    REQUEST_ERROR: 'Request failed. Please try again.',
    
    // HTTP errors
    HTTP_400: 'Invalid request. Please check your input.',
    HTTP_401: 'Session expired. Please login again.',
    HTTP_403: 'You do not have permission to perform this action.',
    HTTP_404: 'The requested resource was not found.',
    HTTP_409: 'A conflict occurred. The resource may already exist.',
    HTTP_422: 'Invalid data provided. Please check your input.',
    HTTP_429: 'Too many requests. Please wait and try again.',
    HTTP_500: 'Server error. Please try again later.',
    HTTP_503: 'Service temporarily unavailable. Please try again later.',
    
    // Auth errors
    INVALID_CREDENTIALS: 'Invalid email/phone or password.',
    EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
    PHONE_ALREADY_EXISTS: 'An account with this phone number already exists.',
    WEAK_PASSWORD: 'Password is too weak. Please use a stronger password.',
    INVALID_TOKEN: 'Session expired. Please login again.',
    TOKEN_EXPIRED: 'Session expired. Please login again.',
    
    // Validation errors
    VALIDATION_ERROR: 'Please check your input and try again.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    REQUIRED_FIELD: 'Please fill in all required fields.',
    
    // File upload errors
    FILE_TOO_LARGE: 'File is too large. Maximum size is 10MB.',
    INVALID_FILE_TYPE: 'Invalid file type. Only images and videos are allowed.',
    UPLOAD_FAILED: 'Upload failed. Please try again.',
    
    // Chat errors
    CHAT_NOT_FOUND: 'Chat not found.',
    MESSAGE_SEND_FAILED: 'Failed to send message. Please try again.',
    
    // Match errors
    ALREADY_MATCHED: 'You have already sent a request to this user.',
    SELF_MATCH: 'You cannot send a request to yourself.',
    
    // Post errors
    POST_NOT_FOUND: 'Post not found.',
    ALREADY_LIKED: 'You have already liked this post.',
    
    // Story errors
    STORY_EXPIRED: 'This story has expired.',
    STORY_NOT_FOUND: 'Story not found.',
  };

  return errorMessages[code] || defaultMessage || 'An error occurred. Please try again.';
};

/**
 * Log error for debugging
 */
export const logError = (error: any, context?: string): void => {
  if (__DEV__) {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  }

  // In production, you might want to send to error tracking service
  // e.g., Sentry, Firebase Crashlytics, etc.
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: any): boolean => {
  if (error && typeof error === 'object' && 'code' in error) {
    return error.code === 'NETWORK_ERROR';
  }
  return false;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: any): boolean => {
  if (error && typeof error === 'object' && 'code' in error) {
    const authErrorCodes = [
      'HTTP_401',
      'INVALID_TOKEN',
      'TOKEN_EXPIRED',
      'INVALID_CREDENTIALS',
    ];
    return authErrorCodes.includes(error.code);
  }
  return false;
};

/**
 * Format validation errors
 */
export const formatValidationErrors = (
  errors: Record<string, string[]>
): string => {
  const messages: string[] = [];
  
  Object.entries(errors).forEach(([field, fieldErrors]) => {
    fieldErrors.forEach((error) => {
      messages.push(`${field}: ${error}`);
    });
  });

  return messages.join('\n');
};
