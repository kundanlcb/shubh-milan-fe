import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows, GlobalStyles } from '../constants/styles';
import { Icon } from '../components/Icon';
import { MainScreenProps } from '../types/navigation';

interface ProfileFormData {
  name: string;
  age: string;
  height: string;
  location: string;
  profession: string;
  education: string;
  bio: string;
  phone: string;
  email: string;
  interests: string;
  familyType: string;
  maritalStatus: string;
  motherTongue: string;
  religion: string;
  caste: string;
  income: string;
}

export const EditProfileScreen: React.FC<MainScreenProps<'EditProfile'>> = ({
  navigation,
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: 'Priya Sharma',
    age: '25',
    height: "5'4\"",
    location: 'Darbhanga, Bihar',
    profession: 'Teacher',
    education: 'M.A. Hindi Literature',
    bio: 'Traditional values with modern outlook. Looking for a caring and understanding life partner.',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    interests: 'Reading, Cooking, Classical Music, Travel',
    familyType: 'Nuclear Family',
    maritalStatus: 'Never Married',
    motherTongue: 'Hindi',
    religion: 'Hindu',
    caste: 'Brahmin',
    income: '5-7 Lakhs per annum',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Profile Updated',
        'Your profile has been updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1500);
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleBackPress = useCallback(() => {
    // For back gesture/button, directly go back without confirmation
    navigation.goBack();
    return true; // Prevent default back behavior
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [handleBackPress]);

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const renderInput = (
    label: string,
    field: keyof ProfileFormData,
    placeholder?: string,
    multiline?: boolean,
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={Colors.inputPlaceholder}
        multiline={multiline}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleCancel}
        >
          <Icon name="x" library="feather" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity
          style={[styles.headerButton, styles.saveButton]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={[styles.saveButtonText, isLoading && styles.saveButtonTextDisabled]}>
            {isLoading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.profilePhotoContainer}>
            <View style={styles.profilePhoto}>
              <Text style={styles.profilePhotoText}>{formData.name.charAt(0)}</Text>
            </View>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Icon name="camera" library="feather" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.changePhotoText}>
            <Text style={styles.changePhotoTextLabel}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Basic Information */}
        {renderSection('Basic Information', (
          <>
            {renderInput('Full Name', 'name', 'Enter your full name')}
            {renderInput('Age', 'age', 'Enter your age', false, 'numeric')}
            {renderInput('Height', 'height', "e.g., 5'6\"")}
            {renderInput('Location', 'location', 'City, State')}
            {renderInput('About Me', 'bio', 'Tell something about yourself...', true)}
          </>
        ))}

        {/* Professional Information */}
        {renderSection('Professional Information', (
          <>
            {renderInput('Profession', 'profession', 'Your current profession')}
            {renderInput('Education', 'education', 'Your highest qualification')}
            {renderInput('Annual Income', 'income', 'Income range')}
          </>
        ))}

        {/* Contact Information */}
        {renderSection('Contact Information', (
          <>
            {renderInput('Phone Number', 'phone', 'Enter phone number', false, 'phone-pad')}
            {renderInput('Email Address', 'email', 'Enter email address', false, 'email-address')}
          </>
        ))}

        {/* Personal Details */}
        {renderSection('Personal Details', (
          <>
            {renderInput('Marital Status', 'maritalStatus', 'Never Married, Divorced, etc.')}
            {renderInput('Mother Tongue', 'motherTongue', 'Your native language')}
            {renderInput('Religion', 'religion', 'Your religion')}
            {renderInput('Caste', 'caste', 'Your caste/community')}
            {renderInput('Family Type', 'familyType', 'Nuclear, Joint, etc.')}
          </>
        ))}

        {/* Interests & Hobbies */}
        {renderSection('Interests & Hobbies', (
          <>
            {renderInput('Interests', 'interests', 'e.g., Reading, Music, Travel...', true)}
          </>
        ))}

        {/* Save Button at Bottom */}
        <TouchableOpacity
          style={[styles.bottomSaveButton, isLoading && styles.bottomSaveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={[styles.bottomSaveButtonText, isLoading && styles.bottomSaveButtonTextDisabled]}>
            {isLoading ? 'Saving Profile...' : 'Save Profile'}
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    ...Shadows.sm,
  },
  headerButton: {
    padding: Spacing.sm,
    minWidth: 60,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  saveButtonTextDisabled: {
    opacity: 0.6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.backgroundCard,
    marginBottom: Spacing.lg,
  },
  profilePhotoContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  profilePhotoText: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.backgroundCard,
  },
  changePhotoText: {
    padding: Spacing.sm,
  },
  changePhotoTextLabel: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  sectionContent: {
    backgroundColor: Colors.backgroundCard,
    paddingVertical: Spacing.sm,
    ...Shadows.sm,
  },
  inputGroup: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  input: {
    ...GlobalStyles.input,
    marginBottom: 0,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: Spacing.md,
  },
  bottomSaveButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  bottomSaveButtonDisabled: {
    opacity: 0.6,
  },
  bottomSaveButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  bottomSaveButtonTextDisabled: {
    opacity: 0.8,
  },
});
