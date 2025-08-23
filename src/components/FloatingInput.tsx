import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors, Typography, Spacing } from '../constants/styles';

interface FloatingInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  style?: any;
  focused: boolean;
  labelAnimation: Animated.Value;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  maxLength,
  style,
  focused,
  labelAnimation,
}) => {
  return (
    <View style={[styles.floatingInputContainer, style]}>
      <Animated.Text
        style={[
          styles.floatingLabel,
          {
            top: labelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
            fontSize: labelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: focused ? Colors.primary : Colors.textSecondary,
          },
        ]}>
        {label}
      </Animated.Text>
      <TextInput
        style={[styles.floatingInput, focused && styles.floatingInputFocused]}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        placeholderTextColor="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  floatingInputContainer: {
    marginBottom: Spacing.lg,
    position: 'relative',
    paddingTop: Spacing.sm,
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    fontWeight: Typography.fontWeight.medium,
    backgroundColor: Colors.background,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  floatingInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    backgroundColor: 'transparent',
    minHeight: 52,
  },
  floatingInputFocused: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
});
