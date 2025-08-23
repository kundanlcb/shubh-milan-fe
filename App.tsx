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
import { UserProfileScreen } from './src/screens/UserProfileScreen';
import { ChatConversationScreen } from './src/screens/ChatConversationScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { Colors } from './src/constants/colors';

type CurrentScreen = 'Login' | 'Register' | 'ForgotPassword' | 'OTPVerification' | 'Main' | 'ChatConversation' | 'EditProfile';
type ModalScreen = 'UserProfile' | null;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalScreen, setModalScreen] = useState<ModalScreen>(null);
  const [modalParams, setModalParams] = useState<any>(null);
  const [chatConversationParams, setChatConversationParams] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('Home');

  // Enhanced navigation function that handles login flow and modals
  const navigate = (screen: string, params?: any) => {
    if (screen === 'Main') {
      setIsLoggedIn(true);
      setCurrentScreen('Main');
    } else if (screen === 'UserProfile') {
      setModalScreen('UserProfile');
      setModalParams(params);
    } else if (screen === 'ChatConversation') {
      setActiveTab('Chat'); // Remember we came from Chat tab
      setCurrentScreen('ChatConversation');
      setChatConversationParams(params);
    } else if (screen === 'EditProfile') {
      setActiveTab('Profile'); // Remember we came from Profile tab
      setCurrentScreen('EditProfile');
    } else {
      setCurrentScreen(screen as CurrentScreen);
    }
  };

  const closeModal = () => {
    setModalScreen(null);
    setModalParams(null);
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

  // Show EditProfile screen as standalone
  if (isLoggedIn && currentScreen === 'EditProfile') {
    return (
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={Colors.background}
        />
        <EditProfileScreen
          navigation={{
            goBack: () => setCurrentScreen('Main'),
            navigate: (_screen: string, _params?: any) => {
              if (_screen === 'Main') {
                setCurrentScreen('Main');
              }
            }
          }}
          route={{ params: undefined }}
        />
      </SafeAreaProvider>
    );
  }

  // Show ChatConversation screen as standalone
  if (isLoggedIn && currentScreen === 'ChatConversation') {
    return (
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={Colors.background}
        />
        <ChatConversationScreen
          navigation={{
            goBack: () => setCurrentScreen('Main'),
            navigate: (screen: string, params?: any) => {
              if (screen === 'UserProfile') {
                navigate('UserProfile', params);
              }
            }
          }}
          route={{ params: chatConversationParams }}
        />
      </SafeAreaProvider>
    );
  }

  // Show main app if logged in
  if (isLoggedIn && currentScreen === 'Main') {
    return (
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={Colors.background}
        />
        <MainTabNavigator
          initialActiveTab={activeTab}
          onTabChange={setActiveTab}
          onNavigateToUserProfile={(userId: string) => navigate('UserProfile', { userId })}
          onNavigateToChatConversation={(params: any) => navigate('ChatConversation', params)}
          onNavigateToEditProfile={() => navigate('EditProfile')}
        />

        {/* Modal Screens */}
        {modalScreen === 'UserProfile' && (
          <UserProfileScreen
            navigation={{ goBack: closeModal }}
            route={{ params: modalParams }}
          />
        )}
      </SafeAreaProvider>
    );
  }

  // Show authentication screens if not logged in
  const renderAuthScreen = () => {
    switch (currentScreen) {
      case 'Register':
        return <RegisterScreen navigation={navigationProps} />;
      case 'Login':
      default:
        return <LoginScreen navigation={navigationProps} />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.background}
      />
      {renderAuthScreen()}
    </SafeAreaProvider>
  );
}

export default App;
