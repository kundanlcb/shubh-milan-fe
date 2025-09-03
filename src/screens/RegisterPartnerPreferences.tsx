import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FloatingInput } from '../components/FloatingInput';

const RegisterPartnerPreferences = ({ formData, handleTextChange, handleFocus, handleBlur, focusedFields, labelAnimations, styles, professionOptions, locationOptions, toggleArrayItem }) => (
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

export default RegisterPartnerPreferences;

