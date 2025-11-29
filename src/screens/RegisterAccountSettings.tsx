import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { RegistrationData } from './RegisterScreen';

interface RegisterAccountSettingsProps {
  formData: RegistrationData;
  updateFormData: (field: keyof RegistrationData, value: any) => void;
  styles: any;
}

const RegisterAccountSettings: React.FC<RegisterAccountSettingsProps> = ({
  formData,
  updateFormData,
  styles,
}) => (
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

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Profile Visibility</Text>
      <View style={styles.privacyContainer}>
        <TouchableOpacity
          style={[styles.privacyOption, formData.privacyLevel === 'public' && styles.privacySelected]}
          onPress={() => updateFormData('privacyLevel', 'public')}
        >
          <Text style={styles.privacyTitle}>Public</Text>
          <Text style={styles.privacyDescription}>Visible to all users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.privacyOption, formData.privacyLevel === 'filtered' && styles.privacySelected]}
          onPress={() => updateFormData('privacyLevel', 'filtered')}
        >
          <Text style={styles.privacyTitle}>Filtered (Recommended)</Text>
          <Text style={styles.privacyDescription}>Shown based on preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.privacyOption, formData.privacyLevel === 'private' && styles.privacySelected]}
          onPress={() => updateFormData('privacyLevel', 'private')}
        >
          <Text style={styles.privacyTitle}>Private</Text>
          <Text style={styles.privacyDescription}>Only visible to matches</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Your Feed Will Show:</Text>
      <Text style={styles.summaryText}>
        ✓ Age: {formData.partnerAgeMin}-{formData.partnerAgeMax} years{"\n"}
        ✓ Professions: {formData.partnerProfession.length > 0 ? formData.partnerProfession.join(', ') : 'Any'}{"\n"}
        ✓ Locations: {formData.partnerLocation.length > 0 ? formData.partnerLocation.join(', ') : 'Any'}{"\n"}
        ✓ Visibility: {formData.privacyLevel === 'public' ? 'Public' : formData.privacyLevel === 'filtered' ? 'Filtered' : 'Private'}{"\n"}
        ✓ Account: {formData.accountType === 'premium' ? 'Premium ⭐' : 'Free'}
      </Text>
    </View>
  </View>
);

export default RegisterAccountSettings;
