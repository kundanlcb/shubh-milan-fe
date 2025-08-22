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
import { Colors, GlobalStyles, Typography, Spacing } from '../constants/styles';
import type { AuthStackParamList } from '../types/navigation';

// Temporary navigation type until React Navigation is properly set up
type NavigationProp = {
  navigate: (screen: keyof AuthStackParamList) => void;
  onLoginSuccess?: () => void;
};

type Props = {
  navigation: NavigationProp;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // TODO: Uncomment validation later
    // if (!email || !password) {
    //   Alert.alert('Error', 'Please fill in all fields');
    //   return;
    // }

    setIsLoading(true);
    try {
      // TODO: Implement actual login logic here
      // For now, we'll simulate a login without validation
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to main app after successful login
        if (navigation.onLoginSuccess) {
          navigation.onLoginSuccess();
        }
        // Commented out success alert for smoother UX during development
        // Alert.alert('Success', 'Login successful! Welcome to शुभ मिलन');
      }, 500); // Reduced delay for faster testing
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>शुभ मिलन</Text>
              <Text style={styles.subtitle}>Shubh Milan</Text>
              <Text style={styles.tagline}>मिथिला में रिश्ते बनाएं</Text>
            </View>

            {/* Login Form */}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={Colors.inputPlaceholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.inputPlaceholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={isLoading}>
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.registerLink}>Register here</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    fontFamily: Typography.fontFamily.hindi,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  tagline: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.hindi,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  input: {
    ...GlobalStyles.input,
    marginBottom: Spacing.md,
  },
  loginButton: {
    ...GlobalStyles.button,
    ...GlobalStyles.buttonPrimary,
    marginTop: Spacing.md,
  },
  disabledButton: {
    backgroundColor: Colors.buttonDisabled,
  },
  loginButtonText: {
    ...GlobalStyles.buttonText,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  forgotPasswordText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});
