/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme, BackHandler, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { BackendConfigScreen } from './src/screens/BackendConfigScreen';
import { MainTabNavigator } from './src/components/MainTabNavigator';
import { UserProfileScreen } from './src/screens/UserProfileScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { ChatConversationScreen } from './src/screens/ChatConversationScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { StoryViewerScreen } from './src/screens/StoryViewerScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { PremiumUpgradeScreen } from './src/screens/PremiumUpgradeScreen';
import { HelpSupportScreen } from './src/screens/HelpSupportScreen';
import { TermsPrivacyScreen } from './src/screens/TermsPrivacyScreen';
import { ProfileDetailScreen } from './src/screens/ProfileDetailScreen';
import { Colors } from './src/constants/colors';
import { STORAGE_KEYS, setDynamicBaseURL } from './src/config/api.config';

type CurrentScreen = 'BackendConfig' | 'Login' | 'Register' | 'ForgotPassword' | 'OTPVerification' | 'Main' | 'Chat' | 'ChatConversation' | 'EditProfile' | 'StoryViewer' | 'UserProfile' | 'Settings' | 'PremiumUpgrade' | 'HelpSupport' | 'TermsPrivacy' | 'ProfileDetail';
type ModalScreen = null;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('BackendConfig');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [modalScreen, setModalScreen] = useState<ModalScreen>(null);
  const [modalParams, setModalParams] = useState<any>(null);
  const [chatConversationParams, setChatConversationParams] = useState<any>(null);
  const [storyViewerParams, setStoryViewerParams] = useState<any>(null);
  const [profileDetailParams, setProfileDetailParams] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('Home');

  // Check for existing accessToken and backend URL on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Load backend URL if it exists
        const backendURL = await AsyncStorage.getItem(STORAGE_KEYS.BACKEND_URL);
        if (backendURL) {
          setDynamicBaseURL(backendURL);
          // Also need to update the API client with the new URL
          const apiClient = require('./src/services/api.client').apiClient;
          if (apiClient) {
            apiClient.updateBaseURL(backendURL);
          }
        }

        // Check for access token
        const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (accessToken) {
          // User is already logged in, skip to main
          setIsLoggedIn(true);
          setCurrentScreen('Main');
        } else {
          // No access token, show backend config screen first
          setCurrentScreen('BackendConfig');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setCurrentScreen('BackendConfig');
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const navigate = (screen: string, params?: any) => {
    if (screen === 'Main') {
      setIsLoggedIn(true);
      setCurrentScreen('Main');
    } else if (screen === 'Chat') {
      setCurrentScreen('Chat');
    } else if (screen === 'UserProfile') {
      setCurrentScreen('UserProfile');
      setModalParams(params);
    } else if (screen === 'ChatConversation') {
      setCurrentScreen('ChatConversation');
      setChatConversationParams(params);
    } else if (screen === 'EditProfile') {
      setActiveTab('Profile');
      setCurrentScreen('EditProfile');
    } else if (screen === 'StoryViewer') {
      setCurrentScreen('StoryViewer');
      setStoryViewerParams(params);
    } else if (screen === 'Settings') {
      setActiveTab('Profile');
      setCurrentScreen('Settings');
    } else if (screen === 'PremiumUpgrade') {
      setActiveTab('Profile');
      setCurrentScreen('PremiumUpgrade');
    } else if (screen === 'HelpSupport') {
      setActiveTab('Profile');
      setCurrentScreen('HelpSupport');
    } else if (screen === 'TermsPrivacy') {
      setActiveTab('Profile');
      setCurrentScreen('TermsPrivacy');
    } else if (screen === 'ProfileDetail') {
      setActiveTab('Profile');
      setCurrentScreen('ProfileDetail');
      setProfileDetailParams(params);
    } else {
      setCurrentScreen(screen as CurrentScreen);
    }
  };

  // Logout function to clear session and return to config screen
  const handleLogout = async () => {
    // Clear tokens from AsyncStorage
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_ID,
        STORAGE_KEYS.USER_PROFILE,
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }

    setIsLoggedIn(false);
    setCurrentScreen('BackendConfig');
    setActiveTab('Home');
    setModalScreen(null);
    setModalParams(null);
    setChatConversationParams(null);
    setStoryViewerParams(null);
    setProfileDetailParams(null);
  };

  const closeModal = () => {
    setModalScreen(null);
    setModalParams(null);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('Main');
  };

  const handleBackendConfigSave = async (baseURL: string) => {
    try {
      // Save the URL to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.BACKEND_URL, baseURL);

      // Set the dynamic base URL in config
      setDynamicBaseURL(baseURL);

      // Update the API client with new URL
      const { apiClient } = require('./src/services/api.client');
      if (apiClient) {
        apiClient.updateBaseURL(baseURL);
      }

      // Move to login screen
      setCurrentScreen('Login');
    } catch (error) {
      console.error('Error saving backend config:', error);
    }
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
      } else if (currentScreen === 'Chat' || currentScreen === 'ChatConversation' || currentScreen === 'EditProfile' || currentScreen === 'StoryViewer' || currentScreen === 'UserProfile' || currentScreen === 'Settings' || currentScreen === 'PremiumUpgrade' || currentScreen === 'HelpSupport' || currentScreen === 'TermsPrivacy' || currentScreen === 'ProfileDetail') {
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

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.background}
        translucent={false}
        animated={true}
      />
      <AppContainer>
        {renderScreen()}
      </AppContainer>
    </SafeAreaProvider>
  );

  function AppContainer({ children }: { children: React.ReactNode }) {
    const insets = useSafeAreaInsets();
    return (
      <View style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: insets.top
      }}>
        {children}
      </View>
    );
  }

  function renderScreen() {
    // Show loading screen while checking auth status
    if (isLoadingAuth) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    if (currentScreen === 'BackendConfig') {
      return (
        <BackendConfigScreen
          onConfigSave={handleBackendConfigSave}
        />
      );
    }

    if (isLoggedIn && currentScreen === 'EditProfile') {
      return (
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
      );
    }

    if (isLoggedIn && currentScreen === 'Settings') {
      return (
        <SettingsScreen
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
      );
    }

    if (isLoggedIn && currentScreen === 'PremiumUpgrade') {
      return (
        <PremiumUpgradeScreen
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
      );
    }

    if (isLoggedIn && currentScreen === 'HelpSupport') {
      return (
        <HelpSupportScreen
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
      );
    }

    if (isLoggedIn && currentScreen === 'TermsPrivacy') {
      return (
        <TermsPrivacyScreen
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
      );
    }

    if (isLoggedIn && currentScreen === 'ProfileDetail') {
      return (
        <ProfileDetailScreen
          navigation={{
            goBack: () => setCurrentScreen('Main'),
            navigate: (_screen: string, _params?: any) => {
              if (_screen === 'Main') {
                setCurrentScreen('Main');
              } else if (_screen === 'EditProfile') {
                navigate('EditProfile');
              }
            }
          }}
          route={{ params: profileDetailParams }}
        />
      );
    }

    if (isLoggedIn && currentScreen === 'ChatConversation') {
      return (
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
      );
    }

    if (isLoggedIn && currentScreen === 'StoryViewer') {
      return (
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
      );
    }

    if (isLoggedIn && currentScreen === 'UserProfile') {
      return (
        <UserProfileScreen
          navigation={{
            goBack: () => setCurrentScreen('Main'),
            navigate: (screen: string, params?: any) => {
              if (screen === 'ChatConversation') {
                navigate('ChatConversation', params);
              }
            }
          }}
          route={{ params: modalParams }}
        />
      );
    }

    if (isLoggedIn && currentScreen === 'Chat') {
      return (
        <ChatScreen
          navigation={{
            goBack: () => setCurrentScreen('Main'),
            navigate: (screen: string, params?: any) => {
              if (screen === 'ChatConversation') {
                navigate('ChatConversation', params);
              } else if (screen === 'UserProfile') {
                navigate('UserProfile', params);
              }
            }
          }}
          route={{ params: undefined }}
        />
      );
    }

    if (isLoggedIn && currentScreen === 'Main') {
      return (
        <>
          <MainTabNavigator
            initialActiveTab={activeTab}
            onTabChange={setActiveTab}
            onNavigateToUserProfile={(userId: string) => navigate('UserProfile', { userId })}
            onNavigateToChat={() => navigate('Chat')}
            onNavigateToChatConversation={(params: any) => navigate('ChatConversation', params)}
            onNavigateToEditProfile={() => navigate('EditProfile')}
            onNavigateToStoryViewer={(params: any) => navigate('StoryViewer', params)}
            onNavigateToSettings={() => navigate('Settings')}
            onNavigateToPremiumUpgrade={() => navigate('PremiumUpgrade')}
            onNavigateToHelpSupport={() => navigate('HelpSupport')}
            onNavigateToTermsPrivacy={() => navigate('TermsPrivacy')}
            onNavigateToProfileDetail={(sectionType: string) => navigate('ProfileDetail', { sectionType })}
            onLogout={handleLogout}
          />

          {modalScreen === 'UserProfile' && (
            <UserProfileScreen
              navigation={{ goBack: closeModal }}
              route={{ params: modalParams }}
            />
          )}
        </>
      );
    }

    // Auth screens
    switch (currentScreen) {
      case 'Register':
        return <RegisterScreen navigation={navigationProps} />;
      case 'Login':
      default:
        return <LoginScreen navigation={navigationProps} />;
    }
  }
}

export default App;
