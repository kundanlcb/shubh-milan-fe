# API Integration Guide

## Overview
This document provides a comprehensive guide for integrating the Shubh Milan React Native app with the Spring Boot backend.

## Prerequisites
- React Native development environment set up
- Access to the Spring Boot backend API
- Node.js 18+
- npm or yarn

## Quick Start

### 1. Configure API Endpoint

Create a `.env` file in the root directory (this file is gitignored):

```env
# Development
API_BASE_URL=http://localhost:8080/api/v1

# Production (replace with your actual URL)
# API_BASE_URL=https://api.shubhmilan.com/api/v1
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Run the App

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Architecture

### Directory Structure

```
src/
├── config/
│   └── api.config.ts          # API configuration and endpoints
├── services/
│   ├── api.client.ts          # HTTP client with interceptors
│   ├── auth.service.ts        # Authentication service
│   ├── userProfile.service.ts # User profile service
│   ├── feed.service.ts        # Feed and posts service
│   ├── story.service.ts       # Stories service
│   ├── chat.service.ts        # Chat and messaging
│   ├── notification.service.ts # Notifications
│   ├── match.service.ts       # Match/interest service
│   ├── media.service.ts       # Media upload service
│   └── index.ts               # Service exports
├── hooks/
│   ├── useAuth.ts             # Authentication hook
│   ├── useFeed.ts             # Feed management hook
│   └── index.ts               # Hook exports
├── types/
│   └── api.types.ts           # TypeScript interfaces
└── utils/
    └── errorHandler.ts        # Error handling utilities
```

### Key Components

#### 1. API Client (`api.client.ts`)
- Axios-based HTTP client
- Automatic token injection in headers
- Token refresh on 401 errors
- Request/response logging (dev mode)
- Comprehensive error handling

#### 2. Services
Each service is a singleton that handles specific API operations:

**AuthService**
- `login(credentials)` - User login
- `register(data)` - User registration
- `logout()` - User logout
- `refreshToken()` - Refresh access token
- `isAuthenticated()` - Check auth status

**FeedService**
- `getFeed(filters, pagination)` - Get feed with filters
- `createPost(data)` - Create new post
- `likePost(postId)` - Like a post
- `getComments(postId)` - Get post comments
- `addComment(postId, data)` - Add comment

**UserProfileService**
- `getCurrentUser()` - Get current user
- `getMyProfile()` - Get user profile
- `updateMyProfile(data)` - Update profile
- `searchUsers(params)` - Search users

And more...

#### 3. Custom Hooks

**useAuth**
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

**useFeed**
```typescript
const {
  posts,
  isLoading,
  isRefreshing,
  refresh,
  loadMore,
  applyFilters,
  toggleLike
} = useFeed(initialFilters);
```

## API Integration Examples

### Authentication Flow

```typescript
import { authService } from '../services';

// Login
try {
  const response = await authService.login({
    emailOrPhone: 'user@example.com',
    password: 'password123'
  });
  console.log('Logged in:', response.user);
} catch (error) {
  console.error('Login failed:', error);
}

// Register
try {
  await authService.register({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+911234567890',
    password: 'password123',
    profile: { /* profile data */ },
    partnerPreferences: { /* preferences */ },
    accountType: 'FREE',
    privacyLevel: 'FILTERED'
  });
} catch (error) {
  console.error('Registration failed:', error);
}
```

### Feed Management

```typescript
import { useFeed } from '../hooks';

function HomeScreen() {
  const {
    posts,
    isLoading,
    isRefreshing,
    refresh,
    loadMore,
    applyFilters,
    toggleLike
  } = useFeed({
    ageMin: 21,
    ageMax: 30,
    professions: ['Engineer', 'Doctor']
  });

  return (
    <FlatList
      data={posts}
      onRefresh={refresh}
      refreshing={isRefreshing}
      onEndReached={loadMore}
      // ...
    />
  );
}
```

### User Profile

```typescript
import { userProfileService } from '../services';

// Get profile
const profile = await userProfileService.getMyProfile();

// Update profile
await userProfileService.updateMyProfile({
  age: 25,
  profession: 'Software Engineer',
  bio: 'Updated bio'
});

// Search users
const results = await userProfileService.searchUsers({
  ageMin: 21,
  ageMax: 30,
  locations: ['Mumbai', 'Pune']
});
```

### File Upload

```typescript
import { mediaService } from '../services';

// Upload image
const result = await mediaService.uploadImage(
  imageUri,
  { quality: 0.8 },
  (progress) => {
    console.log(`Upload progress: ${progress.percentage}%`);
  }
);

