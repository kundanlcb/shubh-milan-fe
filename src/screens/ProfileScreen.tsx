import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon, AppIcons } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';

// Mock user data
const userData = {
  name: 'Priya Sharma',
  avatar: 'https://picsum.photos/200/200?random=1001',
  age: 25,
  location: 'Darbhanga, Bihar',
  profession: 'Teacher',
  education: 'M.A. Hindi Literature',
  height: "5'4\"",
  profileViews: 156,
  interests: 42,
  shortlisted: 18,
};

const profileSections = [
  { iconConfig: AppIcons.personalInfo, title: 'Personal Info', description: 'Basic details and preferences' },
  { iconConfig: AppIcons.family, title: 'Family Details', description: 'Family background and values' },
  { iconConfig: AppIcons.educationCareer, title: 'Education & Career', description: 'Professional information' },
  { iconConfig: AppIcons.lifestyle, title: 'Lifestyle', description: 'Habits and lifestyle choices' },
  { iconConfig: AppIcons.horoscope, title: 'Horoscope', description: 'Astrological information' },
  { iconConfig: AppIcons.contact, title: 'Contact Info', description: 'Phone and email details' },
];

const menuItems = [
  { iconConfig: AppIcons.settings, title: 'Settings', description: 'App preferences and privacy' },
  { iconConfig: { name: 'award', library: 'feather' as const }, title: 'Upgrade to Premium', description: 'Unlock exclusive features' },
  { iconConfig: { name: 'help-circle', library: 'feather' as const }, title: 'Help & Support', description: 'Get assistance and FAQs' },
  { iconConfig: { name: 'file-text', library: 'feather' as const }, title: 'Terms & Privacy', description: 'Legal information' },
  { iconConfig: AppIcons.logout, title: 'Logout', description: 'Sign out of your account', isLogout: true },
];

