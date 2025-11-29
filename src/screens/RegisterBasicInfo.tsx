import React from 'react';
import { View, Text, Animated } from 'react-native';
import { FloatingInput } from '../components/FloatingInput';
import type { RegistrationData } from './RegisterScreen';

interface RegisterBasicInfoProps {
  formData: RegistrationData;
  handleTextChange: (field: keyof RegistrationData, value: string) => void;
  handleFocus: (field: string) => void;
  handleBlur: (field: string) => void;
  focusedFields: { [key: string]: boolean };
  labelAnimations: { [key: string]: Animated.Value };
  styles: any;
}

const RegisterBasicInfo: React.FC<RegisterBasicInfoProps> = ({
  formData,
  handleTextChange,
  handleFocus,
  handleBlur,
  focusedFields,
  labelAnimations,
  styles,
}) => {
  // Safety check for undefined animations
  const getAnimation = (field: string) => labelAnimations[field] || new Animated.Value(0);

  return (
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
            labelAnimation={getAnimation('fullName')}
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
            labelAnimation={getAnimation('email')}
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
            labelAnimation={getAnimation('phone')}
        />
        <FloatingInput
            label="Date of Birth (YYYY-MM-DD) *"
            placeholder="Enter DOB as YYYY-MM-DD"
            keyboardType="default"
            value={formData.dob}
            onChangeText={(value) => handleTextChange('dob', value)}
            onFocus={() => handleFocus('dob')}
            onBlur={() => handleBlur('dob')}
            focused={focusedFields.dob || false}
            labelAnimation={getAnimation('dob')}
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
            labelAnimation={getAnimation('password')}
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
            labelAnimation={getAnimation('confirmPassword')}
        />
    </View>
  );
};

export default RegisterBasicInfo;