// Upload multiple files
const results = await mediaService.uploadMultipleMedia(
  files,
  (index, progress) => {
    console.log(`File ${index}: ${progress.percentage}%`);
  }
);
```

## Error Handling

All API calls use centralized error handling:

```typescript
import { getErrorMessage, logError, isNetworkError } from '../utils/errorHandler';

try {
  await someApiCall();
} catch (error) {
  logError(error, 'MyComponent.handleAction');
  
  if (isNetworkError(error)) {
    Alert.alert('Network Error', 'Please check your internet connection');
  } else {
    const message = getErrorMessage(error);
    Alert.alert('Error', message);
  }
}
```

### User-Friendly Error Messages

The error handler automatically converts API error codes to user-friendly messages:

- `NETWORK_ERROR` → "Please check your internet connection"
- `HTTP_401` → "Session expired. Please login again"
- `HTTP_404` → "The requested resource was not found"
- `INVALID_CREDENTIALS` → "Invalid email/phone or password"
- etc.

## Environment Configuration

### Development Mode
- Uses `http://localhost:8080/api/v1` by default
- Falls back to mock data if API unavailable
- Request/response logging enabled
- Detailed error messages

### Production Mode
- Uses production API URL from config
- No fallback to mock data
- Logging disabled
- Minimal error details

## Token Management

### Automatic Token Refresh
The API client automatically handles token refresh:

1. Request fails with 401
2. Attempts to refresh token
3. Retries original request with new token
4. If refresh fails, clears auth and redirects to login

### Token Storage
Tokens are securely stored using AsyncStorage:
- Access token: `@shubhmilan:accessToken`
- Refresh token: `@shubhmilan:refreshToken`
- User ID: `@shubhmilan:userId`

## Testing

### Mock Setup
AsyncStorage and other native modules are mocked in `jest.setup.js`:

```javascript
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  // ...
}));
```

### Running Tests
```bash
npm test
```

## Best Practices

### 1. Always Use Services
❌ Don't make direct API calls
```typescript
// Bad
const response = await fetch('http://api.example.com/users');
```

✅ Use services instead
```typescript
// Good
const user = await userProfileService.getCurrentUser();
```

### 2. Use Custom Hooks
❌ Don't manage state manually
```typescript
// Bad
const [posts, setPosts] = useState([]);
useEffect(() => {
  fetchPosts().then(setPosts);
}, []);
```

✅ Use custom hooks
```typescript
// Good
const { posts, refresh } = useFeed();
```

### 3. Handle Errors Properly
❌ Don't show raw error messages
```typescript
// Bad
Alert.alert('Error', error.toString());
```

✅ Use error handler
```typescript
// Good
Alert.alert('Error', getErrorMessage(error));
```

### 4. Implement Optimistic Updates
```typescript
// Update UI immediately
setLiked(true);

// Call API in background
try {
  await feedService.likePost(postId);
} catch (error) {
  // Revert on error
  setLiked(false);
}
```

## Troubleshooting

### Common Issues

**1. Network Request Failed**
- Check if backend is running
- Verify API_BASE_URL in config
- Check network connectivity

**2. 401 Unauthorized**
- Token may have expired
- Try logging out and logging in again
- Check token storage

**3. CORS Errors (Web)**
- Backend must allow app origin
- Check CORS configuration on server

**4. TypeScript Errors**
- Ensure all types are imported correctly
- Run `npm install` to get latest types
- Check `src/types/api.types.ts`

## API Endpoint Reference

See `src/config/api.config.ts` for complete endpoint list:

- **Auth**: `/auth/login`, `/auth/register`, `/auth/logout`
- **Users**: `/users/me`, `/users/{id}`
- **Profiles**: `/profiles/me`, `/profiles/{userId}`
- **Feed**: `/feed`, `/posts`, `/posts/{id}/like`
- **Stories**: `/stories`, `/stories/{id}`
- **Chat**: `/chat/threads`, `/chat/threads/{id}/messages`
- **Notifications**: `/notifications`
- **Matches**: `/matches`, `/matches/{userId}/intent`

## Development vs Production

### Development
- Mock data fallback enabled
- Detailed logging
- Debug error messages
- Relaxed validation

### Production
- No mock data fallback
- Minimal logging
- User-friendly error messages
- Strict validation
- Performance optimizations

## Next Steps

1. Set up production API URL
2. Configure push notifications
3. Add offline support
4. Implement analytics
5. Add crash reporting
6. Performance optimization
7. Security audit

## Support

For API-related issues:
1. Check this documentation
2. Review `src/services/*` implementation
3. Check backend API documentation (BACKEND_SPECS.md)
4. Review error logs in dev mode

## License

This integration layer is part of the Shubh Milan project.
