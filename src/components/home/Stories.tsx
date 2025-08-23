import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
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
                <Image source={{ uri: user.avatar }} style={styles.storyAvatarImage} />
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
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  addStoryButton: {
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 12,
  },
  addStoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: '#DDD',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStoryIcon: {
    fontSize: 22,
    color: '#666',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  storyCircleUnseen: {
    borderColor: '#E91E63', // Magenta border for unseen stories
  },
  storyCircleSeen: {
    borderColor: '#999', // Grey border for seen stories
  },
  storyAvatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  storyLabel: {
    fontSize: 12,
    marginTop: 6,
    color: '#333',
    width: 60,
    textAlign: 'center',
  },
});
