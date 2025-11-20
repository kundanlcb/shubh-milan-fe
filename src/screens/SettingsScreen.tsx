import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';
import { MainScreenProps } from '../types/navigation';

interface SettingToggle {
  id: string;
  title: string;
  description: string;
  icon: string;
  value: boolean;
}

interface SettingOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  value?: string;
  hasArrow?: boolean;
}

export const SettingsScreen: React.FC<MainScreenProps<'Settings'>> = ({
  navigation,
}) => {
  const [notificationSettings, setNotificationSettings] = useState<SettingToggle[]>([
    {
      id: 'push_notifications',
      title: 'Push Notifications',
      description: 'Receive push notifications',
      icon: 'bell',
      value: true,
    },
    {
      id: 'email_notifications',
      title: 'Email Notifications',
      description: 'Receive updates via email',
      icon: 'mail',
      value: true,
    },
    {
      id: 'new_matches',
      title: 'New Matches',
      description: 'Notify about new profile matches',
      icon: 'heart',
      value: true,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Notify about new messages',
      icon: 'message-circle',
      value: true,
    },
    {
      id: 'profile_views',
      title: 'Profile Views',
      description: 'Notify when someone views your profile',
      icon: 'eye',
      value: false,
    },
  ]);

  const [privacySettings, setPrivacySettings] = useState<SettingToggle[]>([
    {
      id: 'show_online_status',
      title: 'Show Online Status',
      description: 'Let others see when you\'re online',
      icon: 'circle',
      value: true,
    },
    {
      id: 'show_profile_views',
      title: 'Show Profile Views',
      description: 'Allow others to see you viewed their profile',
      icon: 'eye',
      value: true,
    },
    {
      id: 'hide_from_search',
      title: 'Hide from Search',
      description: 'Don\'t show my profile in search results',
      icon: 'eye-off',
      value: false,
    },
  ]);

  const accountSettings: SettingOption[] = [
    {
      id: 'language',
      title: 'Language',
      description: 'English',
      icon: 'globe',
      value: 'English',
      hasArrow: true,
    },
    {
      id: 'blocked_users',
      title: 'Blocked Users',
      description: 'Manage blocked profiles',
      icon: 'slash',
      hasArrow: true,
    },
    {
      id: 'data_usage',
      title: 'Data & Storage',
      description: 'Manage app data and cache',
      icon: 'database',
      hasArrow: true,
    },
    {
      id: 'account_verification',
      title: 'Account Verification',
      description: 'Verify your profile',
      icon: 'check-circle',
      hasArrow: true,
    },
  ];

  const dangerZoneSettings: SettingOption[] = [
    {
      id: 'deactivate',
      title: 'Deactivate Account',
      description: 'Temporarily hide your profile',
      icon: 'pause-circle',
      hasArrow: true,
    },
    {
      id: 'delete',
      title: 'Delete Account',
      description: 'Permanently delete your account',
      icon: 'trash-2',
      hasArrow: true,
    },
  ];

  const handleToggle = (settingId: string, section: 'notification' | 'privacy') => {
    if (section === 'notification') {
      setNotificationSettings(prev =>
        prev.map(setting =>
          setting.id === settingId
            ? { ...setting, value: !setting.value }
            : setting
        )
      );
    } else {
      setPrivacySettings(prev =>
        prev.map(setting =>
          setting.id === settingId
            ? { ...setting, value: !setting.value }
            : setting
        )
      );
    }
  };

  const handleAccountSetting = (settingId: string) => {
    switch (settingId) {
      case 'language':
        Alert.alert(
          'Language',
          'Select your preferred language',
          [
            { text: 'English', onPress: () => {} },
            { text: 'हिंदी (Hindi)', onPress: () => {} },
            { text: 'मैथिली (Maithili)', onPress: () => {} },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        break;
      case 'blocked_users':
        Alert.alert('Blocked Users', 'You haven\'t blocked anyone yet.');
        break;
      case 'data_usage':
        Alert.alert('Data & Storage', 'App is using 45 MB of storage.\n\nCache: 12 MB\nImages: 28 MB\nVideos: 5 MB');
        break;
      case 'account_verification':
        Alert.alert(
          'Account Verification',
          'Verify your account to build trust and get better matches.\n\n• ID Proof Verification\n• Photo Verification\n• Phone Verification',
          [
            { text: 'Verify Now', onPress: () => {} },
            { text: 'Later', style: 'cancel' },
          ]
        );
        break;
      case 'deactivate':
        Alert.alert(
          'Deactivate Account',
          'Your profile will be hidden from search and matches. You can reactivate anytime by logging in.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Deactivate', style: 'destructive', onPress: () => {} },
          ]
        );
        break;
      case 'delete':
        Alert.alert(
          'Delete Account',
          'Warning: This action cannot be undone. All your data will be permanently deleted.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Delete Forever', 
              style: 'destructive', 
              onPress: () => {
                Alert.alert('Confirm', 'Are you absolutely sure?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Yes, Delete', style: 'destructive', onPress: () => {} },
                ]);
              }
            },
          ]
        );
        break;
      default:
        Alert.alert('Coming Soon', `${settingId} feature will be available soon.`);
    }
  };

  const renderToggleSetting = (
    setting: SettingToggle,
    section: 'notification' | 'privacy'
  ) => (
    <View key={setting.id} style={styles.settingRow}>
      <View style={styles.settingIconContainer}>
        <Icon
          name={setting.icon}
          library="feather"
          size={18}
          color={Colors.primary}
        />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{setting.title}</Text>
        <Text style={styles.settingDescription}>{setting.description}</Text>
      </View>
      <Switch
        value={setting.value}
        onValueChange={() => handleToggle(setting.id, section)}
        trackColor={{ false: Colors.border, true: Colors.primaryLight }}
        thumbColor={setting.value ? Colors.primary : Colors.textSecondary}
      />
    </View>
  );

  const renderOptionSetting = (setting: SettingOption, isDanger?: boolean) => (
    <TouchableOpacity
      key={setting.id}
      style={styles.settingRow}
      onPress={() => handleAccountSetting(setting.id)}
    >
      <View style={[
        styles.settingIconContainer,
        isDanger && styles.dangerIconContainer,
      ]}>
        <Icon
          name={setting.icon}
          library="feather"
          size={18}
          color={isDanger ? Colors.error : Colors.primary}
        />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, isDanger && styles.dangerText]}>
          {setting.title}
        </Text>
        <Text style={[styles.settingDescription, isDanger && styles.dangerDescription]}>
          {setting.description}
        </Text>
      </View>
      {setting.hasArrow && (
        <Icon
          name="chevron-right"
          library="feather"
          size={16}
          color={isDanger ? Colors.error : Colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Settings"
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionCard}>
            {notificationSettings.map((setting, index) => (
              <View
                key={setting.id}
                style={index !== notificationSettings.length - 1 ? styles.settingRowBorder : null}
              >
                {renderToggleSetting(setting, 'notification')}
              </View>
            ))}
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionCard}>
            {privacySettings.map((setting, index) => (
              <View
                key={setting.id}
                style={index !== privacySettings.length - 1 ? styles.settingRowBorder : null}
              >
                {renderToggleSetting(setting, 'privacy')}
              </View>
            ))}
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionCard}>
            {accountSettings.map((setting, index) => (
              <View
                key={setting.id}
                style={index !== accountSettings.length - 1 ? styles.settingRowBorder : null}
              >
                {renderOptionSetting(setting)}
              </View>
            ))}
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.dangerSectionTitle]}>Danger Zone</Text>
          <View style={styles.sectionCard}>
            {dangerZoneSettings.map((setting, index) => (
              <View
                key={setting.id}
                style={index !== dangerZoneSettings.length - 1 ? styles.settingRowBorder : null}
              >
                {renderOptionSetting(setting, true)}
              </View>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>शुभ मिलन v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Made with ❤️ for Mithila Community</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  section: {
    marginTop: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  dangerSectionTitle: {
    color: Colors.error,
  },
  sectionCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  dangerIconContainer: {
    backgroundColor: Colors.errorLight,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  settingDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  dangerText: {
    color: Colors.error,
  },
  dangerDescription: {
    color: Colors.error,
    opacity: 0.8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginTop: Spacing.lg,
  },
  appInfoText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  appInfoSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
});
