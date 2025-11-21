import FastImage from 'react-native-fast-image';

/**
 * Cache configuration options
 */
export const CacheConfig = {
  // Cache priority for different content types
  HIGH_PRIORITY: 'high',
  NORMAL_PRIORITY: 'normal',
  LOW_PRIORITY: 'low',
  
  // Cache control
  WEB: 'web',
  CACHE_ONLY: 'cacheOnly',
  IMMUTABLE: 'immutable',
} as const;

/**
 * Preload images into the cache
 * Useful for prefetching stories and posts that users are likely to view
 */
export const preloadImages = async (
  uris: string[],
  priority: string = 'normal'
): Promise<void> => {
  try {
    const sources = uris.map(uri => ({
      uri,
      priority: priority as any,
      cache: 'web' as any,
    }));
    
    await FastImage.preload(sources as any);
  } catch (error) {
    console.warn('Failed to preload images:', error);
  }
};

/**
 * Preload media items from posts or stories
 * Intelligently prefetches adjacent content that user might view next
 */
export const preloadMediaItems = async (
  mediaItems: Array<{ uri: string; type: 'image' | 'video' }>,
  priority: string = 'normal'
): Promise<void> => {
  try {
    // Only preload images (videos are handled differently)
    const imageUris = mediaItems
      .filter(item => item.type === 'image')
      .map(item => item.uri);
    
    if (imageUris.length > 0) {
      await preloadImages(imageUris, priority);
    }
  } catch (error) {
    console.warn('Failed to preload media items:', error);
  }
};

/**
 * Clear the image cache
 * Useful for manual cache management
 */
export const clearCache = async (): Promise<void> => {
  try {
    await FastImage.clearDiskCache();
    await FastImage.clearMemoryCache();
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
};

/**
 * Get cache statistics (if available in future versions)
 * Currently returns basic info
 */
export const getCacheStats = () => {
  return {
    // FastImage doesn't expose cache stats directly
    // This is a placeholder for future enhancements
    cacheEnabled: true,
  };
};
