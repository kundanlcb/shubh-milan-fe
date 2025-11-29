import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Clipboard,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon } from '../components/Icon';

type Props = {
  onConfigSave?: (baseURL: string) => void;
};

export const BackendConfigScreen: React.FC<Props> = ({ onConfigSave }) => {
  const [backendUrl, setBackendUrl] = useState('https://9b475a10bbfd.ngrok-free.app/api');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = async () => {
    try {
      const clipboardText = await Clipboard.getString();
      if (clipboardText) {
        setBackendUrl(clipboardText.trim());
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to paste from clipboard');
    }
  };

  const handleSave = async () => {
    if (!backendUrl.trim()) {
      Alert.alert('Error', 'Please enter a backend URL');
      return;
    }

    // Basic URL validation
    if (!backendUrl.startsWith('http://') && !backendUrl.startsWith('https://')) {
      Alert.alert('Error', 'URL must start with http:// or https://');
      return;
    }

    setIsLoading(true);
    try {
      const AsyncStorage = await import('@react-native-async-storage/async-storage').then(m => m.default);
      await AsyncStorage.setItem('BACKEND_URL', backendUrl.trim());

      setIsLoading(false);

      if (onConfigSave) {
        onConfigSave(backendUrl.trim());
      } else {
        Alert.alert('Success', 'Backend URL saved successfully');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to save backend URL');
    }
  };

  const handleSkip = () => {
    if (onConfigSave) {
      onConfigSave(backendUrl);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Backend Configuration</Text>
            <Text style={styles.subtitle}>Configure your backend API URL</Text>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Backend URL</Text>
              <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                <TextInput
                  style={styles.input}
                  placeholder="https://api.example.com/api"
                  placeholderTextColor={Colors.textSecondary}
                  value={backendUrl}
                  onChangeText={setBackendUrl}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  editable={!isLoading}
                  multiline={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Action Buttons Row */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.pasteButton, isLoading && styles.buttonDisabled]}
                  onPress={handlePaste}
                  disabled={isLoading}
                >
                  <Icon
                    name="copy"
                    library="feather"
                    size={16}
                    color={Colors.primary}
                  />
                  <Text style={styles.pasteButtonText}>Paste</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.saveButton, isLoading && styles.buttonDisabled]}
                  onPress={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.textInverse} />
                  ) : (
                    <>
                      <Icon
                        name="check"
                        library="feather"
                        size={16}
                        color={Colors.textInverse}
                      />
                      <Text style={styles.saveButtonText}>Save</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Skip Button */}
          <View style={styles.skipButtonContainer}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              disabled={isLoading}
            >
              <Text style={styles.skipButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: Spacing.xl,
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: Spacing.xl,
  },
  inputGroup: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  label: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    marginBottom: Spacing.md,
  },
  inputWrapperFocused: {
    borderColor: Colors.primary,
  },
  input: {
    padding: Spacing.md,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    minHeight: 56,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  pasteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
  },
  pasteButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
  },
  saveButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textInverse,
  },
  skipButtonContainer: {
    marginTop: Spacing.xl,
  },
  skipButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

