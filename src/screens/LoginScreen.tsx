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
  // Loading dots animation
  const loadingAnimation = useState(new Animated.Value(0))[0];

  // Start loading dots animation
  const startLoadingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnimation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Stop loading animation
  const stopLoadingAnimation = () => {
    loadingAnimation.stopAnimation(() => {
      loadingAnimation.setValue(0);
    });
  };

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
    // Basic validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email or phone number');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setIsLoading(true);
    startLoadingAnimation();
    
    try {
      const { authService } = await import('../services');
      const { getErrorMessage, logError } = await import('../utils/errorHandler');
      
      await authService.login({
        emailOrPhone: email.trim(),
        password: password,
      });

      setIsLoading(false);
      stopLoadingAnimation();
      
      // Navigate to main app
      if (navigation.onLoginSuccess) {
        navigation.onLoginSuccess();
      }
    } catch (error) {
      setIsLoading(false);
      stopLoadingAnimation();
      
      const { getErrorMessage, logError } = await import('../utils/errorHandler');
      logError(error, 'LoginScreen.handleLogin');
      const errorMessage = getErrorMessage(error);
      Alert.alert('Login Failed', errorMessage);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenWrapper}>
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
                    <View style={styles.loginButtonContent}>
                      <View style={styles.loadingIndicatorWrapper}>
                        {/* Reserve space for loader, but only show dots when loading */}
                        {isLoading ? (
                          <View style={styles.loadingIndicator}>
                            <Animated.Text style={styles.loadingDot}>●</Animated.Text>
                            <Animated.Text style={styles.loadingDot}>●</Animated.Text>
                            <Animated.Text style={styles.loadingDot}>●</Animated.Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={[styles.loginButtonText, isLoading && styles.loadingText]}>
                        Sign In
                      </Text>
                    </View>
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* Developer Credit always at bottom */}
        <View style={styles.creditContainerFixed}>
          <Text style={styles.creditText}>💻 Proudly developed by a Maithil 🇮🇳 ❤️</Text>
        </View>
      </View>
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
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: Spacing.lg,
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
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicatorWrapper: {
    flexDirection: 'row',
    marginRight: Spacing.sm,
    width: 24, // Fixed width to prevent button jump
    justifyContent: 'center',
    alignItems: 'center', // Ensure vertical centering
  },
  loadingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Ensure vertical centering
    minHeight: 20, // Always reserve space for dots
  },
  loadingDot: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textInverse,
    marginHorizontal: 1,
    opacity: 0.5, // Default opacity, animated when loading
  },
  loadingText: {
    opacity: 0.8,
  },
  loginButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textInverse,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: Spacing.md, // Reduced spacing for tighter layout
    paddingVertical: Spacing.xs, // Slight padding for touch area
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
    paddingTop: Spacing.xs, // Reduced spacing for tighter layout
    marginBottom: Spacing.sm,
  },
  registerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 2,
  },
  screenWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  creditContainerFixed: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    width: '100%',
    backgroundColor: Colors.background,
  },
  creditContainer: {
    display: 'none', // Hide old credit container
  },
  creditText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
    opacity: 0.8,
    letterSpacing: 0.5,
  },
});
