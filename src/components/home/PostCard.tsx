import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

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
  onChat: () => void;
  onShare: () => void;
  onSave: () => void;
  onViewComments: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  userPreferences,
  onLike,
  onProfile,
  onContactRequest,
  onChat,
  onShare,
  onSave,
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
            <Text style={[styles.actionIcon, post.isLiked && styles.likedIcon]}>
              {post.isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onChat}
          >
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={onSave}>
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Post Stats */}
      <View style={styles.postStats}>
        <Text style={styles.likesText}>{post.likes} likes</Text>
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

      {/* Match Compatibility Badge */}
      <View style={styles.compatibilityBadge}>
        <Text style={styles.compatibilityText}>
          ✨ {compatibilityScore}% Match
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
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  likedIcon: {
    color: '#E91E63',
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  likesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
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
  compatibilityBadge: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  compatibilityText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
