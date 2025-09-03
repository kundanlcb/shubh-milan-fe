import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FloatingInput } from '../components/FloatingInput';

const RegisterAboutYou = ({ formData, handleTextChange, handleFocus, handleBlur, focusedFields, labelAnimations, styles, updateFormData }) => (
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

export default RegisterAboutYou;

