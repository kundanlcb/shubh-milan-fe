import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Platform,
  Alert,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  BackHandler,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/styles';
import { Icon } from '../components/Icon';
import { MainScreenProps } from '../types/navigation';

interface MediaItem {
  id: string;
  uri: string;
  type: 'image' | 'video';
  thumbnail?: string; // For videos
  duration?: number; // For videos in seconds
}

interface Message {
  id: string;
  text?: string;
  media?: MediaItem;
  timestamp: Date;
  isOwn: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'video';
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! Thank you for showing interest in my profile.',
    timestamp: new Date(Date.now() - 3600000),
    isOwn: false,
    status: 'read',
    type: 'text',
  },
  {
    id: '2',
    text: 'Hello! Nice to connect with you. I would love to know more about you and your family.',
    timestamp: new Date(Date.now() - 3500000),
    isOwn: true,
    status: 'read',
    type: 'text',
  },
  {
    id: '3',
    media: {
      id: 'img1',
      uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      type: 'image',
    },
    text: 'Here is a recent photo of mine from a family function.',
    timestamp: new Date(Date.now() - 3450000),
    isOwn: false,
    status: 'read',
    type: 'image',
  },
  {
    id: '4',
    text: 'I come from a traditional family. My father is a teacher and my mother is a homemaker.',
    timestamp: new Date(Date.now() - 3400000),
    isOwn: false,
    status: 'read',
    type: 'text',
  },
  {
    id: '5',
    media: {
      id: 'img2',
      uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      type: 'image',
    },
    text: 'That sounds wonderful. Family values are very important to me too. Here is my family photo.',
    timestamp: new Date(Date.now() - 3300000),
    isOwn: true,
    status: 'read',
    type: 'image',
  },
  {
    id: '6',
    text: 'What are your hobbies?',
    timestamp: new Date(Date.now() - 3250000),
    isOwn: true,
    status: 'read',
    type: 'text',
  },
  {
    id: '7',
    text: 'I enjoy reading, cooking, and classical music. I also love traveling and exploring new places.',
    timestamp: new Date(Date.now() - 3200000),
    isOwn: false,
    status: 'read',
    type: 'text',
  },
  {
    id: '8',
    media: {
      id: 'vid1',
      uri: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
      duration: 30,
    },
    text: 'Here is a video from my recent trip to the mountains.',
    timestamp: new Date(Date.now() - 3100000),
    isOwn: false,
    status: 'read',
    type: 'video',
  },
  {
    id: '9',
    media: {
      id: 'img3',
      uri: 'https://images.unsplash.com/photo-1464822759844-d150baef493e?w=400&h=300&fit=crop',
      type: 'image',
    },
    timestamp: new Date(Date.now() - 3000000),
    isOwn: true,
    status: 'read',
    type: 'image',
  },
  {
    id: '10',
    text: 'Beautiful! I love nature photography too.',
    timestamp: new Date(Date.now() - 2900000),
    isOwn: true,
    status: 'read',
    type: 'text',
  },
  {
    id: '11',
    media: {
      id: 'vid2',
      uri: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=225&fit=crop',
      duration: 45,
    },
    text: 'This is a video from my cooking session. I made traditional Mithila cuisine.',
    timestamp: new Date(Date.now() - 2800000),
    isOwn: false,
    status: 'read',
    type: 'video',
  },
  {
    id: '12',
    text: 'That looks delicious! I would love to try your cooking someday.',
    timestamp: new Date(Date.now() - 2700000),
    isOwn: true,
    status: 'read',
    type: 'text',
  },
  {
    id: '13',
    media: {
      id: 'img4',
      uri: 'https://images.unsplash.com/photo-1544531586-fbd0515f65e1?w=400&h=300&fit=crop',
      type: 'image',
    },
    text: 'Here is my art collection. I love traditional Mithila paintings.',
    timestamp: new Date(Date.now() - 2600000),
    isOwn: false,
    status: 'read',
    type: 'image',
  },
  {
    id: '14',
    text: 'Wow! These are absolutely stunning. You have great artistic taste.',
    timestamp: new Date(Date.now() - 2500000),
    isOwn: true,
    status: 'read',
    type: 'text',
  },
  {
    id: '15',
    text: 'We have similar interests! Would you like to have a video call sometime this week?',
    timestamp: new Date(Date.now() - 120000),
    isOwn: true,
    status: 'delivered',
    type: 'text',
  },
];

