import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SmartImage } from '../SmartImage';
import { Colors } from '../../constants/styles';

interface User {
  name: string;
  avatar: string;
}

interface StoriesProps {
  users: User[];
  onAddStory: () => void;
  onStoryPress: (user: User) => void;
}

export const Stories: React.FC<StoriesProps> = ({
  users,
  onAddStory,
  onStoryPress,
}) => {
  const [seenStories, setSeenStories] = useState<Set<string>>(new Set());

  const handleStoryPress = (user: User) => {
    // Mark this story as seen
    setSeenStories(prev => new Set(prev).add(user.name));

    // Call the parent callback to handle story viewing
    onStoryPress(user);
  };

  return (
    <View style={styles.storiesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.addStoryButton} onPress={onAddStory}>
          <View style={styles.addStoryCircle}>
            <Text style={styles.addStoryIcon}>+</Text>
          </View>
          <Text style={styles.storyLabel}>Your Story</Text>
        </TouchableOpacity>

        {users.slice(0, 5).map((user, index) => {
          const isSeen = seenStories.has(user.name);
          return (
            <TouchableOpacity
              key={index}
              style={styles.storyItem}
              onPress={() => handleStoryPress(user)}
            >
              <View style={[
                styles.storyCircle,
                isSeen ? styles.storyCircleSeen : styles.storyCircleUnseen
              ]}>
                <SmartImage uri={user.avatar} style={styles.storyAvatarImage} />
              </View>
              <Text style={styles.storyLabel} numberOfLines={1}>
                {user.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 8,
  },
  addStoryButton: {
    alignItems: 'center',
    marginRight: 6, // Slightly reduced horizontal space
    width: 80, // Slightly reduced width
  },
  addStoryCircle: {
    width: 72, // Slightly reduced size
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
    marginBottom: 8, // Slightly reduced space below circle
  },
  addStoryIcon: {
    fontSize: 32,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 6, // Slightly reduced horizontal space
    width: 80, // Slightly reduced width
  },
  storyCircle: {
    width: 72, // Slightly reduced size
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, // Slightly reduced space below circle
  },
  storyCircleUnseen: {
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  storyCircleSeen: {
    borderWidth: 2,
    borderColor: Colors.textTertiary,
  },
  storyAvatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  storyLabel: {
    fontSize: 12,
    color: Colors.textPrimary,
    maxWidth: 70,
    textAlign: 'center',
  },
});
