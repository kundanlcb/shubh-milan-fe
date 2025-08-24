import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary, launchCamera, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import { Colors, Spacing } from '../constants/styles';
import { TabHeader } from '../components/TabHeader';

interface AddPostScreenProps {
  navigation: any;
}

export const AddPostScreen: React.FC<AddPostScreenProps> = ({ navigation }) => {
  const [caption, setCaption] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<{
    uri: string;
    type: 'image' | 'video';
    fileName?: string;
    fileSize?: number;
  } | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleSelectImage = () => {
    Alert.alert(
      'Select Media',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = () => {
    const options = {
      mediaType: 'mixed' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8 as const,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setSelectedMedia({
          uri: asset.uri || '',
          type: asset.type?.includes('video') ? 'video' : 'image',
          fileName: asset.fileName,
          fileSize: asset.fileSize,
        });
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'mixed' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8 as const,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setSelectedMedia({
          uri: asset.uri || '',
          type: asset.type?.includes('video') ? 'video' : 'image',
          fileName: asset.fileName,
          fileSize: asset.fileSize,
        });
      }
    });
  };

  const handleRemoveMedia = () => {
    setSelectedMedia(null);
  };

  const handlePost = async () => {
    if (!selectedMedia && !caption.trim()) {
      Alert.alert('Error', 'Please add an image or caption to post');
      return;
    }

    setIsPosting(true);

    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));

      Alert.alert(
        'Success!',
        'Your post has been shared successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Header */}
      <TabHeader
        title="New Post"
        actionIcon={isPosting ? "loader" : "send"}
        onActionPress={(!selectedMedia && !caption.trim()) || isPosting ? undefined : handlePost}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Media Section */}
        <View style={styles.mediaSection}>
          {selectedMedia ? (
            <View style={styles.selectedMediaContainer}>
              <Image source={{ uri: selectedMedia.uri }} style={styles.selectedMedia} />
              <TouchableOpacity
                style={styles.removeMediaButton}
                onPress={handleRemoveMedia}
              >
                <Text style={styles.removeMediaText}>��</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addMediaButton} onPress={handleSelectImage}>
              <Text style={styles.addMediaIcon}>📷</Text>
              <Text style={styles.addMediaText}>Add Photo or Video</Text>
              <Text style={styles.addMediaSubtext}>Share your special moments</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Caption Section */}
        <View style={styles.captionSection}>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption... Share your thoughts, feelings, or what makes this moment special!"
            placeholderTextColor="#999"
            multiline
            value={caption}
            onChangeText={setCaption}
            maxLength={500}
          />
          <Text style={styles.characterCount}>{caption.length}/500</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Add</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionEmoji}>📍</Text>
              <Text style={styles.quickActionText}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionEmoji}>😊</Text>
              <Text style={styles.quickActionText}>Feeling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionEmoji}>👥</Text>
              <Text style={styles.quickActionText}>Tag People</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionEmoji}>🎵</Text>
              <Text style={styles.quickActionText}>Music</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips for better posts</Text>
          <Text style={styles.tipText}>• Share genuine moments from your life</Text>
          <Text style={styles.tipText}>• Add meaningful captions that reflect your personality</Text>
          <Text style={styles.tipText}>• High-quality photos get more attention</Text>
          <Text style={styles.tipText}>• Be authentic and positive</Text>
        </View>
      </ScrollView>
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
  mediaSection: {
    margin: 16,
  },
  addMediaButton: {
    height: 200,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  addMediaIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  addMediaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  addMediaSubtext: {
    fontSize: 14,
    color: '#666',
  },
  selectedMediaContainer: {
    position: 'relative',
  },
  selectedMedia: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeMediaButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeMediaText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  captionSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  captionInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  quickActions: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  quickActionItem: {
    alignItems: 'center',
    marginRight: 20,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 80,
  },
  quickActionEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tipsSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    lineHeight: 16,
  },
});
