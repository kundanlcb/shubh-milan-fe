import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary, launchCamera, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import { Colors } from '../constants/styles';
import { Icon } from '../components/Icon';

interface AddStoryScreenProps {
  navigation: any;
}

export const AddStoryScreen: React.FC<AddStoryScreenProps> = ({ navigation }) => {
  const [selectedMedia, setSelectedMedia] = useState<{
    uri: string;
    type: 'image' | 'video';
    fileName?: string;
  } | null>(null);
  const [storyText, setStoryText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSelectMedia = () => {
    Alert.alert(
      'Select Media',
      'Choose how you want to add media to your story',
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
        });
      }
    });
  };

  const handleRemoveMedia = () => {
    setSelectedMedia(null);
  };

  const handlePostStory = async () => {
    if (!selectedMedia && !storyText.trim()) {
      Alert.alert('Error', 'Please add an image or text to your story');
      return;
    }

    setIsPosting(true);

    try {
      // Simulate API call to post story
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));

      Alert.alert(
        'Story Posted! 🎉',
        'Your story has been shared successfully and will be visible to your connections for 24 hours.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to post story. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" library="feather" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Story</Text>
        <TouchableOpacity
          onPress={handlePostStory}
          disabled={isPosting || (!selectedMedia && !storyText.trim())}
          style={[
            styles.postButton,
            (!selectedMedia && !storyText.trim()) && styles.disabledButton
          ]}
        >
          <Text style={[
            styles.postButtonText,
            (!selectedMedia && !storyText.trim()) && styles.disabledButtonText
          ]}>
            {isPosting ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

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
                <Icon name="x" library="feather" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addMediaButton} onPress={handleSelectMedia}>
              <Icon name="camera" library="feather" size={40} color="#666" />
              <Text style={styles.addMediaText}>Add Photo or Video</Text>
              <Text style={styles.addMediaSubtext}>Share your moment with everyone</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Text Section */}
        <View style={styles.textSection}>
          <Text style={styles.textSectionTitle}>Story Text (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind? Share your thoughts..."
            placeholderTextColor="#999"
            multiline
            value={storyText}
            onChangeText={setStoryText}
            maxLength={200}
          />
          <Text style={styles.characterCount}>{storyText.length}/200</Text>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Story Tips</Text>
          <Text style={styles.tipText}>• Stories disappear after 24 hours</Text>
          <Text style={styles.tipText}>• Share authentic moments from your life</Text>
          <Text style={styles.tipText}>• Use good lighting for better photos</Text>
          <Text style={styles.tipText}>• Keep text short and engaging</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  postButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  postButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#999',
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
  addMediaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
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
  textSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  textSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 80,
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
