import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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
  return (
    <View style={styles.storiesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.addStoryButton} onPress={onAddStory}>
          <View style={styles.addStoryCircle}>
            <Text style={styles.addStoryIcon}>+</Text>
          </View>
          <Text style={styles.storyLabel}>Your Story</Text>
        </TouchableOpacity>

        {users.slice(0, 5).map((user, index) => (
          <TouchableOpacity
            key={index}
            style={styles.storyItem}
            onPress={() => onStoryPress(user)}
          >
            <View style={styles.storyCircle}>
              <Text style={styles.storyAvatar}>{user.avatar}</Text>
            </View>
            <Text style={styles.storyLabel} numberOfLines={1}>
              {user.name.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        ))}
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
    borderWidth: 2,
    borderColor: '#E91E63',
  },
  storyAvatar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  storyLabel: {
    fontSize: 12,
    marginTop: 6,
    color: '#333',
    width: 60,
    textAlign: 'center',
  },
});
