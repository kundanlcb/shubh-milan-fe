import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { FloatingInput } from '../components/FloatingInput';
import type { RegistrationData } from './RegisterScreen';

interface RegisterPartnerPreferencesProps {
  formData: RegistrationData;
  handleTextChange: (field: keyof RegistrationData, value: string) => void;
  handleFocus: (field: string) => void;
  handleBlur: (field: string) => void;
  focusedFields: { [key: string]: boolean };
  labelAnimations: { [key: string]: Animated.Value };
  styles: any;
  professionOptions: string[];
  locationOptions: string[];
  toggleArrayItem: (array: string[], item: string, field: keyof RegistrationData) => void;
}

const RegisterPartnerPreferences: React.FC<RegisterPartnerPreferencesProps> = ({
  formData,
  handleTextChange,
  handleFocus,
  handleBlur,
  focusedFields,
  labelAnimations,
  styles,
  professionOptions,
  locationOptions,
  toggleArrayItem,
}) => {
  // Safety check for undefined animations
  const getAnimation = (field: string) => labelAnimations[field] || new Animated.Value(0);

  return (
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
        labelAnimation={getAnimation('partnerAgeMin')}
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
        labelAnimation={getAnimation('partnerAgeMax')}
      />
    </View>

    <View style={styles.row}>
      <FloatingInput
        label="Min Salary (optional)"
        placeholder="500000"
        keyboardType="numeric"
        style={styles.halfWidth}
        value={formData.partnerSalaryMin}
        onChangeText={(value) => handleTextChange('partnerSalaryMin', value)}
        onFocus={() => handleFocus('partnerSalaryMin')}
        onBlur={() => handleBlur('partnerSalaryMin')}
        focused={focusedFields.partnerSalaryMin || false}
        labelAnimation={getAnimation('partnerSalaryMin')}
      />
      <FloatingInput
        label="Max Salary (optional)"
        placeholder="5000000"
        keyboardType="numeric"
        style={styles.halfWidth}
        value={formData.partnerSalaryMax}
        onChangeText={(value) => handleTextChange('partnerSalaryMax', value)}
        onFocus={() => handleFocus('partnerSalaryMax')}
        onBlur={() => handleBlur('partnerSalaryMax')}
        focused={focusedFields.partnerSalaryMax || false}
        labelAnimation={getAnimation('partnerSalaryMax')}
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

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Preferred Religions (select multiple)</Text>
      <View style={styles.tagContainer}>
        {['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'].map((religion) => (
          <TouchableOpacity
            key={religion}
            style={[
              styles.tag,
              formData.partnerReligion.includes(religion) && styles.tagSelected
            ]}
            onPress={() => toggleArrayItem(formData.partnerReligion, religion, 'partnerReligion')}
          >
            <Text style={[
              styles.tagText,
              formData.partnerReligion.includes(religion) && styles.tagTextSelected
            ]}>
              {religion}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </View>
  );
};

export default RegisterPartnerPreferences;
