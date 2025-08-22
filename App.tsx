/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { MainTabNavigator } from './src/components/MainTabNavigator';
import { Colors } from './src/constants/colors';

type CurrentScreen = 'Login' | 'Register' | 'ForgotPassword' | 'OTPVerification' | 'Main';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Enhanced navigation function that handles login flow
  const navigate = (screen: string) => {
    if (screen === 'Main') {
      setIsLoggedIn(true);
      setCurrentScreen('Main');
    } else {
      setCurrentScreen(screen as CurrentScreen);
    }
  };

  // Simulate login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('Main');
  };

  const navigationProps = {
    navigate,
    onLoginSuccess: handleLoginSuccess,
  };

  // Show main app if logged in
  if (isLoggedIn && currentScreen === 'Main') {
    return (
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={Colors.background}
        />
        <MainTabNavigator />
      </SafeAreaProvider>
    );
  }

  // Show authentication screens if not logged in
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.background}
      />
      {currentScreen === 'Login' ? (
        <LoginScreen navigation={navigationProps} />
      ) : currentScreen === 'Register' ? (
        <RegisterScreen navigation={navigationProps} />
      ) : (
        // Placeholder for other screens (ForgotPassword, etc.)
        <LoginScreen navigation={navigationProps} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
