import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/styles';
import { TabHeader } from '../components/TabHeader';
import { Stories } from '../components/home/Stories';
import { PostCard } from '../components/home/PostCard';
import { EmptyState } from '../components/home/EmptyState';
import { FilterModal } from '../components/home/FilterModal';
import {
  allUsers,
  currentUserPreferences,
  PostData,
} from '../utils/homeData';
import { preloadMediaItems } from '../utils/cacheManager';

const EmptyStateComponent: React.FC<{ onAdjustPreferences: () => void }> = ({ onAdjustPreferences }) => (
  <EmptyState onAdjustPreferences={onAdjustPreferences} />
);

export const HomeScreen: React.FC<{
  onNavigateToAddStory?: () => void;
  onNavigateToUserProfile?: (userId: string) => void;
  onNavigateToStoryViewer?: (params: any) => void;
  onNavigateToChat?: () => void;
}> = ({ onNavigateToAddStory, onNavigateToUserProfile, onNavigateToStoryViewer, onNavigateToChat }) => {
  // Filter posts based on user preferences
  const [userPreferences] = useState(currentUserPreferences);
  const [activeFilters, setActiveFilters] = useState({
    ageMin: userPreferences.partnerAgeMin,
    ageMax: userPreferences.partnerAgeMax,
    professions: userPreferences.partnerProfession,
    locations: userPreferences.partnerLocation,
    religions: ['Hindu'], // Default religion filter
    genders: ['Male', 'Female'], // Default to show both genders
    salaryMin: 300000, // Default minimum salary (3 LPA)
    salaryMax: 5000000, // Default maximum salary (50 LPA)
  });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Apply filters to get filtered posts
  const getFilteredPosts = () => {
    return allUsers.filter(post => {
      const user = post.user;

      // Age filter
      if (user.age < activeFilters.ageMin || user.age > activeFilters.ageMax) {
        return false;
      }

      // Profession filter
      if (activeFilters.professions.length > 0 && !activeFilters.professions.includes(user.profession)) {
        return false;
      }

      // Location filter
      if (activeFilters.locations.length > 0 && !activeFilters.locations.includes(user.location)) {
        return false;
      }

      // Religion filter
      if (activeFilters.religions.length > 0 && !activeFilters.religions.includes(user.religion)) {
        return false;
      }

      // Gender filter
      if (activeFilters.genders.length > 0 && !activeFilters.genders.includes(user.gender)) {
        return false;
      }

      // Salary filter
      if (user.salary < activeFilters.salaryMin || user.salary > activeFilters.salaryMax) {
        return false;
      }

      return true;
    });
  };

  const [posts, setPosts] = useState(getFilteredPosts());

  // Prefetch media from the first few posts when component mounts or posts change
  useEffect(() => {
    const prefetchPostMedia = async () => {
      // Prefetch media from the first 3 visible posts
      const visiblePosts = posts.slice(0, 3);
      for (const post of visiblePosts) {
        // Preload with normal priority as user will see these soon
        await preloadMediaItems(post.media, 'normal');
      }
    };

    prefetchPostMedia();
  }, [posts]);

  // Callback to prefetch adjacent posts when user scrolls
  const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const currentIndex = viewableItems[0].index || 0;
      // Prefetch next 2 posts after the currently visible one
      const nextPosts = posts.slice(currentIndex + 1, currentIndex + 3);
      nextPosts.forEach(post => {
        // Use low priority for items not yet visible
        preloadMediaItems(post.media, 'low');
      });
    }
  }, [posts]);

  // Mock story data - in real app this would come from API
  const getStoriesForUser = (user: any) => {
    return [
      {
        id: `${user.name}-1`,
        uri: `https://picsum.photos/400/800?random=${Math.floor(Math.random() * 1000)}`,
        type: 'image' as const,
      },
      {
        id: `${user.name}-2`,
        uri: `https://picsum.photos/400/800?random=${Math.floor(Math.random() * 1000)}`,
        type: 'video' as const,
      },
      {
        id: `${user.name}-3`,
        uri: `https://picsum.photos/400/800?random=${Math.floor(Math.random() * 1000)}`,
        type: 'image' as const,
      },
    ];
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleProfile = (user: { name: string; avatar: string; location: string; age: number; profession: string; }) => {
    // Navigate to user profile screen
    if (onNavigateToUserProfile) {
      onNavigateToUserProfile(user.name);
    } else {
      console.log('Navigate to profile:', user.name);
    }
  };

  const handleChat = () => {
    if (userPreferences.accountType === 'premium') {
      console.log('Open chat');
    } else {
      Alert.alert('Premium Feature', 'Upgrade to Premium for unlimited messaging!');
    }
  };

  const handleAdjustPreferences = () => {
    console.log('Adjust preferences pressed');
  };

  const handleFilterPress = () => {
    setIsFilterModalVisible(true);
  };

  const handleApplyFilters = (newFilters: {
    ageMin: number;
    ageMax: number;
    professions: string[];
    locations: string[];
    religions: string[];
    genders: string[];
    salaryMin: number;
    salaryMax: number;
  }) => {
    setActiveFilters(newFilters);

    // Apply new filters and update posts
    const filteredPosts = allUsers.filter(post => {
      const user = post.user;

      // Age filter
      if (user.age < newFilters.ageMin || user.age > newFilters.ageMax) {
        return false;
      }

      // Profession filter
      if (newFilters.professions.length > 0 && !newFilters.professions.includes(user.profession)) {
        return false;
      }

      // Location filter
      if (newFilters.locations.length > 0 && !newFilters.locations.includes(user.location)) {
        return false;
      }

      // Religion filter
      if (newFilters.religions.length > 0 && !newFilters.religions.includes(user.religion)) {
        return false;
      }

      // Gender filter
      if (newFilters.genders.length > 0 && !newFilters.genders.includes(user.gender)) {
        return false;
      }

      // Salary filter
      if (user.salary < newFilters.salaryMin || user.salary > newFilters.salaryMax) {
        return false;
      }

      return true;
    });

    setPosts(filteredPosts);
  };

  // Stories action handlers
  const handleAddStory = () => {
    if (onNavigateToAddStory) {
      onNavigateToAddStory();
    } else {
      console.log('Add story pressed');
    }
  };

  const handleStoryPress = (user: any) => {
    // Navigate to the standalone StoryViewer screen
    console.log('Story pressed for:', user.name);

    if (onNavigateToStoryViewer) {
      // Get stories for this user and navigate to StoryViewer
      const userStories = getStoriesForUser(user);
      onNavigateToStoryViewer({
        user: {
          name: user.name,
          avatar: user.avatar
        },
        stories: userStories
      });
    }
  };

  const renderPost = ({ item }: { item: PostData }) => (
    <PostCard
        post={item}
        onLike={handleLike}
        onProfile={handleProfile}
        onComment={handleChat}
        onShare={(postId: string) => console.log('Share post:', postId)}
        onSave={() => console.log('Save post')}
    />
  );

  const renderListHeader = () => (
    <Stories
      users={posts.map(post => post.user)}
      onAddStory={handleAddStory}
      onStoryPress={handleStoryPress}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        titleComponent={
          <View style={styles.greetingContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.greeting}>{`नमस्ते, ${userPreferences.name}!`}</Text>
            </View>
          </View>
        }
        actionIcon="filter"
        secondaryActionIcon="message-circle"
        onSecondaryActionPress={onNavigateToChat}
        onActionPress={handleFilterPress}
      />

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={<EmptyStateComponent onAdjustPreferences={handleAdjustPreferences} />}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        currentFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: Typography.fontSize['2xl'], // Match header title size
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    // Remove paddingBottom to match ChatScreen
  },
});
