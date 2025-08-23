import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/styles';
import { Icon } from '../components/Icon';
import { MainScreenProps } from '../types/navigation';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! Thank you for showing interest in my profile.',
    timestamp: new Date(Date.now() - 3600000),
    isOwn: false,
    status: 'read',
  },
  {
    id: '2',
    text: 'Hello! Nice to connect with you. I would love to know more about you and your family.',
    timestamp: new Date(Date.now() - 3500000),
    isOwn: true,
    status: 'read',
  },
  {
    id: '3',
    text: 'I come from a traditional family. My father is a teacher and my mother is a homemaker.',
    timestamp: new Date(Date.now() - 3400000),
    isOwn: false,
    status: 'read',
  },
  {
    id: '4',
    text: 'That sounds wonderful. Family values are very important to me too. What are your hobbies?',
    timestamp: new Date(Date.now() - 3300000),
    isOwn: true,
    status: 'read',
  },
  {
    id: '5',
    text: 'I enjoy reading, cooking, and classical music. I also love traveling and exploring new places.',
    timestamp: new Date(Date.now() - 3200000),
    isOwn: false,
    status: 'read',
  },
  {
    id: '6',
    text: 'We have similar interests! Would you like to have a video call sometime this week?',
    timestamp: new Date(Date.now() - 120000),
    isOwn: true,
    status: 'delivered',
  },
];

