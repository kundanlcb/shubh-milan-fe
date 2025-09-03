import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RegisterAccountSettings = ({ formData, updateFormData, styles }) => (
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
          <Text style={styles.accountFeatures}>{'\u2022'} Browse filtered profiles{"\n"}{'\u2022'} Like posts{"\n"}{'\u2022'} Limited chat messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.accountOption, formData.accountType === 'premium' && styles.accountSelected]}
          onPress={() => updateFormData('accountType', 'premium')}
        >
          <Text style={styles.accountTitle}>Premium Member ⭐</Text>
          <Text style={styles.accountFeatures}>{'\u2022'} Everything in Free{"\n"}{'\u2022'} Unlimited chat{"\n"}{'\u2022'} View contact numbers{"\n"}{'\u2022'} Priority in feed</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Your Feed Will Show:</Text>
      <Text style={styles.summaryText}>
        ✓ Age: {formData.partnerAgeMin}-{formData.partnerAgeMax} years{"\n"}
        ✓ Professions: {formData.partnerProfession.length > 0 ? formData.partnerProfession.join(', ') : 'Any'}{"\n"}
        ✓ Locations: {formData.partnerLocation.length > 0 ? formData.partnerLocation.join(', ') : 'Any'}{"\n"}
        ✓ Account: {formData.accountType === 'premium' ? 'Premium ⭐' : 'Free'}
      </Text>
    </View>
  </View>
);

export default RegisterAccountSettings;
