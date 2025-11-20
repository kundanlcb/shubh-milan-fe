import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { SmartImage } from '../SmartImage';
import { SmartVideo } from '../SmartVideo';
import { Colors } from '../../constants/styles';
import { Icon } from '../Icon';

const { width: screenWidth } = Dimensions.get('window');

interface PostUser {
  name: string;
  avatar: string;
  location: string;
  age: number;
  profession: string;
}

interface MediaItem {
  id: string;
  uri: string;
  type: 'image' | 'video';
}

interface PostData {
  id: string;
  user: PostUser;
  media: MediaItem[];
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
}

interface PostCardProps {
  post: PostData;
  onLike: (postId: string) => void;
  onProfile: (user: PostUser) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onSave: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onProfile,
  onShare,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const compatibilityScore = Math.floor(Math.random() * 20) + 80;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderMediaItem = ({ item }: { item: MediaItem }) => {
    if (item.type === 'video') {
      return (
        <View style={styles.mediaItem}>
          <SmartVideo
            source={{ uri: item.uri }}
            style={styles.postImage}
            resizeMode="cover"
            paused={true} // Auto-play disabled for list view by default
            controls={true} // Show controls for user interaction
          />
        </View>
      );
    }

    return (
      <View style={styles.mediaItem}>
        <SmartImage
          uri={item.uri}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => onProfile(post.user)}
        >
          <View style={styles.avatar}>
            <SmartImage uri={post.user.avatar} style={styles.avatarImage} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.username}>{post.user.name}</Text>
            <Text style={styles.userMeta}>
              {post.user.age} • {post.user.profession}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Media Gallery */}
      <View style={styles.mediaContainer}>
        {post.media.length === 1 ? (
          // Single media item - no pagination needed
          renderMediaItem({ item: post.media[0] })
        ) : (
          // Multiple media items - use horizontal FlatList
          <>
            <FlatList
              ref={flatListRef}
              data={post.media}
              renderItem={renderMediaItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              decelerationRate="fast"
              snapToInterval={screenWidth}
              snapToAlignment="start"
              style={styles.mediaFlatList}
            />

            {/* Page Indicators */}
            <View style={styles.pageIndicators}>
              {post.media.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.pageIndicator,
                    currentIndex === index && styles.activePageIndicator
                  ]}
                  onPress={() => {
                    flatListRef.current?.scrollToIndex({ index, animated: true });
                  }}
                />
              ))}
            </View>

            {/* Media Counter */}
            <View style={styles.mediaCounter}>
              <Text style={styles.mediaCounterText}>
                {currentIndex + 1}/{post.media.length}
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onLike(post.id)}
          >
            <Icon
              name={post.isLiked ? "favorite" : "favorite-border"}
              library={post.isLiked ? "material" : "material"}
              size={20}
              color={post.isLiked ? "#E91E63" : Colors.primary}
            />
            <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
              {post.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => onShare(post.id)}>
            <Icon name="share-2" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          {/* Match Compatibility */}
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>
              {compatibilityScore}% Match
            </Text>
          </View>
        </View>

        {/* Time moved to far right */}
        <Text style={styles.timeText}>{post.timeAgo} ago</Text>
      </View>

      {/* Post Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.user.name} </Text>
          {post.caption}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 1,
  },
  location: {
    fontSize: 11,
    color: '#999',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginTop: 2,
  },
  mediaContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  mediaFlatList: {
    width: '100%',
    height: '100%',
  },
  mediaItem: {
    width: screenWidth,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 4,
    borderRadius: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  likedText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  actionIcon: {
    fontSize: 24,
  },
  likedIcon: {
    color: '#E91E63',
  },
  captionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 8,
  },
  matchBadge: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12, // Add some spacing from the next element
  },
  matchText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 12,
  },
  pageIndicators: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activePageIndicator: {
    backgroundColor: Colors.primary,
  },
  mediaCounter: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  mediaCounterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
