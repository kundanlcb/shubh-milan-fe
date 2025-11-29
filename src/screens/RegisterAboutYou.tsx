import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { FloatingInput } from '../components/FloatingInput';
import type { RegistrationData } from './RegisterScreen';

interface RegisterAboutYouProps {
  formData: RegistrationData;
  handleTextChange: (field: keyof RegistrationData, value: string) => void;
  handleFocus: (field: string) => void;
  handleBlur: (field: string) => void;
  focusedFields: { [key: string]: boolean };
  labelAnimations: { [key: string]: Animated.Value };
  styles: any;
  updateFormData: (field: keyof RegistrationData, value: any) => void;
}

const RegisterAboutYou: React.FC<RegisterAboutYouProps> = ({
  formData,
  handleTextChange,
  handleFocus,
  handleBlur,
  focusedFields,
  labelAnimations,
  styles,
  updateFormData,
}) => {
  // Safety check for undefined animations
  const getAnimation = (field: string) => labelAnimations[field] || new Animated.Value(0);

  return (
  <View style={styles.form}>
    <Text style={styles.stepTitle}>About You</Text>
    <Text style={styles.stepDescription}>Help others know you better</Text>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Gender *</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => updateFormData('gender', 'Male')}
        >
          <View style={styles.radioButton}>
            {formData.gender === 'Male' && <View style={styles.radioButtonSelected} />}
          </View>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => updateFormData('gender', 'Female')}
        >
          <View style={styles.radioButton}>
            {formData.gender === 'Female' && <View style={styles.radioButtonSelected} />}
          </View>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => updateFormData('gender', 'Other')}
        >
          <View style={styles.radioButton}>
            {formData.gender === 'Other' && <View style={styles.radioButtonSelected} />}
          </View>
          <Text style={styles.radioText}>Other</Text>
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
      labelAnimation={getAnimation('profession')}
    />

    <FloatingInput
      label="Education"
      placeholder="e.g., Bachelor's Degree, Master's"
      value={formData.education}
      onChangeText={(value) => handleTextChange('education', value)}
      onFocus={() => handleFocus('education')}
      onBlur={() => handleBlur('education')}
      focused={focusedFields.education || false}
      labelAnimation={getAnimation('education')}
    />

    <FloatingInput
      label="Location *"
      placeholder="e.g., Darbhanga, Bihar"
      value={formData.location}
      onChangeText={(value) => handleTextChange('location', value)}
      onFocus={() => handleFocus('location')}
      onBlur={() => handleBlur('location')}
      focused={focusedFields.location || false}
      labelAnimation={getAnimation('location')}
    />

    <FloatingInput
      label="City"
      placeholder="City name"
      value={formData.city}
      onChangeText={(value) => handleTextChange('city', value)}
      onFocus={() => handleFocus('city')}
      onBlur={() => handleBlur('city')}
      focused={focusedFields.city || false}
      labelAnimation={getAnimation('city')}
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
        labelAnimation={getAnimation('motherTongue')}
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
        labelAnimation={getAnimation('religion')}
      />
    </View>

    <FloatingInput
      label="Annual Salary (Optional)"
      placeholder="e.g., 500000"
      keyboardType="numeric"
      value={formData.salary}
      onChangeText={(value) => handleTextChange('salary', value)}
      onFocus={() => handleFocus('salary')}
      onBlur={() => handleBlur('salary')}
      focused={focusedFields.salary || false}
      labelAnimation={getAnimation('salary')}
    />
  </View>
  );
};

export default RegisterAboutYou;