export const ChatConversationScreen: React.FC<MainScreenProps<'ChatConversation'>> = ({
  navigation,
  route,
}) => {
  const { chatId, chatName, isOnline } = route.params;
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
      status: 'sending',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message being sent
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 1000);

    // Simulate delivery
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return '⏳';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const showTime = index === 0 ||
      messages[index - 1].timestamp.getTime() - item.timestamp.getTime() > 300000; // 5 minutes

    return (
      <View style={styles.messageContainer}>
        {showTime && (
          <Text style={styles.timeStamp}>
            {formatTime(item.timestamp)}
          </Text>
        )}
        <View style={[
          styles.messageBubble,
          item.isOwn ? styles.ownMessage : styles.otherMessage
        ]}>
          <Text style={[
            styles.messageText,
            item.isOwn ? styles.ownMessageText : styles.otherMessageText
          ]}>
            {item.text}
          </Text>
          {item.isOwn && (
            <Text style={[
              styles.messageStatus,
              item.status === 'read' && styles.readStatus
            ]}>
              {getStatusIcon(item.status)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const showMoreOptions = () => {
    Alert.alert(
      'More Options',
      'Choose an option',
      [
        { text: 'Video Call', onPress: () => Alert.alert('Video call feature coming soon!') },
        { text: 'Voice Call', onPress: () => Alert.alert('Voice call feature coming soon!') },
        { text: 'View Profile', onPress: () => {
          // Close chat conversation and navigate to user profile
          navigation.goBack();
          // We need to pass navigation through props to handle this properly
          Alert.alert('View Profile', 'Profile viewing feature will be implemented with proper navigation');
        }},
        { text: 'Block User', style: 'destructive', onPress: () => Alert.alert('Block user feature coming soon!') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAttachment = () => {
    setShowAttachmentModal(true);
  };

  const handleAttachmentOption = (type: 'camera' | 'gallery' | 'document' | 'location') => {
    setShowAttachmentModal(false);

    switch (type) {
      case 'camera':
        Alert.alert('Camera', 'Opening camera to take a photo...\n\nThis would integrate with react-native-image-picker or similar library in a real app.');
        break;
      case 'gallery':
        Alert.alert('Gallery', 'Opening photo gallery...\n\nThis would integrate with react-native-image-picker or similar library in a real app.');
        break;
      case 'document':
        Alert.alert('Documents', 'Opening document picker...\n\nThis would integrate with react-native-document-picker in a real app.');
        break;
      case 'location':
        Alert.alert('Location', 'Sharing current location...\n\nThis would integrate with geolocation services in a real app.');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" library="feather" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, isOnline && styles.onlineAvatar]}>
              <Text style={styles.avatarText}>{chatName.charAt(0)}</Text>
            </View>
            {isOnline && <View style={styles.onlineIndicator} />}
          </View>

          <View style={styles.headerText}>
            <Text style={styles.headerName}>{chatName}</Text>
            <Text style={styles.headerStatus}>
              {isOnline ? 'Online' : 'Last seen recently'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton} onPress={showMoreOptions}>
          <Icon name="more-vertical" library="feather" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Typing Indicator */}
      {false && (
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>{chatName} is typing...</Text>
        </View>
      )}

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachButton} onPress={handleAttachment}>
            <Icon name="paperclip" library="feather" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={Colors.inputPlaceholder}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={1000}
          />

          <TouchableOpacity
            style={[styles.sendButton, newMessage.trim() && styles.sendButtonActive]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Icon
              name="send"
              library="feather"
              size={20}
              color={newMessage.trim() ? Colors.textInverse : Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Attachment Options Modal */}
      <Modal
        visible={showAttachmentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAttachmentModal(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setShowAttachmentModal(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Attach a file</Text>
              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={() => setShowAttachmentModal(false)}
              >
                <Icon name="x" library="feather" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalOptionsContainer}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleAttachmentOption('camera')}
                activeOpacity={0.7}
              >
                <View style={[styles.modalOptionIcon, { backgroundColor: Colors.primaryLight }]}>
                  <Icon name="camera" library="feather" size={24} color={Colors.white} />
                </View>
                <View style={styles.modalOptionTextContainer}>
                  <Text style={styles.modalOptionText}>Camera</Text>
                  <Text style={styles.modalOptionSubtext}>Take a photo</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleAttachmentOption('gallery')}
                activeOpacity={0.7}
              >
                <View style={[styles.modalOptionIcon, { backgroundColor: Colors.secondary }]}>
                  <Icon name="image" library="feather" size={24} color={Colors.white} />
                </View>
                <View style={styles.modalOptionTextContainer}>
                  <Text style={styles.modalOptionText}>Gallery</Text>
                  <Text style={styles.modalOptionSubtext}>Choose from gallery</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleAttachmentOption('document')}
                activeOpacity={0.7}
              >
                <View style={[styles.modalOptionIcon, { backgroundColor: Colors.info }]}>
                  <Icon name="file" library="feather" size={24} color={Colors.white} />
                </View>
                <View style={styles.modalOptionTextContainer}>
                  <Text style={styles.modalOptionText}>Documents</Text>
                  <Text style={styles.modalOptionSubtext}>Share files</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleAttachmentOption('location')}
                activeOpacity={0.7}
              >
                <View style={[styles.modalOptionIcon, { backgroundColor: Colors.success }]}>
                  <Icon name="map-pin" library="feather" size={24} color={Colors.white} />
                </View>
                <View style={styles.modalOptionTextContainer}>
                  <Text style={styles.modalOptionText}>Location</Text>
                  <Text style={styles.modalOptionSubtext}>Share location</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.backgroundCard,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineAvatar: {
    backgroundColor: Colors.success,
  },
  avatarText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textInverse,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.backgroundCard,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  headerStatus: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
  moreButton: {
    marginLeft: Spacing.md,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: Spacing.md,
  },
  messageContainer: {
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  timeStamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xs,
  },
  ownMessage: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: BorderRadius.sm,
  },
  otherMessage: {
    backgroundColor: Colors.backgroundCard,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: BorderRadius.sm,
  },
  messageText: {
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
  },
  ownMessageText: {
    color: Colors.textInverse,
  },
  otherMessageText: {
    color: Colors.textPrimary,
  },
  messageStatus: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textInverse,
    opacity: 0.7,
    alignSelf: 'flex-end',
    marginTop: Spacing.xs,
  },
  readStatus: {
    color: Colors.info,
  },
  typingContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  typingText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: Colors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  attachButton: {
    padding: Spacing.sm,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalBackground,
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  modalCloseIcon: {
    padding: Spacing.sm,
  },
  modalOptionsContainer: {
    // marginTop: Spacing.sm,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  modalOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOptionTextContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  modalOptionText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  modalOptionSubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
});
