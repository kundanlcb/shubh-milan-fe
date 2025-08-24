import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'match' | 'message' | 'profile_view' | 'interest';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  userName?: string;
}

// Mock notification data
const notificationData: Notification[] = [
  {
    id: '1',
    type: 'match',
    title: 'New Match!',
    description: 'You and Priya Sharma liked each other',
    timestamp: '2 min ago',
    isRead: false,
    avatar: 'https://picsum.photos/200/200?random=1001',
    userName: 'Priya Sharma',
  },
  {
    id: '2',
    type: 'like',
    title: 'Someone liked your profile',
    description: 'Anjali Mishra liked your profile',
    timestamp: '1 hour ago',
    isRead: false,
    avatar: 'https://picsum.photos/200/200?random=1002',
    userName: 'Anjali Mishra',
  },
  {
    id: '3',
    type: 'profile_view',
    title: 'Profile View',
    description: 'Rakesh Kumar viewed your profile',
    timestamp: '3 hours ago',
    isRead: true,
    avatar: 'https://picsum.photos/200/200?random=1003',
    userName: 'Rakesh Kumar',
  },
  {
    id: '4',
    type: 'interest',
    title: 'Interest Received',
    description: 'Sunita Devi sent you an interest',
    timestamp: '1 day ago',
    isRead: true,
    avatar: 'https://picsum.photos/200/200?random=1004',
    userName: 'Sunita Devi',
  },
  {
    id: '5',
    type: 'comment',
    title: 'New Comment',
    description: 'Someone commented on your post',
    timestamp: '2 days ago',
    isRead: true,
    avatar: 'https://picsum.photos/200/200?random=1005',
    userName: 'Amit Singh',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

export const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationData);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return { name: 'heart', color: Colors.error };
      case 'like':
        return { name: 'thumbs-up', color: Colors.primary };
      case 'comment':
        return { name: 'message-circle', color: Colors.success };
      case 'message':
        return { name: 'message-square', color: Colors.primary };
      case 'profile_view':
        return { name: 'eye', color: Colors.warning };
      case 'interest':
        return { name: 'star', color: Colors.primary };
      default:
        return { name: 'bell', color: Colors.textSecondary };
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderNotification = ({ item }: { item: Notification }) => {
    const iconConfig = getNotificationIcon(item.type);

    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !item.isRead && styles.unreadItem
        ]}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.notificationContent}>
          <View style={styles.avatarSection}>
            {item.avatar ? (
              <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.iconContainer, { backgroundColor: `${iconConfig.color}20` }]}>
                <Icon
                  name={iconConfig.name}
                  library="feather"
                  size={20}
                  color={iconConfig.color}
                />
              </View>
            )}
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>

          <View style={styles.textSection}>
            <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>
              {item.title}
            </Text>
            <Text style={styles.description}>
              {item.description}
            </Text>
            <Text style={styles.timestamp}>
              {item.timestamp}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Notifications"
        actionIcon={unreadCount > 0 ? "check-circle" : undefined}
        onActionPress={unreadCount > 0 ? markAllAsRead : undefined}
      />

      <View style={styles.content}>
        {unreadCount > 0 && (
          <View style={styles.unreadBanner}>
            <Text style={styles.unreadBannerText}>
              You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </Text>
          </View>
        )}

        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  unreadBanner: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginTop: Spacing.xs,
  },
  unreadBannerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  listContainer: {
    // Remove horizontal padding to make items full width
  },
  notificationItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  unreadItem: {
    backgroundColor: Colors.primary + '08',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarSection: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  textSection: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  unreadTitle: {
    fontWeight: Typography.fontWeight.semibold,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
  separator: {
    height: 0,
  },
});
