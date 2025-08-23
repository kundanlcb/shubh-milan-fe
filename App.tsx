/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { MainTabNavigator } from './src/components/MainTabNavigator';
import { UserProfileScreen } from './src/screens/UserProfileScreen';
import { ChatConversationScreen } from './src/screens/ChatConversationScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { StoryViewerScreen } from './src/screens/StoryViewerScreen';
import { Colors } from './src/constants/colors';

type CurrentScreen = 'Login' | 'Register' | 'ForgotPassword' | 'OTPVerification' | 'Main' | 'ChatConversation' | 'EditProfile' | 'StoryViewer';
type ModalScreen = 'UserProfile' | null;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalScreen, setModalScreen] = useState<ModalScreen>(null);
  const [modalParams, setModalParams] = useState<any>(null);
  const [chatConversationParams, setChatConversationParams] = useState<any>(null);
  const [storyViewerParams, setStoryViewerParams] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('Home');

  const navigate = (screen: string, params?: any) => {
    if (screen === 'Main') {
      setIsLoggedIn(true);
      setCurrentScreen('Main');
    } else if (screen === 'UserProfile') {
      setModalScreen('UserProfile');
      setModalParams(params);
    } else if (screen === 'ChatConversation') {
      setActiveTab('Chat');
      setCurrentScreen('ChatConversation');
      setChatConversationParams(params);
    } else if (screen === 'EditProfile') {
      setActiveTab('Profile');
      setCurrentScreen('EditProfile');
    } else if (screen === 'StoryViewer') {
      setCurrentScreen('StoryViewer');
      setStoryViewerParams(params);
    } else {
      setCurrentScreen(screen as CurrentScreen);
    }
  };

  // Logout function to clear session and return to login
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('Login');
    setActiveTab('Home');
    setModalScreen(null);
    setModalParams(null);
    setChatConversationParams(null);
    setStoryViewerParams(null);
  };

  const closeModal = () => {
    setModalScreen(null);
    setModalParams(null);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('Main');
  };

  const navigationProps = {
    navigate,
    onLoginSuccess: handleLoginSuccess,
  };

  useEffect(() => {
    const backAction = () => {
      if (modalScreen) {
        closeModal();
        return true;
      } else if (currentScreen === 'ChatConversation' || currentScreen === 'EditProfile' || currentScreen === 'StoryViewer') {
        return false;
      } else if (currentScreen === 'Register') {
        setCurrentScreen('Login');
        return true;
      } else if (currentScreen === 'Main') {
        return false;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [modalScreen, currentScreen]);

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

  if (isLoggedIn && currentScreen === 'StoryViewer') {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <StoryViewerScreen
          navigation={{
            goBack: () => setCurrentScreen('Main'),
            navigate: (_screen: string, _params?: any) => {
              if (_screen === 'Main') {
                setCurrentScreen('Main');
              }
            }
          }}
          route={{ params: storyViewerParams }}
        />
      </SafeAreaProvider>
    );
  }

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
          onNavigateToStoryViewer={(params: any) => navigate('StoryViewer', params)}
          onLogout={handleLogout}
        />

        {modalScreen === 'UserProfile' && (
          <UserProfileScreen
            navigation={{ goBack: closeModal }}
            route={{ params: modalParams }}
          />
        )}
      </SafeAreaProvider>
    );
  }

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
