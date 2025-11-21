import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/styles';
import { TabHeader } from '../components/TabHeader';
import { Stories } from '../components/home/Stories';
import { PostCard } from '../components/home/PostCard';
import { EmptyState } from '../components/home/EmptyState';
import { FilterModal } from '../components/home/FilterModal';
import { useFeed } from '../hooks';
import { currentUserPreferences, PostData } from '../utils/homeData';

const EmptyStateComponent: React.FC<{ onAdjustPreferences: () => void }> = ({
  onAdjustPreferences,
}) => <EmptyState onAdjustPreferences={onAdjustPreferences} />;

export const HomeScreen: React.FC<{
  onNavigateToAddStory?: () => void;
  onNavigateToUserProfile?: (userId: string) => void;
  onNavigateToStoryViewer?: (params: any) => void;
  onNavigateToChat?: () => void;
}> = ({
  onNavigateToAddStory,
  onNavigateToUserProfile,
  onNavigateToStoryViewer,
  onNavigateToChat,
}) => {
  // User preferences for initial filters
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

  // Use the feed hook
  const {
    posts,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    refresh,
    loadMore,
    applyFilters,
    toggleLike,
  } = useFeed(activeFilters);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

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
        uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video' as const,
      },
      {
        id: `${user.name}-3`,
        uri: `https://picsum.photos/400/800?random=${Math.floor(Math.random() * 1000)}`,
        type: 'image' as const,
      },
    ];
  };

  const handleLike = async (postId: string) => {
    await toggleLike(postId);
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

  const handleApplyFilters = async (newFilters: {
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
    await applyFilters(newFilters);
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
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <EmptyStateComponent onAdjustPreferences={handleAdjustPreferences} />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && posts.length > 0 ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : null
        }
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
