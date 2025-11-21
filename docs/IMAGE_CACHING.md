# Image and Video Caching Implementation

## Overview
This implementation adds efficient image and video caching to the Shubh Milan app using `react-native-fast-image`, the industry standard for image caching in React Native applications.

## Features

### 1. Automatic Caching
- All images loaded through `CachedImage` component are automatically cached
- Cache persists across app sessions using native disk cache
- Memory cache for faster access to recently viewed images

### 2. Intelligent Prefetching
- **Stories**: First 5 story avatars are prefetched with high priority
- **Posts**: First 3 posts are prefetched on mount, next 2 on scroll
- **Story Viewer**: All stories in the current story session are prefetched
- Priority-based loading ensures critical content loads first

### 3. Priority Levels
- **High Priority**: Immediately visible content (current story, visible avatars)
- **Normal Priority**: Content being actively viewed (current post media)
- **Low Priority**: Upcoming content (next posts when scrolling)

## Components

### CachedImage Component
Location: `src/components/CachedImage.tsx`

A wrapper around FastImage that provides automatic caching with additional features:

```typescript
<CachedImage
  uri="https://example.com/image.jpg"
  style={styles.image}
  resizeMode="cover"
  priority="high"
  showLoader={true}
  fallbackColor="#f0f0f0"
/>
```

**Props:**
- `uri` (string, required): Image URL
- `style` (StyleProp): Image style
- `resizeMode` (ResizeMode): How to resize the image ('cover', 'contain', 'stretch', 'center')
- `priority` (Priority): Loading priority ('high', 'normal', 'low')
- `showLoader` (boolean): Show loading indicator
- `fallbackColor` (string): Background color while loading

### Cache Manager
Location: `src/utils/cacheManager.ts`

Utility functions for cache management:

```typescript
import { preloadImages, preloadMediaItems, clearCache } from '../utils/cacheManager';

// Preload specific images
await preloadImages(['url1', 'url2'], 'high');

// Preload media from posts/stories
await preloadMediaItems(mediaArray, 'normal');

// Clear all cache
await clearCache();
```

## Usage Examples

### In Components

**Stories Component:**
```typescript
useEffect(() => {
  const avatarUris = users.slice(0, 5).map(user => user.avatar);
  preloadImages(avatarUris, 'high');
}, [users]);
```

**Post Card:**
```typescript
useEffect(() => {
  preloadMediaItems(post.media, 'normal');
}, [post.media]);
```

**Home Screen (Scroll-based prefetching):**
```typescript
const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
  if (viewableItems.length > 0) {
    const currentIndex = viewableItems[0].index || 0;
    const nextPosts = posts.slice(currentIndex + 1, currentIndex + 3);
    nextPosts.forEach(post => {
      preloadMediaItems(post.media, 'low');
    });
  }
}, [posts]);
```

## Performance Benefits

1. **Faster Loading**: Images load instantly from cache after first view
2. **Reduced Bandwidth**: Cached images aren't re-downloaded
3. **Smoother Scrolling**: Prefetching eliminates loading delays
4. **Better UX**: No image flickering or empty states
5. **Offline Support**: Cached images work without network

## Best Practices

### 1. Use Appropriate Priorities
```typescript
// High priority for immediately visible content
<CachedImage uri={avatar} priority="high" />

// Normal priority for current view content
<CachedImage uri={postImage} priority="normal" />

// Low priority for prefetching
preloadImages(upcomingImages, 'low');
```

### 2. Prefetch Strategically
```typescript
// Prefetch next content when user reaches current content
useEffect(() => {
  if (currentIndex > 0) {
    preloadMediaItems(stories[currentIndex + 1], 'low');
  }
}, [currentIndex]);
```

### 3. Use Loading Indicators for Large Images
```typescript
<CachedImage
  uri={largeImage}
  showLoader={true}
  fallbackColor="#f0f0f0"
/>
```

## Dependencies

- `react-native-fast-image@8.6.3`: Core caching library
- No known security vulnerabilities
- Compatible with React Native 0.81+

## Migration Guide

### From React Native Image
```typescript
// Before
<Image source={{ uri: 'url' }} style={styles.image} />

// After
<CachedImage uri="url" style={styles.image} />
```

## References

- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
- [React Native Image Performance](https://reactnative.dev/docs/performance#image-performance)
