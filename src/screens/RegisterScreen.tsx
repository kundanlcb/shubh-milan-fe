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
      // Save user preferences for content filtering
      console.log('Registration Data with Preferences:', formData);

      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Welcome to शुभ मिलन! 🎉',
          `Registration successful! Your feed will be personalized to show posts from people matching your preferences:\n\n• Age: ${formData.partnerAgeMin}-${formData.partnerAgeMax} years\n• Locations: ${formData.partnerLocation.join(', ') || 'Any'}\n• Account: ${formData.accountType === 'premium' ? 'Premium ⭐' : 'Free'}`,
          [
            {
              text: 'Start Exploring',
              onPress: () => navigation.navigate('Main'),
            },
          ]
        );
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Registration failed. Please try again.');
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

  const renderStep1 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Basic Information</Text>
      <Text style={styles.stepDescription}>Let's start with your basic details</Text>

      <FloatingInput
        label="Full Name *"
        placeholder="Enter your full name"
        autoCapitalize="words"
        value={formData.fullName}
        onChangeText={(value) => handleTextChange('fullName', value)}
        onFocus={() => handleFocus('fullName')}
        onBlur={() => handleBlur('fullName')}
        focused={focusedFields.fullName || false}
        labelAnimation={labelAnimations.fullName}
      />

      <FloatingInput
        label="Email Address *"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(value) => handleTextChange('email', value)}
        onFocus={() => handleFocus('email')}
        onBlur={() => handleBlur('email')}
        focused={focusedFields.email || false}
        labelAnimation={labelAnimations.email}
      />

      <FloatingInput
        label="Phone Number *"
        placeholder="Enter 10-digit phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={formData.phone}
        onChangeText={(value) => handleTextChange('phone', value)}
        onFocus={() => handleFocus('phone')}
        onBlur={() => handleBlur('phone')}
        focused={focusedFields.phone || false}
        labelAnimation={labelAnimations.phone}
      />

      <FloatingInput
        label="Password *"
        placeholder="Create a password (min 6 characters)"
        secureTextEntry={true}
        autoCapitalize="none"
        value={formData.password}
        onChangeText={(value) => handleTextChange('password', value)}
        onFocus={() => handleFocus('password')}
        onBlur={() => handleBlur('password')}
        focused={focusedFields.password || false}
        labelAnimation={labelAnimations.password}
      />

      <FloatingInput
        label="Confirm Password *"
        placeholder="Re-enter your password"
        secureTextEntry={true}
        autoCapitalize="none"
        value={formData.confirmPassword}
        onChangeText={(value) => handleTextChange('confirmPassword', value)}
        onFocus={() => handleFocus('confirmPassword')}
        onBlur={() => handleBlur('confirmPassword')}
        focused={focusedFields.confirmPassword || false}
        labelAnimation={labelAnimations.confirmPassword}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>About You</Text>
      <Text style={styles.stepDescription}>Help others know you better</Text>

      <FloatingInput
        label="Age *"
        placeholder="25"
        keyboardType="numeric"
        maxLength={2}
        value={formData.age}
        onChangeText={(value) => handleTextChange('age', value)}
        onFocus={() => handleFocus('age')}
        onBlur={() => handleBlur('age')}
        focused={focusedFields.age || false}
        labelAnimation={labelAnimations.age}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Gender *</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateFormData('gender', 'male')}
          >
            <View style={styles.radioButton}>
              {formData.gender === 'male' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateFormData('gender', 'female')}
          >
            <View style={styles.radioButton}>
              {formData.gender === 'female' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FloatingInput
        label="Profession *"
        placeholder="e.g., Software Engineer, Teacher, Doctor"
        value={formData.profession}
        onChangeText={(value) => handleTextChange('profession', value)}
        onFocus={() => handleFocus('profession')}
        onBlur={() => handleBlur('profession')}
        focused={focusedFields.profession || false}
        labelAnimation={labelAnimations.profession}
      />

      <FloatingInput
        label="Education"
        placeholder="e.g., Bachelor's Degree, Master's"
        value={formData.education}
        onChangeText={(value) => handleTextChange('education', value)}
        onFocus={() => handleFocus('education')}
        onBlur={() => handleBlur('education')}
        focused={focusedFields.education || false}
        labelAnimation={labelAnimations.education}
      />

      <FloatingInput
        label="Location *"
        placeholder="e.g., Darbhanga, Bihar"
        value={formData.location}
        onChangeText={(value) => handleTextChange('location', value)}
        onFocus={() => handleFocus('location')}
        onBlur={() => handleBlur('location')}
        focused={focusedFields.location || false}
        labelAnimation={labelAnimations.location}
      />

      <View style={styles.row}>
        <FloatingInput
          label="Mother Tongue"
          placeholder="Maithili"
          style={styles.halfWidth}
          value={formData.motherTongue}
          onChangeText={(value) => handleTextChange('motherTongue', value)}
          onFocus={() => handleFocus('motherTongue')}
          onBlur={() => handleBlur('motherTongue')}
          focused={focusedFields.motherTongue || false}
          labelAnimation={labelAnimations.motherTongue}
        />

        <FloatingInput
          label="Religion"
          placeholder="Hindu"
          style={styles.halfWidth}
          value={formData.religion}
          onChangeText={(value) => handleTextChange('religion', value)}
          onFocus={() => handleFocus('religion')}
          onBlur={() => handleBlur('religion')}
          focused={focusedFields.religion || false}
          labelAnimation={labelAnimations.religion}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Partner Preferences</Text>
      <Text style={styles.stepDescription}>We'll filter your feed to show relevant profiles</Text>

      <View style={styles.row}>
        <FloatingInput
          label="Min Age *"
          placeholder="22"
          keyboardType="numeric"
          maxLength={2}
          style={styles.halfWidth}
          value={formData.partnerAgeMin}
          onChangeText={(value) => handleTextChange('partnerAgeMin', value)}
          onFocus={() => handleFocus('partnerAgeMin')}
          onBlur={() => handleBlur('partnerAgeMin')}
          focused={focusedFields.partnerAgeMin || false}
          labelAnimation={labelAnimations.partnerAgeMin}
        />

        <FloatingInput
          label="Max Age *"
          placeholder="30"
          keyboardType="numeric"
          maxLength={2}
          style={styles.halfWidth}
          value={formData.partnerAgeMax}
          onChangeText={(value) => handleTextChange('partnerAgeMax', value)}
          onFocus={() => handleFocus('partnerAgeMax')}
          onBlur={() => handleBlur('partnerAgeMax')}
          focused={focusedFields.partnerAgeMax || false}
          labelAnimation={labelAnimations.partnerAgeMax}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Preferred Professions (select multiple)</Text>
        <View style={styles.tagContainer}>
          {professionOptions.map((profession) => (
            <TouchableOpacity
              key={profession}
              style={[
                styles.tag,
                formData.partnerProfession.includes(profession) && styles.tagSelected
              ]}
              onPress={() => toggleArrayItem(formData.partnerProfession, profession, 'partnerProfession')}
            >
              <Text style={[
                styles.tagText,
                formData.partnerProfession.includes(profession) && styles.tagTextSelected
              ]}>
                {profession}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Preferred Locations (select multiple)</Text>
        <View style={styles.tagContainer}>
          {locationOptions.map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.tag,
                formData.partnerLocation.includes(location) && styles.tagSelected
              ]}
              onPress={() => toggleArrayItem(formData.partnerLocation, location, 'partnerLocation')}
            >
              <Text style={[
                styles.tagText,
                formData.partnerLocation.includes(location) && styles.tagTextSelected
              ]}>
                {location}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Account Settings</Text>
      <Text style={styles.stepDescription}>Choose your membership and privacy preferences</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Account Type</Text>
        <View style={styles.accountTypeContainer}>
          <TouchableOpacity
            style={[styles.accountOption, formData.accountType === 'free' && styles.accountSelected]}
            onPress={() => updateFormData('accountType', 'free')}
          >
            <Text style={styles.accountTitle}>Free Member</Text>
            <Text style={styles.accountFeatures}>• Browse filtered profiles{'\n'}• Like posts{'\n'}• Limited chat messages</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.accountOption, formData.accountType === 'premium' && styles.accountSelected]}
            onPress={() => updateFormData('accountType', 'premium')}
          >
            <Text style={styles.accountTitle}>Premium Member ⭐</Text>
            <Text style={styles.accountFeatures}>• Everything in Free{'\n'}• Unlimited chat{'\n'}• View contact numbers{'\n'}• Priority in feed</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Your Feed Will Show:</Text>
        <Text style={styles.summaryText}>
          ✓ Age: {formData.partnerAgeMin}-{formData.partnerAgeMax} years{'\n'}
          ✓ Professions: {formData.partnerProfession.length > 0 ? formData.partnerProfession.join(', ') : 'Any'}{'\n'}
          ✓ Locations: {formData.partnerLocation.length > 0 ? formData.partnerLocation.join(', ') : 'Any'}{'\n'}
          ✓ Account: {formData.accountType === 'premium' ? 'Premium ⭐' : 'Free'}
        </Text>
      </View>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentStep / 4) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Step {currentStep} of 4</Text>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

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
