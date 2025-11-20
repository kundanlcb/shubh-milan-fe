import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  StyleProp,
  ImageStyle,
  ImageResizeMode,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/styles';
import { Icon } from './Icon';

interface SmartImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  thumbnailUri?: string;
  containerStyle?: StyleProp<ViewStyle>;
  showLoader?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  uri,
  style,
  resizeMode = 'cover',
  thumbnailUri,
  containerStyle,
  showLoader = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const loaderOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (showLoader && isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loaderOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(loaderOpacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      loaderOpacity.stopAnimation();
    }
  }, [isLoading, showLoader, loaderOpacity]);

  const handleLoad = () => {
    setIsLoading(false);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {/* Loading Placeholder */}
      {isLoading && showLoader && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.loader,
            { opacity: loaderOpacity },
          ]}
        />
      )}

      {/* Error Placeholder */}
      {hasError && (
        <View style={[StyleSheet.absoluteFill, styles.errorContainer]}>
          <Icon name="image-off" library="material" size={24} color={Colors.textSecondary} />
        </View>
      )}

      {/* Actual Image */}
      <Animated.Image
        source={{ uri }}
        style={[
          StyleSheet.absoluteFill,
          style,
          { opacity: hasError ? 0 : opacity },
        ]}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // Light gray background for placeholder
  },
  loader: {
    backgroundColor: '#e0e0e0',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});
