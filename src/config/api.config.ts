/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

// Environment-based configuration
const ENV = __DEV__ ? 'development' : 'production';

const API_CONFIGS = {
  development: {
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 30000,
    enableLogging: true,
  },
  production: {
    baseURL: 'https://api.shubhmilan.com/api/v1', // Replace with actual production URL
    timeout: 30000,
    enableLogging: false,
  },
};

export const API_CONFIG = API_CONFIGS[ENV];

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    OTP_SEND: '/auth/otp/send',
    OTP_VERIFY: '/auth/otp/verify',
  },
  
  // Users & Profiles
  USERS: {
    ME: '/users/me',
    UPDATE_ME: '/users/me',
    GET_USER: (userId: string) => `/users/${userId}`,
    SEARCH: '/users/search',
  },
  
  PROFILES: {
    ME: '/profiles/me',
    UPDATE_ME: '/profiles/me',
    GET_PROFILE: (userId: string) => `/profiles/${userId}`,
    SEARCH: '/profiles',
    PHOTOS_PRESIGN: '/profiles/me/photos/presign',
  },
  
  // Partner Preferences
  PREFERENCES: {
    ME: '/preferences/me',
    UPDATE_ME: '/preferences/me',
  },
  
  // Feed & Posts
  FEED: {
    GET_FEED: '/feed',
    CREATE_POST: '/posts',
    GET_POST: (postId: string) => `/posts/${postId}`,
    LIKE_POST: (postId: string) => `/posts/${postId}/like`,
    UNLIKE_POST: (postId: string) => `/posts/${postId}/like`,
    GET_COMMENTS: (postId: string) => `/posts/${postId}/comments`,
    ADD_COMMENT: (postId: string) => `/posts/${postId}/comments`,
  },
  
  // Stories
  STORIES: {
    GET_ALL: '/stories',
    CREATE: '/stories',
    GET_STORY: (storyId: string) => `/stories/${storyId}`,
    VIEW_STORY: (storyId: string) => `/stories/${storyId}/view`,
  },
  
  // Matches/Interests
  MATCHES: {
    GET_ALL: '/matches',
    SEND_INTENT: (targetUserId: string) => `/matches/${targetUserId}/intent`,
    ACCEPT: (intentId: string) => `/matches/${intentId}/accept`,
    DECLINE: (intentId: string) => `/matches/${intentId}/decline`,
  },
  
  // Chat
  CHAT: {
    GET_THREADS: '/chat/threads',
    CREATE_THREAD: '/chat/threads',
    GET_MESSAGES: (threadId: string) => `/chat/threads/${threadId}/messages`,
    WEBSOCKET: '/ws',
  },
  
  // Notifications
  NOTIFICATIONS: {
    GET_ALL: '/notifications',
    MARK_READ: (notificationId: string) => `/notifications/${notificationId}/read`,
  },
  
  // Upload
  UPLOAD: {
    MEDIA: '/upload',
  },
  
  // Search & Filters
  FILTERS: {
    GET_OPTIONS: '/filters',
  },
  
  // Settings
  SETTINGS: {
    GET: '/settings',
  },
};

// Request timeout durations
export const TIMEOUT = {
  DEFAULT: 30000,
  UPLOAD: 120000, // 2 minutes for file uploads
  DOWNLOAD: 60000,
};

// Storage keys for AsyncStorage
export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@shubhmilan:accessToken',
  REFRESH_TOKEN: '@shubhmilan:refreshToken',
  USER_ID: '@shubhmilan:userId',
  USER_PROFILE: '@shubhmilan:userProfile',
  PREFERENCES: '@shubhmilan:preferences',
  THEME: '@shubhmilan:theme',
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
