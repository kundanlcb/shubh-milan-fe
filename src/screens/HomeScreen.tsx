import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors } from '../constants/styles';
import { HomeHeader } from '../components/home/HomeHeader';
import { FilterBanner } from '../components/home/FilterBanner';
import { Stories } from '../components/home/Stories';
import { PostCard } from '../components/home/PostCard';
import { EmptyState } from '../components/home/EmptyState';
import {
  allUsers,
  currentUserPreferences,
  filterPostsByPreferences,
  PostData,

} from '../utils/homeData';

const EmptyStateComponent: React.FC<{ onAdjustPreferences: () => void }> = ({ onAdjustPreferences }) => (
  <EmptyState onAdjustPreferences={onAdjustPreferences} />
);

export const HomeScreen: React.FC = () => {
  // Filter posts based on user preferences
  const filteredPosts = filterPostsByPreferences(allUsers, currentUserPreferences);
  const [posts, setPosts] = useState(filteredPosts);
  const [userPreferences] = useState(currentUserPreferences);

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

  // Header action handlers
  const handleHeartPress = () => console.log('Heart pressed');
  const handleChatPress = () => console.log('Chat pressed');
  const handleAddPress = () => console.log('Add pressed');

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
        onViewComments={() => console.log('View comments')}
    />
  );

  const renderListHeader = () => (
    <>
      <FilterBanner
        postsCount={posts.length}
        preferences={{
          ageRange: `${userPreferences.partnerAgeMin}-${userPreferences.partnerAgeMax}`,
          location: userPreferences.partnerLocation || [],
          profession: userPreferences.partnerProfession || []
        }}
      />
      <Stories
        users={posts.map(post => post.user)}
        onAddStory={handleAddStory}
        onStoryPress={handleStoryPress}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <HomeHeader
        userPreferences={{
          accountType: userPreferences.accountType,
          name: 'User' // Add a default name since it's not in the current userPreferences structure
        }}
        onHeartPress={handleHeartPress}
        onChatPress={handleChatPress}
        onAddPress={handleAddPress}
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