export const ChatConversationScreen: React.FC<MainScreenProps<'ChatConversation'>> = ({
  navigation,
  route,
}) => {
  const { chatName, isOnline } = route.params;
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    // Keyboard event listeners with better handling
    const keyboardDidShow = (_event: any) => {
      setIsKeyboardVisible(true);
      // Scroll to bottom when keyboard shows with delay
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 150);
    };

    const keyboardDidHide = () => {
      setIsKeyboardVisible(false);
    };

    const keyboardWillShow = (_event: any) => {
      if (Platform.OS === 'ios') {
        setIsKeyboardVisible(true);
      }
    };

    const keyboardWillHide = () => {
      if (Platform.OS === 'ios') {
        setIsKeyboardVisible(false);
      }
    };

    // Subscribe to keyboard events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    let keyboardWillShowListener: any = null;
    let keyboardWillHideListener: any = null;
    if (Platform.OS === 'ios') {
      keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
      keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    }

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      if (keyboardWillShowListener) keyboardWillShowListener.remove();
      if (keyboardWillHideListener) keyboardWillHideListener.remove();
    };
  }, []);

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (showAttachmentModal) {
        setShowAttachmentModal(false);
        return true; // Prevent default back behavior
      } else {
        navigation.goBack();
        return true; // Prevent default back behavior
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [showAttachmentModal, navigation]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
      status: 'sending',
      type: 'text',
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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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

  const handleImagePress = (_uri: string) => {
    Alert.alert('Image Viewer', 'This would open a full-screen image viewer');
  };

  const handleVideoPress = (_uri: string) => {
    Alert.alert('Video Player', 'This would open a video player');
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
          item.isOwn ? styles.ownMessage : styles.otherMessage,
          (item.type === 'image' || item.type === 'video') && styles.mediaBubble
        ]}>
          {/* Render media content */}
          {item.media && (
            <View style={styles.mediaContainer}>
              {item.type === 'image' ? (
                <TouchableOpacity onPress={() => handleImagePress(item.media!.uri)}>
                  <Image
                    source={{ uri: item.media.uri }}
                    style={styles.messageImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ) : item.type === 'video' ? (
                <TouchableOpacity onPress={() => handleVideoPress(item.media!.uri)}>
                  <View style={styles.videoContainer}>
                    <Image
                      source={{ uri: item.media.thumbnail || item.media.uri }}
                      style={styles.messageImage}
                      resizeMode="cover"
                    />
                    <View style={styles.videoOverlay}>
                      <View style={styles.playButton}>
                        <Icon name="play" library="feather" size={24} color="white" />
                      </View>
                      {item.media.duration && (
                        <View style={styles.videoDuration}>
                          <Text style={styles.videoDurationText}>
                            {formatDuration(item.media.duration)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          )}

          {/* Render text content */}
          {item.text && (
            <Text style={[
              styles.messageText,
              item.isOwn ? styles.ownMessageText : styles.otherMessageText,
              item.media && styles.messageTextWithMedia
            ]}>
              {item.text}
            </Text>
          )}

          {/* Status indicator */}
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
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

        {/* Messages Container */}
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messagesList}
            contentContainerStyle={[
              styles.messagesContent,
              isKeyboardVisible ? styles.messagesContentKeyboard : styles.messagesContentNormal
            ]}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
              }, 100);
            }}
            onLayout={() => {
              setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
              }, 100);
            }}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            }}
          />

          {/* Typing Indicator - Currently disabled */}
        </View>

        {/* Input Bar - Fixed at bottom */}
        <View style={styles.inputContainer}>
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
              onFocus={() => {
                // Scroll to bottom when input is focused
                setTimeout(() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                }, 100);
              }}
              blurOnSubmit={false}
              textAlignVertical="center"
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
        </View>

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
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
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: Spacing.md,
    flexGrow: 1,
  },
  messagesContentKeyboard: {
    paddingBottom: 10,
  },
  messagesContentNormal: {
    paddingBottom: 20,
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
  mediaBubble: {
    borderWidth: 1,
    borderColor: Colors.divider,
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
  messageTextWithMedia: {
    marginTop: Spacing.xs,
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
    paddingBottom: Platform.OS === 'ios' ? 0 : Spacing.sm,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    minHeight: 60,
  },
  attachButton: {
    padding: Spacing.sm,
    alignSelf: 'flex-end',
    marginBottom: Spacing.xs,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
    backgroundColor: Colors.background,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    maxHeight: 100,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: Spacing.xs,
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
  mediaContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  messageImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.lg,
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.lg,
    position: 'relative',
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
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  videoDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.madhubani.black,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  videoDurationText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.white,
  },
});
