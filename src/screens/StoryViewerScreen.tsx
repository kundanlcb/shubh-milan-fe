import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../components/Icon';
import { MainScreenProps } from '../types/navigation';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const StoryViewerScreen: React.FC<MainScreenProps<'StoryViewer'>> = ({
  navigation,
  route,
}) => {
  const { user, stories } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress] = useState(new Animated.Value(0));

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
        navigation.goBack();
      }
    });
  }, [progress, currentIndex, stories.length, navigation]);

  useEffect(() => {
    if (stories.length > 0) {
      startProgress();
    }
  }, [currentIndex, stories.length, startProgress]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.goBack();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClose = () => {
    progress.stopAnimation();
    navigation.goBack();
  };

  if (!user || stories.length === 0) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.errorContainer}>
          <Text style={styles.errorText}>Story not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  const currentStory = stories[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* Header with User Info */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.timeAgo}>2h ago</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="x" library="feather" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Story Progress Bars - Now below user section */}
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

      {/* Story Content */}
      <View style={styles.storyContent}>
        {currentStory.type === 'image' ? (
          <Image
            source={{ uri: currentStory.uri }}
            style={styles.storyImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.videoContainer}>
            <Image
              source={{ uri: currentStory.uri }}
              style={styles.storyImage}
              resizeMode="cover"
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
      <SafeAreaView style={styles.bottomActions} edges={['bottom']}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" library="feather" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-2" library="feather" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1.5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 1.5,
  },
  storyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  storyImage: {
    width: screenWidth,
    height: screenHeight * 0.65,
    borderRadius: 8,
  },
  videoContainer: {
    width: screenWidth,
    height: screenHeight * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 35,
    padding: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  leftTouchArea: {
    position: 'absolute',
    left: 0,
    top: 120,
    bottom: 120,
    width: screenWidth * 0.3,
    zIndex: 10,
  },
  rightTouchArea: {
    position: 'absolute',
    right: 0,
    top: 120,
    bottom: 120,
    width: screenWidth * 0.3,
    zIndex: 10,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  actionButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
