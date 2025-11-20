import React from 'react';
import FastImage, { FastImageProps, Priority, ResizeMode } from 'react-native-fast-image';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/styles';

interface CachedImageProps extends Omit<FastImageProps, 'source'> {
  uri: string;
  style?: FastImageProps['style'];
  resizeMode?: ResizeMode;
  priority?: Priority;
  showLoader?: boolean;
  fallbackColor?: string;
}

/**
 * CachedImage Component
 * 
 * A wrapper around FastImage that provides:
 * - Automatic image caching for improved performance
 * - Reduced network usage by caching images locally
 * - Faster image loading from cache
 * - Optional loading indicator
 * - Fallback UI for loading states
 */
export const CachedImage: React.FC<CachedImageProps> = ({
  uri,
  style,
  resizeMode = FastImage.resizeMode.cover,
  priority = FastImage.priority.normal,
  showLoader = false,
  fallbackColor = Colors.backgroundCard,
  ...props
}) => {
  const [loading, setLoading] = React.useState(showLoader);

  return (
    <View style={style}>
      <FastImage
        source={{
          uri,
          priority,
          cache: FastImage.cacheControl.web,
        }}
        style={[StyleSheet.absoluteFill, style]}
        resizeMode={resizeMode}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
        {...props}
      />
      {loading && showLoader && (
        <View style={[styles.loaderContainer, { backgroundColor: fallbackColor }]}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
