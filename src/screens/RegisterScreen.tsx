import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/styles';
import { FloatingInput } from '../components/FloatingInput';
import RegisterBasicInfo from './RegisterBasicInfo';
import RegisterAboutYou from './RegisterAboutYou';
import RegisterPartnerPreferences from './RegisterPartnerPreferences';
import RegisterAccountSettings from './RegisterAccountSettings';

type NavigationProp = {
  navigate: (screen: string) => void;
};

type Props = {
  navigation: NavigationProp;
};

interface RegistrationData {
  // Basic Info
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  // Personal Details
  age: string;
  gender: string;
  profession: string;
  education: string;
  location: string;
  motherTongue: string;
  religion: string;

  // Partner Preferences (for filtered content)
  partnerAgeMin: string;
  partnerAgeMax: string;
  partnerProfession: string[];
  partnerEducation: string[];
  partnerLocation: string[];
  partnerReligion: string;

  // Account Settings
  accountType: 'free' | 'premium';
  privacyLevel: 'public' | 'filtered' | 'private';
}

const stepCategories = [
  'Basic Information',
  'About You',
  'Partner Preferences',
  'Account Settings',
];

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    profession: '',
    education: '',
    location: '',
    motherTongue: '',
    religion: '',
    partnerAgeMin: '',
    partnerAgeMax: '',
    partnerProfession: [],
    partnerEducation: [],
    partnerLocation: [],
    partnerReligion: '',
    accountType: 'free',
    privacyLevel: 'filtered',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Focus states for floating labels
  const [focusedFields, setFocusedFields] = useState<{[key: string]: boolean}>({});

  // Animation values for floating labels
  const [labelAnimations] = useState<{[key: string]: Animated.Value}>({
    fullName: new Animated.Value(0),
    email: new Animated.Value(0),
    phone: new Animated.Value(0),
    password: new Animated.Value(0),
    confirmPassword: new Animated.Value(0),
    age: new Animated.Value(0),
    profession: new Animated.Value(0),
    education: new Animated.Value(0),
    location: new Animated.Value(0),
    motherTongue: new Animated.Value(0),
    religion: new Animated.Value(0),
    partnerAgeMin: new Animated.Value(0),
    partnerAgeMax: new Animated.Value(0),
  });

  const professionOptions = [
    'Teacher', 'Software Engineer', 'Doctor', 'Business Owner', 'Government Employee',
    'Farmer', 'Artist', 'Lawyer', 'Accountant', 'Student', 'Other'
  ];

  const locationOptions = [
    'Darbhanga', 'Muzaffarpur', 'Madhubani', 'Saharsa', 'Begusarai', 'Bhagalpur',
    'Janakpur', 'Birgunj', 'Kathmandu', 'Other'
  ];

  const updateFormData = (field: keyof RegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (array: string[], item: string, field: keyof RegistrationData) => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    updateFormData(field, newArray);
  };

  const validateStep1 = () => {
    // Validation disabled for UI testing
    return true;

    // Original validation code commented out:
    /*
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
    */
  };

  const validateStep2 = () => {
    // Validation disabled for UI testing
    return true;

    // Original validation code commented out:
    /*
    if (!formData.age || !formData.gender || !formData.profession || !formData.location) {
      Alert.alert('Error', 'Please fill all required fields');
      return false;
    }
    return true;
    */
  };

  const validateStep3 = () => {
    // Validation disabled for UI testing
    return true;

    // Original validation code commented out:
    /*
    if (!formData.partnerAgeMin || !formData.partnerAgeMax) {
      Alert.alert('Error', 'Please specify partner age preferences');
      return false;
    }
    if (parseInt(formData.partnerAgeMin) > parseInt(formData.partnerAgeMax)) {
      Alert.alert('Error', 'Minimum age cannot be greater than maximum age');
      return false;
    }
    return true;
    */
  };

  const handleNextStep = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = async () => {
    if (!validateStep3()) {
      return;
    }

    setIsLoading(true);
    try {
      const { authService } = await import('../services');
      const { getErrorMessage, logError } = await import('../utils/errorHandler');
      
      // Prepare registration data
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        profile: {
          gender: formData.gender as 'Male' | 'Female' | 'Other',
          age: parseInt(formData.age),
          profession: formData.profession,
          education: formData.education,
          location: formData.location,
          motherTongue: formData.motherTongue,
          religion: formData.religion,
          salary: 0, // Default value, can be updated later
          bio: '',
          photos: [],
        },
        partnerPreferences: {
          ageMin: parseInt(formData.partnerAgeMin),
          ageMax: parseInt(formData.partnerAgeMax),
          professions: formData.partnerProfession,
          educations: formData.partnerEducation,
          locations: formData.partnerLocation,
          religions: formData.partnerReligion ? [formData.partnerReligion] : [],
          genders: [], // Can be set based on user's preference
          salaryMin: 0,
          salaryMax: 10000000,
        },
        accountType: formData.accountType.toUpperCase() as 'FREE' | 'PREMIUM',
        privacyLevel: formData.privacyLevel.toUpperCase() as 'PUBLIC' | 'FILTERED' | 'PRIVATE',
      };

      await authService.register(registrationData);
      
      setIsLoading(false);
      Alert.alert(
        'Welcome to शुभ मिलन! 🎉',
        `Registration successful! Your account has been created.\n\n• Age: ${formData.partnerAgeMin}-${formData.partnerAgeMax} years\n• Locations: ${formData.partnerLocation.join(', ') || 'Any'}\n• Account: ${formData.accountType === 'premium' ? 'Premium ⭐' : 'Free'}`,
        [
          {
            text: 'Start Exploring',
            onPress: () => navigation.navigate('Main'),
          },
        ]
      );
    } catch (error) {
      setIsLoading(false);
      
      const { getErrorMessage, logError } = await import('../utils/errorHandler');
      logError(error, 'RegisterScreen.handleRegister');
      const errorMessage = getErrorMessage(error);
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  const animateLabel = (field: string, focused: boolean, value: string) => {
    Animated.timing(labelAnimations[field], {
      toValue: focused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = (field: string) => {
    setFocusedFields(prev => ({ ...prev, [field]: true }));
    animateLabel(field, true, formData[field as keyof RegistrationData] as string);
  };

  const handleBlur = (field: string) => {
    setFocusedFields(prev => ({ ...prev, [field]: false }));
    animateLabel(field, false, formData[field as keyof RegistrationData] as string);
  };

  const handleTextChange = (field: keyof RegistrationData, value: string) => {
    updateFormData(field, value);
    animateLabel(field, focusedFields[field] || false, value);
  };

  // Remove old renderStep1, renderStep2, renderStep3, renderStep4
  // Add new renderers with descriptive names
  const renderBasicInfo = () => (
    <RegisterBasicInfo
      formData={formData}
      handleTextChange={handleTextChange}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      focusedFields={focusedFields}
      labelAnimations={labelAnimations}
      styles={styles}
    />
  );

  const renderAboutYou = () => (
    <RegisterAboutYou
      formData={formData}
      handleTextChange={handleTextChange}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      focusedFields={focusedFields}
      labelAnimations={labelAnimations}
      styles={styles}
      updateFormData={updateFormData}
    />
  );

  const renderPartnerPreferences = () => (
    <RegisterPartnerPreferences
      formData={formData}
      handleTextChange={handleTextChange}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      focusedFields={focusedFields}
      labelAnimations={labelAnimations}
      styles={styles}
      professionOptions={professionOptions}
      locationOptions={locationOptions}
      toggleArrayItem={toggleArrayItem}
    />
  );

  const renderAccountSettings = () => (
    <RegisterAccountSettings
      formData={formData}
      updateFormData={updateFormData}
      styles={styles}
    />
  );

  // Update renderCurrentStep to use new renderers
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderAboutYou();
      case 3:
        return renderPartnerPreferences();
      case 4:
        return renderAccountSettings();
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Join शुभ मिलन</Text>
            <Text style={styles.subtitle}>Where families connect through personalized feeds</Text>
          </View>

          {renderProgressBar()}
          {renderCurrentStep()}

          <View style={styles.buttonContainer}>
            {currentStep > 1 && (
              <TouchableOpacity style={styles.secondaryButton} onPress={handlePreviousStep}>
                <Text style={styles.secondaryButtonText}>Previous</Text>
              </TouchableOpacity>
            )}

            {currentStep < 4 ? (
              <TouchableOpacity style={styles.primaryButton} onPress={handleNextStep}>
                <Text style={styles.primaryButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.primaryButton, isLoading && styles.disabledButton]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Creating...' : 'Register'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkTextBold}>Login</Text>
            </Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  progressContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
  },
  progressText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  stepTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  radioText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundCard,
  },
  tagSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tagText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
  },
  tagTextSelected: {
    color: Colors.textInverse,
  },
  accountTypeContainer: {
    gap: Spacing.md,
  },
  accountOption: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundCard,
  },
  accountSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  accountTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  accountFeatures: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  summaryContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.lg,
  },
  summaryTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  summaryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textInverse,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  disabledButton: {
    backgroundColor: Colors.buttonDisabled,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  loginLinkText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  loginLinkTextBold: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});
