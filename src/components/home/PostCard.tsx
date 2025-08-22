import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';
import { Icon } from '../Icon';

interface PostUser {
  name: string;
  avatar: string;
  location: string;
  age: number;
  profession: string;
}

interface PostData {
  id: string;
  user: PostUser;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
}

interface PostCardProps {
  post: PostData;
  userPreferences: {
    accountType: 'free' | 'premium';
  };
  onLike: (postId: string) => void;
  onProfile: (user: PostUser) => void;
  onContactRequest: (user: PostUser) => void;
  onComment: (postId: string) => void; // Added missing onComment
  onShare: (postId: string) => void; // Fixed signature to accept postId
  onSave: () => void;
  onViewComments: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  userPreferences,
  onLike,
  onProfile,
  onContactRequest,
  onComment, // Added onComment parameter
  onShare,
  onViewComments,
}) => {
  const compatibilityScore = Math.floor(Math.random() * 20) + 80;

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => onProfile(post.user)}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.user.avatar}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.username}>{post.user.name}</Text>
            <Text style={styles.userMeta}>
              {post.user.age} • {post.user.profession}
            </Text>
            <Text style={styles.location}>{post.user.location}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => onContactRequest(post.user)}
        >
          <Text style={styles.contactButtonText}>
            {userPreferences.accountType === 'premium' ? '📞' : '💌'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onLike(post.id)}
          >
            <Icon
              name="heart"
              library="feather"
              size={20}
              color={post.isLiked ? Colors.white : Colors.primary}
            />
            <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
              {post.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => onComment(post.id)}>
            <Icon name="message-circle" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => onShare(post.id)}>
            <Icon name="share-2" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          {/* Match Compatibility right after share button */}
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
        {post.comments > 0 && (
          <TouchableOpacity style={styles.commentsLink} onPress={onViewComments}>
            <Text style={styles.commentsText}>View all {post.comments} comments</Text>
          </TouchableOpacity>
        )}
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
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
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
  },
  contactButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  postImage: {
    width: '100%',
    height: '100%',
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
  commentsLink: {
    marginTop: 4,
  },
  commentsText: {
    fontSize: 14,
    color: '#999',
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
});
