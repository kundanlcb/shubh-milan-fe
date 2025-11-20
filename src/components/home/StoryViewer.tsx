import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../Icon';
import { CachedImage } from '../CachedImage';
import { preloadMediaItems } from '../../utils/cacheManager';
import FastImage from 'react-native-fast-image';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface StoryItem {
  id: string;
  uri: string;
  type: 'image' | 'video';
}

interface User {
  name: string;
  avatar: string;
}

interface StoryViewerProps {
  visible: boolean;
  user: User | null;
  stories: StoryItem[];
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  visible,
  user,
  stories,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress] = useState(new Animated.Value(0));

  // Prefetch all stories when viewer becomes visible
  useEffect(() => {
    if (visible && stories.length > 0) {
      // Preload all story media with high priority
      preloadMediaItems(stories, FastImage.priority.high);
    }
  }, [visible, stories]);

  const startProgress = useCallback(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000, // 5 seconds per story
      useNativeDriver: false,
    }).start(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onClose();
      }
    });
  }, [progress, currentIndex, stories.length, onClose]);

  useEffect(() => {
    if (visible && stories.length > 0) {
      startProgress();
    }
  }, [visible, currentIndex, stories.length, startProgress]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClose = () => {
    progress.stopAnimation();
    setCurrentIndex(0);
    onClose();
  };

  if (!visible || !user || stories.length === 0) {
    return null;
  }

  const currentStory = stories[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* Story Progress Bars */}
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <View key={index} style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: index === currentIndex
                    ? progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      })
                    : index < currentIndex ? '100%' : '0%'
                }
              ]}
            />
          </View>
        ))}
      </View>

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.userInfo}>
          <CachedImage
            uri={user.avatar}
            style={styles.userAvatar}
            resizeMode={FastImage.resizeMode.cover}
            priority={FastImage.priority.high}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.timeAgo}>2h ago</Text>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="x" library="feather" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Story Content */}
      <View style={styles.storyContent}>
        {currentStory.type === 'image' ? (
          <CachedImage
            uri={currentStory.uri}
            style={styles.storyImage}
            resizeMode={FastImage.resizeMode.contain}
            priority={FastImage.priority.high}
            showLoader
          />
        ) : (
          <View style={styles.videoContainer}>
            <CachedImage
              uri={currentStory.uri}
              style={styles.storyImage}
              resizeMode={FastImage.resizeMode.contain}
              priority={FastImage.priority.high}
              showLoader
            />
            <View style={styles.videoOverlay}>
              <TouchableOpacity style={styles.playButton}>
                <Icon name="play" library="feather" size={48} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Touch Areas for Navigation */}
      <TouchableOpacity
        style={styles.leftTouchArea}
        onPress={handlePrevious}
        activeOpacity={1}
      />
      <TouchableOpacity
        style={styles.rightTouchArea}
        onPress={handleNext}
        activeOpacity={1}
      />

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" library="feather" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message-circle" library="feather" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-2" library="feather" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 1000,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  closeButton: {
    padding: 8,
  },
  storyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: screenWidth,
    height: screenHeight * 0.7,
  },
  videoContainer: {
    width: screenWidth,
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 20,
  },
  leftTouchArea: {
    position: 'absolute',
    left: 0,
    top: 100,
    bottom: 100,
    width: screenWidth * 0.3,
  },
  rightTouchArea: {
    position: 'absolute',
    right: 0,
    top: 100,
    bottom: 100,
    width: screenWidth * 0.3,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 24,
  },
  actionButton: {
    padding: 12,
  },
});
