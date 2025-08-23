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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/styles';

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

  const renderStep1 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Basic Information</Text>
      <Text style={styles.stepDescription}>Let's start with your basic details</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={formData.fullName}
          onChangeText={(value) => updateFormData('fullName', value)}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 10-digit phone number"
          value={formData.phone}
          onChangeText={(value) => updateFormData('phone', value)}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password (min 6 characters)"
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>About You</Text>
      <Text style={styles.stepDescription}>Help others know you better</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="25"
          value={formData.age}
          onChangeText={(value) => updateFormData('age', value)}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>

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

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Profession *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Software Engineer, Teacher, Doctor"
          value={formData.profession}
          onChangeText={(value) => updateFormData('profession', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Education</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Bachelor's Degree, Master's"
          value={formData.education}
          onChangeText={(value) => updateFormData('education', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Darbhanga, Bihar"
          value={formData.location}
          onChangeText={(value) => updateFormData('location', value)}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Mother Tongue</Text>
          <TextInput
            style={styles.input}
            placeholder="Maithili"
            value={formData.motherTongue}
            onChangeText={(value) => updateFormData('motherTongue', value)}
          />
        </View>

        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Religion</Text>
          <TextInput
            style={styles.input}
            placeholder="Hindu"
            value={formData.religion}
            onChangeText={(value) => updateFormData('religion', value)}
          />
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Partner Preferences</Text>
      <Text style={styles.stepDescription}>We'll filter your feed to show relevant profiles</Text>

      <View style={styles.row}>
        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Min Age *</Text>
          <TextInput
            style={styles.input}
            placeholder="22"
            value={formData.partnerAgeMin}
            onChangeText={(value) => updateFormData('partnerAgeMin', value)}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Max Age *</Text>
          <TextInput
            style={styles.input}
            placeholder="30"
            value={formData.partnerAgeMax}
            onChangeText={(value) => updateFormData('partnerAgeMax', value)}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
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
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 24,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'white',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  tagTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  accountTypeContainer: {
    marginTop: 12,
  },
  accountOption: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  accountSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  accountFeatures: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: Colors.primary + '10',
    borderRadius: 12,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 32,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#666',
  },
  loginLinkTextBold: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