export const ProfileScreen: React.FC<{
  onNavigateToEditProfile?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToPremiumUpgrade?: () => void;
  onNavigateToHelpSupport?: () => void;
  onNavigateToTermsPrivacy?: () => void;
  onNavigateToProfileDetail?: (sectionType: string) => void;
  onLogout?: () => void;
}> = ({ 
  onNavigateToEditProfile, 
  onNavigateToSettings,
  onNavigateToPremiumUpgrade,
  onNavigateToHelpSupport,
  onNavigateToTermsPrivacy,
  onNavigateToProfileDetail,
  onLogout 
}) => {
  const [profileCompletion] = useState(75);

  const handleMenuItemPress = (title: string) => {
    switch (title) {
      case 'Settings':
        if (onNavigateToSettings) {
          onNavigateToSettings();
        } else {
          Alert.alert('Settings', 'Settings screen would open here');
        }
        break;
      case 'Upgrade to Premium':
        if (onNavigateToPremiumUpgrade) {
          onNavigateToPremiumUpgrade();
        } else {
          Alert.alert('Premium', 'Premium upgrade flow would start here');
        }
        break;
      case 'Help & Support':
        if (onNavigateToHelpSupport) {
          onNavigateToHelpSupport();
        } else {
          Alert.alert('Help', 'Help & Support screen would open here');
        }
        break;
      case 'Terms & Privacy':
        if (onNavigateToTermsPrivacy) {
          onNavigateToTermsPrivacy();
        } else {
          Alert.alert('Terms', 'Terms & Privacy screen would open here');
        }
        break;
      default:
        Alert.alert('Info', `${title} feature coming soon!`);
    }
  };

  const getSectionType = (title: string): string => {
    switch (title) {
      case 'Personal Info': return 'personal';
      case 'Family Details': return 'family';
      case 'Education & Career': return 'education';
      case 'Lifestyle': return 'lifestyle';
      case 'Horoscope': return 'horoscope';
      case 'Contact Info': return 'contact';
      default: return 'personal';
    }
  };

  const handleSectionPress = (title: string) => {
    const sectionType = getSectionType(title);
    if (onNavigateToProfileDetail) {
      onNavigateToProfileDetail(sectionType);
    } else {
      Alert.alert('Info', `${title} section would open here`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              Alert.alert('Info', 'Logout functionality would be implemented here');
            }
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Profile"
        actionIcon="edit-3"
        onActionPress={() => onNavigateToEditProfile ? onNavigateToEditProfile() : Alert.alert('Edit Profile', 'Edit profile screen would open here')}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: userData.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" library="feather" size={16} color={Colors.textInverse} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileDetails}>
              {userData.age} years • {userData.profession}
            </Text>
            <Text style={styles.profileLocation}>
              <Icon name="map-pin" library="feather" size={14} color={Colors.textSecondary} />
              {' '}{userData.location}
            </Text>
          </View>
        </View>

        {/* Profile Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Icon name="eye" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.statNumber}>{userData.profileViews}</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="heart" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.statNumber}>{userData.interests}</Text>
            <Text style={styles.statLabel}>Interests</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="star" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.statNumber}>{userData.shortlisted}</Text>
            <Text style={styles.statLabel}>Shortlisted</Text>
          </View>
        </View>

        {/* Profile Completion */}
        <View style={styles.completionSection}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionTitle}>Profile Completion</Text>
            <Text style={styles.completionPercentage}>{profileCompletion}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${profileCompletion}%` }
              ]}
            />
          </View>
        </View>

        {/* Profile Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionGroupTitle}>Profile Information</Text>
          <View style={styles.groupCard}>
            {profileSections.map((section, index) => (
              <TouchableOpacity
                key={section.title}
                style={[
                  styles.sectionRow,
                  index !== profileSections.length - 1 && styles.sectionRowBorder
                ]}
                onPress={() => handleSectionPress(section.title)}
              >
                <View style={styles.sectionRowIcon}>
                  <Icon
                    name={section.iconConfig.name}
                    library={section.iconConfig.library}
                    size={20}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.sectionRowContent}>
                  <Text style={styles.sectionRowTitle}>{section.title}</Text>
                  <Text style={styles.sectionRowDescription}>{section.description}</Text>
                </View>
                <Icon
                  name="chevron-right"
                  library="feather"
                  size={16}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionGroupTitle}>Account</Text>
          <View style={styles.groupCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.title}
                style={[
                  styles.menuRow,
                  index !== menuItems.length - 1 && styles.menuRowBorder,
                  item.isLogout && styles.logoutRow
                ]}
                onPress={() => item.isLogout ? handleLogout() : handleMenuItemPress(item.title)}
              >
                <View style={[styles.menuRowIcon, item.isLogout && styles.logoutIconContainer]}>
                  <Icon
                    name={item.iconConfig.name}
                    library={item.iconConfig.library}
                    size={18}
                    color={item.isLogout ? Colors.error : Colors.textSecondary}
                  />
                </View>
                <View style={styles.menuRowContent}>
                  <Text style={[styles.menuRowTitle, item.isLogout && styles.logoutText]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.menuRowDescription, item.isLogout && styles.logoutDescription]}>
                    {item.description}
                  </Text>
                </View>
                <Icon
                  name="chevron-right"
                  library="feather"
                  size={16}
                  color={item.isLogout ? Colors.error : Colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    padding: 4,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  profileDetails: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  profileLocation: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    marginTop: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  completionSection: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  completionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  completionPercentage: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  sectionsContainer: {
    margin: Spacing.md,
  },
  menuContainer: {
    margin: Spacing.md,
    marginTop: 0,
  },
  sectionGroupTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  groupCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  sectionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoutRow: {
    // Remove the background color to match other items
    // backgroundColor: Colors.errorLight, // Removed
  },
  sectionRowIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  sectionRowContent: {
    flex: 1,
  },
  sectionRowTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  sectionRowDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuRowIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  logoutIconContainer: {
    backgroundColor: Colors.errorLight,
  },
  menuRowContent: {
    flex: 1,
  },
  menuRowTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  menuRowDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  logoutText: {
    color: Colors.error,
  },
  logoutDescription: {
    color: Colors.error,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    // Remove bottom padding since we're not including bottom edge in SafeAreaView
  },
});
