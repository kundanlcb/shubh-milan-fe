/**
 * Media Upload Service
 * Handles file uploads to server
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class MediaService {
  /**
   * Upload media file (image or video)
   */
  async uploadMedia(
    file: {
      uri: string;
      type: string;
      name: string;
    },
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ key: string; url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);

      const response = await apiClient.upload<{ key: string; url: string }>(
        API_ENDPOINTS.UPLOAD.MEDIA,
        formData,
        (percentage) => {
          if (onProgress) {
            onProgress({
              loaded: percentage,
              total: 100,
              percentage,
            });
          }
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload multiple media files
   */
  async uploadMultipleMedia(
    files: Array<{
      uri: string;
      type: string;
      name: string;
    }>,
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<Array<{ key: string; url: string }>> {
    try {
      const uploadPromises = files.map((file, index) =>
        this.uploadMedia(file, (progress) => {
          if (onProgress) {
            onProgress(index, progress);
          }
        })
      );

      return await Promise.all(uploadPromises);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload image with compression
   */
  async uploadImage(
    imageUri: string,
    options?: {
      quality?: number;
      maxWidth?: number;
      maxHeight?: number;
    },
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ key: string; url: string }> {
    try {
      // In a real implementation, you might want to compress the image here
      // using a library like react-native-image-resizer
      
      const file = {
        uri: imageUri,
        type: 'image/jpeg',
        name: `image_${Date.now()}.jpg`,
      };

      return await this.uploadMedia(file, onProgress);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload video
   */
  async uploadVideo(
    videoUri: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ key: string; url: string }> {
    try {
      const file = {
        uri: videoUri,
        type: 'video/mp4',
        name: `video_${Date.now()}.mp4`,
      };

      return await this.uploadMedia(file, onProgress);
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const mediaService = new MediaService();
