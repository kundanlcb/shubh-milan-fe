import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon, AppIcons } from './Icon';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AddPostScreen } from '../screens/AddPostScreen';
import { AddStoryScreen } from '../screens/AddStoryScreen';

type TabKey = 'Home' | 'Search' | 'AddPost' | 'Chat' | 'Profile';

interface Tab {
  key: TabKey;
  label: string;
  iconConfig: { name: string; library: 'feather' | 'material' | 'material-community' | 'ionicons' };
  activeIconConfig: { name: string; library: 'feather' | 'material' | 'material-community' | 'ionicons' };
  component: React.ComponentType<any>;
  isAddButton?: boolean;
}

const tabs: Tab[] = [
  {
    key: 'Home',
    label: 'Home',
    iconConfig: AppIcons.home,
    activeIconConfig: AppIcons.homeActive,
    component: HomeScreen,
  },
  {
    key: 'Search',
    label: 'Search',
    iconConfig: AppIcons.search,
    activeIconConfig: AppIcons.searchActive,
    component: SearchScreen,
  },
  {
    key: 'AddPost',
    label: 'Post',
    iconConfig: { name: 'edit', library: 'feather' },
    activeIconConfig: { name: 'edit', library: 'feather' },
    component: AddPostScreen,
    isAddButton: true,
  },
  {
    key: 'Chat',
    label: 'Messages',
    iconConfig: AppIcons.chat,
    activeIconConfig: AppIcons.chatActive,
    component: ChatScreen,
  },
  {
    key: 'Profile',
    label: 'Profile',
    iconConfig: AppIcons.profile,
    activeIconConfig: AppIcons.profileActive,
    component: ProfileScreen,
  },
];

export const MainTabNavigator: React.FC<{
  initialActiveTab?: string;
  onTabChange?: (tab: string) => void;
  onNavigateToUserProfile: (userId: string) => void;
  onNavigateToChatConversation: (params: any) => void;
  onNavigateToEditProfile: () => void;
  onNavigateToStoryViewer: (params: any) => void;
  onLogout: () => void;
}> = ({ initialActiveTab = 'Home', onTabChange, onNavigateToUserProfile, onNavigateToChatConversation, onNavigateToEditProfile, onNavigateToStoryViewer, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabKey>(initialActiveTab as TabKey);
  const [showAddStoryScreen, setShowAddStoryScreen] = useState(false);
  const insets = useSafeAreaInsets();

  // Update activeTab when initialActiveTab prop changes (coming back from chat conversation)
  useEffect(() => {
    setActiveTab(initialActiveTab as TabKey);
  }, [initialActiveTab]);

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      if (activeTab === 'AddPost') {
        setActiveTab('Home');
        return true; // Prevent default back navigation
      } else if (showAddStoryScreen) {
        setShowAddStoryScreen(false);
        return true; // Prevent default back navigation
      }
      return false; // Allow default back navigation
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      subscription.remove();
    };
  }, [activeTab, showAddStoryScreen]);

  // Handle tab change and notify parent
  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // If AddStory screen is active, show it
  if (showAddStoryScreen) {
    return (
      <View style={styles.container}>
        <AddStoryScreen navigation={{ goBack: () => setShowAddStoryScreen(false) }} />
      </View>
    );
  }

  const renderActiveScreen = () => {
    const activeTabData = tabs.find(tab => tab.key === activeTab);
    if (!activeTabData) return null;

    const Component = activeTabData.component;

    // Pass navigation-like props to AddPostScreen
    if (activeTab === 'AddPost') {
      return <Component navigation={{ goBack: () => setActiveTab('Home') }} />;
    }

    // Pass navigation callback to HomeScreen
    if (activeTab === 'Home') {
      return <Component
        onNavigateToAddPost={() => setActiveTab('AddPost')}
        onNavigateToAddStory={() => setShowAddStoryScreen(true)}
        onNavigateToUserProfile={onNavigateToUserProfile}
        onNavigateToStoryViewer={onNavigateToStoryViewer}
      />;
    }

    // Pass navigation callback to SearchScreen
    if (activeTab === 'Search') {
      return <Component
        navigation={{
          navigate: (screen: string, params?: any) => {
            if (screen === 'UserProfile') {
              onNavigateToUserProfile(params.userId);
            }
          }
        }}
      />;
    }

    // Pass navigation callback to ChatScreen
    if (activeTab === 'Chat') {
      return <Component
        navigation={{
          navigate: (screen: string, params?: any) => {
            if (screen === 'Search') {
              setActiveTab('Search');
            } else if (screen === 'ChatConversation') {
              onNavigateToChatConversation(params);
            }
          }
        }}
      />;
    }

    // Pass navigation callback to ProfileScreen
    if (activeTab === 'Profile') {
      return <Component
        onNavigateToEditProfile={onNavigateToEditProfile}
        onLogout={onLogout}
      />;
    }

    return <Component />;
  };

  const renderTabButton = (tab: Tab) => {
    const isActive = activeTab === tab.key;
    const iconConfig = isActive ? tab.activeIconConfig : tab.iconConfig;

    // Special styling for the add button - but following same pattern as other tabs
    if (tab.isAddButton) {
      return (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tabButton, isActive && styles.activeTabButton]}
          onPress={() => handleTabChange(tab.key)}
        >
          <View style={[styles.tabIconContainer, isActive && styles.activeTabIconContainer]}>
            <Icon
              name={iconConfig.name}
              library={iconConfig.library}
              size={22}
              color={isActive ? Colors.white : Colors.textSecondary}
            />
          </View>
          <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
            {tab.label}
          </Text>
          {isActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        onPress={() => handleTabChange(tab.key)}
      >
        <View style={[styles.tabIconContainer, isActive && styles.activeTabIconContainer]}>
          <Icon
            name={iconConfig.name}
            library={iconConfig.library}
            size={22}
            color={isActive ? Colors.white : Colors.textSecondary}
          />
        </View>
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
          {tab.label}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <SafeAreaView style={styles.content} edges={['top', 'left', 'right']}>
        {renderActiveScreen()}
      </SafeAreaView>

      {/* Bottom Tab Bar */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        <View style={styles.tabContainer}>
          {tabs.map(renderTabButton)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    position: 'relative',
  },
  activeTabButton: {
    // Active tab styling
  },
  tabIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  activeTabIconContainer: {
    backgroundColor: Colors.primary,
  },
  tabIcon: {
    fontSize: 20,
  },
  activeTabIcon: {
    // Active icon already handled by switching icon type
  },
  tabLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 20,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
  },
});
