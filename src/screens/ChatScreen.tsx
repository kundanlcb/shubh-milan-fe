import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Colors, Typography, Spacing, BorderRadius, Shadows, GlobalStyles} from '../constants/styles';
import { Icon } from '../components/Icon';
import { MainScreenProps } from '../types/navigation';

// Mock chat data
const chatData = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://picsum.photos/200/200?random=1001',
    lastMessage: 'Thank you for showing interest in my profile',
    timestamp: '2 min ago',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Anjali Mishra',
    avatar: 'https://picsum.photos/200/200?random=1002',
    lastMessage: 'I would like to know more about your family',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Kavita Jha',
    avatar: 'https://picsum.photos/200/200?random=1003',
    lastMessage: 'Can we schedule a video call?',
    timestamp: '3 hours ago',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Rekha Singh',
    avatar: 'https://picsum.photos/200/200?random=1004',
    lastMessage: 'Nice to connect with you',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '5',
    name: 'Meera Thakur',
    avatar: 'https://picsum.photos/200/200?random=1009',
    lastMessage: 'Looking forward to meeting your family',
    timestamp: '2 days ago',
    unreadCount: 0,
    isOnline: false,
  },
];

export const ChatScreen: React.FC<MainScreenProps<'Chat'>> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState(chatData);

  useEffect(() => {
    // Only add listener if navigation has addListener method (React Navigation)
    if (navigation?.addListener) {
      const unsubscribe = navigation.addListener('focus', () => {
        // Code to run when the screen is focused
        // For example, you can fetch the latest chat data here
      });

      return unsubscribe;
    }
  }, [navigation]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredChats(chatData);
    } else {
      const filtered = chatData.filter(chat =>
        chat.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  };

  const handleNewChat = () => {
    Alert.alert(
      'Start New Chat',
      'How would you like to start a new conversation?',
      [
        { text: 'Browse Profiles', onPress: () => navigation.navigate('Search') },
        { text: 'From Interests', onPress: () => Alert.alert('Feature coming soon!') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'newChat':
        handleNewChat();
        break;
      case 'discover':
        navigation.navigate('Search');
        break;
      case 'interests':
        Alert.alert('Interests', 'Browse people with similar interests feature coming soon!');
        break;
    }
  };

  const renderChatItem = ({ item }: { item: typeof chatData[0] }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatConversation', {
        chatId: item.id,
        chatName: item.name,
        isOnline: item.isOnline,
      })}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, item.isOnline && styles.onlineAvatar]}>
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        </View>
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={[
            styles.lastMessage,
            item.unreadCount > 0 && styles.unreadMessage
          ]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateIconContainer}>
          <Icon name="message-circle" library="feather" size={48} color={Colors.textSecondary} />
        </View>
        <Text style={styles.emptyStateTitle}>No Messages Yet</Text>
        <Text style={styles.emptyStateSubtitle}>
          Start connecting with people and your conversations will appear here
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
          <Icon name="plus" library="feather" size={20} color={Colors.textInverse} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={Colors.inputPlaceholder}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction} onPress={() => handleQuickAction('newChat')}>
          <View style={styles.quickActionIconContainer}>
            <Icon name="mail" library="feather" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.quickActionText}>New Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction} onPress={() => handleQuickAction('discover')}>
          <View style={styles.quickActionIconContainer}>
            <Icon name="search" library="feather" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.quickActionText}>Discover</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction} onPress={() => handleQuickAction('interests')}>
          <View style={styles.quickActionIconContainer}>
            <Icon name="heart" library="feather" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.quickActionText}>Interests</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  newChatIcon: {
    fontSize: 18,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchInput: {
    ...GlobalStyles.input,
    marginBottom: 0,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  onlineAvatar: {
    backgroundColor: Colors.success,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  chatName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  unreadMessage: {
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  unreadCount: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textInverse,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyStateContainer: {
    alignItems: 'center',
  },
  emptyStateIconContainer: {
    marginBottom: Spacing.md,
  },
  emptyStateTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    marginBottom: Spacing.xl,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    gap: Spacing.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  quickActionIconContainer: {
    marginRight: Spacing.sm,
  },
  quickActionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
});
