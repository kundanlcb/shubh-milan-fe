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
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/styles';
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
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Animation values for floating labels
  const emailLabelAnimation = useState(new Animated.Value(email ? 1 : 0))[0];
  const passwordLabelAnimation = useState(new Animated.Value(password ? 1 : 0))[0];

  const animateLabel = (animation: Animated.Value, focused: boolean, value: string) => {
    Animated.timing(animation, {
      toValue: focused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
    animateLabel(emailLabelAnimation, true, email);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
    animateLabel(emailLabelAnimation, false, email);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    animateLabel(passwordLabelAnimation, true, password);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    animateLabel(passwordLabelAnimation, false, password);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    animateLabel(emailLabelAnimation, emailFocused, text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    animateLabel(passwordLabelAnimation, passwordFocused, text);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        if (navigation.onLoginSuccess) {
          navigation.onLoginSuccess();
        }
      }, 500);
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
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Main Content Area */}
            <View style={styles.mainContent}>
              {/* Left-aligned Header */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../../subh-milan.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.welcomeSection}>
                  <Text style={styles.welcomeText}>Welcome back! 🙏</Text>
                  <Text style={styles.subtitle}>आपका स्वागत है - Find your perfect जीवनसाथी</Text>
                </View>
              </View>

              {/* Floating Label Form */}
              <View style={styles.form}>
                <View style={styles.floatingInputContainer}>
                  <Animated.Text
                    style={[
                      styles.floatingLabel,
                      {
                        top: emailLabelAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                        fontSize: emailLabelAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [16, 12],
                        }),
                        color: emailFocused ? Colors.primary : Colors.textSecondary,
                      },
                    ]}>
                    Email
                  </Animated.Text>
                  <TextInput
                    style={[styles.floatingInput, emailFocused && styles.floatingInputFocused]}
                    value={email}
                    onChangeText={handleEmailChange}
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.floatingInputContainer}>
                  <Animated.Text
                    style={[
                      styles.floatingLabel,
                      {
                        top: passwordLabelAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                        fontSize: passwordLabelAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [16, 12],
                        }),
                        color: passwordFocused ? Colors.primary : Colors.textSecondary,
                      },
                    ]}>
                    Password
                  </Animated.Text>
                  <TextInput
                    style={[styles.floatingInput, passwordFocused && styles.floatingInputFocused]}
                    value={password}
                    onChangeText={handlePasswordChange}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity
                  style={[styles.loginButton, isLoading && styles.disabledButton]}
                  onPress={handleLogin}
                  disabled={isLoading}>
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>New to Shubh Milan? </Text>
                <TouchableOpacity onPress={navigateToRegister}>
                  <Text style={styles.registerLink}>Create account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Developer Credit */}
            <View style={styles.creditContainer}>
              <Text style={styles.creditText}>💻 Proudly developed by a Maithil 🇮🇳 ❤️</Text>
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.lg,
    minHeight: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: Spacing['2xl'],
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  logo: {
    width: 80,
    height: 80,
  },
  welcomeSection: {
    alignItems: 'flex-start',
    width: '100%',
  },
  welcomeText: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary,
    marginBottom: Spacing.xs,
    lineHeight: 24,
  },
  description: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: 22,
    opacity: 0.8,
  },
  form: {
    marginBottom: Spacing.sm,
  },
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
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    minHeight: 52,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: Colors.buttonDisabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textInverse,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingVertical: Spacing.xs,
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
    paddingTop: Spacing.md,
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
  creditContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  creditText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.normal,
  },
});
