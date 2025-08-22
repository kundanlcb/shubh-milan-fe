import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon, AppIcons } from '../components/Icon';

// Mock user data
const userData = {
  name: 'Priya Sharma',
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

export const ProfileScreen: React.FC = () => {
  const [profileCompletion] = useState(75);

  const handleSectionPress = (section: string) => {
    Alert.alert('Navigation', `Navigate to ${section}`);
  };

  const handleMenuPress = (item: string) => {
    if (item === 'Logout') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive' },
        ]
      );
    } else {
      Alert.alert('Navigation', `Navigate to ${item}`);
    }
  };

  const renderProfileSection = (section: typeof profileSections[0]) => (
    <TouchableOpacity
      key={section.title}
      style={styles.sectionCard}
      onPress={() => handleSectionPress(section.title)}
    >
      <View style={styles.sectionIcon}>
        <Icon
          name={section.iconConfig.name}
          library={section.iconConfig.library}
          size={24}
          color={Colors.primary}
        />
      </View>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionDescription}>{section.description}</Text>
      </View>
      <Icon
        name="chevron-right"
        library="feather"
        size={20}
        color={Colors.textSecondary}
      />
    </TouchableOpacity>
  );

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.title}
      style={[styles.menuItem, item.isLogout && styles.logoutItem]}
      onPress={() => handleMenuPress(item.title)}
    >
      <View style={[styles.menuIcon, item.isLogout && styles.logoutIcon]}>
        <Icon
          name={item.iconConfig.name}
          library={item.iconConfig.library}
          size={20}
          color={item.isLogout ? Colors.error : Colors.textSecondary}
        />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, item.isLogout && styles.logoutText]}>
          {item.title}
        </Text>
        <Text style={[styles.menuDescription, item.isLogout && styles.logoutDescription]}>
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
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>प्रोफाइल</Text>
          <TouchableOpacity>
            <Icon name="edit-2" library="feather" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImage}>
              <Text style={styles.profileImageText}>{userData.name.charAt(0)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData.name}</Text>
              <Text style={styles.profileDetails}>
                {userData.age} years • {userData.height}
              </Text>
              <Text style={styles.profileLocation}>{userData.location}</Text>
              <Text style={styles.profileProfession}>{userData.profession}</Text>
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

          {/* Stats */}
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
        </View>

        {/* Profile Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionGroupTitle}>Profile Information</Text>
          {profileSections.map(renderProfileSection)}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionGroupTitle}>Account</Text>
          {menuItems.map(renderMenuItem)}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  profileCard: {
    backgroundColor: Colors.backgroundCard,
    margin: Spacing.md,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  profileImageText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
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
  profileProfession: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  completionSection: {
    marginBottom: Spacing.lg,
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
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
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
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  sectionDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  logoutItem: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  logoutIcon: {
    backgroundColor: Colors.errorLight,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  logoutText: {
    color: Colors.error,
  },
  menuDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  logoutDescription: {
    color: Colors.errorLight,
  },
  scrollContent: {
    paddingBottom: Spacing.md,
  },
});
