import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors } from '../constants/styles';
import { HomeHeader } from '../components/home/HomeHeader';
import { Stories } from '../components/home/Stories';
import { PostCard } from '../components/home/PostCard';
import { EmptyState } from '../components/home/EmptyState';
import { FilterModal } from '../components/home/FilterModal';
import {
  allUsers,
  currentUserPreferences,
  filterPostsByPreferences,
  PostData,
} from '../utils/homeData';

const EmptyStateComponent: React.FC<{ onAdjustPreferences: () => void }> = ({ onAdjustPreferences }) => (
  <EmptyState onAdjustPreferences={onAdjustPreferences} />
);

export const HomeScreen: React.FC<{ onNavigateToAddPost?: () => void }> = ({ onNavigateToAddPost }) => {
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

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleProfile = (user: { name: string; avatar: string; location: string; age: number; profession: string; }) => {
    // Navigate to profile screen with premium check
    if (userPreferences.accountType === 'premium') {
      console.log('Navigate to full profile with contact details:', user.name);
      // Show full profile with contact information
    } else {
      console.log('Navigate to limited profile:', user.name);
      // Show limited profile, prompt for premium upgrade for contact details
    }
  };

  const handleContactRequest = (user: { name: string; avatar: string; location: string; age: number; profession: string; }) => {
    if (userPreferences.accountType === 'premium') {
      // Show contact details directly
      Alert.alert(
        'Contact Information',
        `Name: ${user.name}\nProfession: ${user.profession}\nLocation: ${user.location}\n\nPhone: +91 98765-43210\nEmail: ${user.name.toLowerCase().replace(' ', '.')}@email.com`,
        [{ text: 'Message', onPress: () => console.log('Open chat') },
         { text: 'Call', onPress: () => console.log('Initiate call') },
         { text: 'Close' }]
      );
    } else {
      // Prompt for premium upgrade
      Alert.alert(
        'Premium Feature 🌟',
        'Upgrade to Premium to view contact details and send unlimited messages!\n\n✓ View phone numbers\n✓ See email addresses\n✓ Unlimited chat messages\n✓ Priority in others\' feeds',
        [{ text: 'Upgrade Now', onPress: () => console.log('Show upgrade options') },
         { text: 'Send Interest', onPress: () => console.log('Send basic interest') },
         { text: 'Cancel' }]
      );
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

  // Header action handlers
  const handleHeartPress = () => console.log('Heart pressed');

  // Stories action handlers
  const handleAddStory = () => console.log('Add story pressed');
  const handleStoryPress = (user: any) => console.log('Story pressed for:', user.name);

  const renderPost = ({ item }: { item: PostData }) => (
    <PostCard
        post={item}
        userPreferences={userPreferences}
        onLike={handleLike}
        onProfile={handleProfile}
        onContactRequest={handleContactRequest}
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
    <View style={styles.container}>
      <HomeHeader
        userPreferences={userPreferences}
        onHeartPress={handleHeartPress}
        onFilterPress={handleFilterPress}
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
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        currentFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
