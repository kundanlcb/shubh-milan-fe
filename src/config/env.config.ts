/**
 * Environment Configuration
 * Manages environment variables and configuration
 */

// You can set this via environment variables or .env file
// For now, we use __DEV__ to determine environment
export const ENV = __DEV__ ? 'development' : 'production';

export const config = {
  // API Configuration
  api: {
    baseURL: __DEV__
      ? 'http://localhost:8080/api/v1'
      : 'https://api.shubhmilan.com/api/v1',
    timeout: 30000,
    enableLogging: __DEV__,
  },

  // App Configuration
  app: {
    name: 'Shubh Milan',
    version: '1.0.0',
    environment: ENV,
  },

  // Feature Flags
  features: {
    useMockData: __DEV__, // Use mock data in development
    enablePushNotifications: !__DEV__,
    enableAnalytics: !__DEV__,
    enableCrashReporting: !__DEV__,
  },

  // Storage Keys
  storage: {
    accessToken: '@shubhmilan:accessToken',
    refreshToken: '@shubhmilan:refreshToken',
    userId: '@shubhmilan:userId',
    userProfile: '@shubhmilan:userProfile',
    preferences: '@shubhmilan:preferences',
    theme: '@shubhmilan:theme',
  },

  // Timeouts
  timeouts: {
    default: 30000,
    upload: 120000,
    download: 60000,
  },
};

// Helper to check if we're in development
export const isDevelopment = () => ENV === 'development';

// Helper to check if we're in production
export const isProduction = () => ENV === 'production';

// Helper to get API base URL
export const getApiBaseUrl = () => config.api.baseURL;

// Helper to check if feature is enabled
export const isFeatureEnabled = (feature: keyof typeof config.features) =>
  config.features[feature];

export default config;
