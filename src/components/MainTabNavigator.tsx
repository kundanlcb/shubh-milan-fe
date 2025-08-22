import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,

} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon, AppIcons } from './Icon';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

type TabKey = 'Home' | 'Search' | 'Chat' | 'Profile';

interface Tab {
  key: TabKey;
  label: string;
  iconConfig: { name: string; library: 'feather' | 'material' | 'material-community' | 'ionicons' };
  activeIconConfig: { name: string; library: 'feather' | 'material' | 'material-community' | 'ionicons' };
  component: React.ComponentType;
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

export const MainTabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Home');
  const insets = useSafeAreaInsets();

  const renderActiveScreen = () => {
    const activeTabData = tabs.find(tab => tab.key === activeTab);
    if (!activeTabData) return null;

    const Component = activeTabData.component;
    return <Component />;
  };

  const renderTabButton = (tab: Tab) => {
    const isActive = activeTab === tab.key;
    const iconConfig = isActive ? tab.activeIconConfig : tab.iconConfig;

    return (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        onPress={() => setActiveTab(tab.key)}
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
