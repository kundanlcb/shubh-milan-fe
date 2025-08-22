import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';

// Mock user data
const userData = {
  name: 'राहुल कुमार शर्मा',
  englishName: 'Rahul Kumar Sharma',
  age: 28,
  location: 'Darbhanga, Bihar',
  profession: 'Software Engineer',
  education: 'B.Tech Computer Science',
  height: "5'9\"",
  religion: 'Hindu',
  caste: 'Brahmin',
  gotra: 'Bharadwaj',
  manglik: 'No',
  profileViews: 156,
  interests: 42,
  shortlisted: 18,
};

const profileSections = [
  { icon: '👤', title: 'Personal Info', description: 'Basic details and preferences' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family Details', description: 'Family background and values' },
  { icon: '📚', title: 'Education & Career', description: 'Professional information' },
  { icon: '🏠', title: 'Lifestyle', description: 'Habits and lifestyle choices' },
  { icon: '⭐', title: 'Horoscope', description: 'Astrological information' },
  { icon: '📱', title: 'Contact Info', description: 'Phone and email details' },
];

const menuItems = [
  { icon: '⚙️', title: 'Settings', description: 'App preferences and privacy' },
  { icon: '💎', title: 'Upgrade to Premium', description: 'Unlock exclusive features' },
  { icon: '❓', title: 'Help & Support', description: 'Get assistance and FAQs' },
  { icon: '📋', title: 'Terms & Privacy', description: 'Legal information' },
  { icon: '🚪', title: 'Logout', description: 'Sign out of your account', isLogout: true },
];

export const ProfileScreen: React.FC = () => {
  const [profileCompletion] = useState(75);

  const handleSectionPress = (section: string) => {
    Alert.alert('Coming Soon', `${section} section will be available soon!`);
  };

  const handleMenuPress = (item: typeof menuItems[0]) => {
    if (item.isLogout) {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged out!') },
        ]
      );
    } else {
      Alert.alert('Coming Soon', `${item.title} will be available soon!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userData.name.charAt(0)}</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileEnglishName}>{userData.englishName}</Text>
            <Text style={styles.profileDetails}>
              {userData.age} years • {userData.location}
            </Text>
            <Text style={styles.profileProfession}>{userData.profession}</Text>
          </View>

          {/* Profile Completion */}
          <View style={styles.completionContainer}>
            <View style={styles.completionHeader}>
              <Text style={styles.completionTitle}>Profile Completion</Text>
              <Text style={styles.completionPercentage}>{profileCompletion}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${profileCompletion}%` }]} />
            </View>
            <Text style={styles.completionTip}>
              Complete your profile to get better matches!
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.profileViews}</Text>
            <Text style={styles.statLabel}>Profile Views</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.interests}</Text>
            <Text style={styles.statLabel}>Interests</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.shortlisted}</Text>
            <Text style={styles.statLabel}>Shortlisted</Text>
          </View>
        </View>

        {/* Profile Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          {profileSections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sectionItem}
              onPress={() => handleSectionPress(section.title)}
            >
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>{section.icon}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionItemTitle}>{section.title}</Text>
                <Text style={styles.sectionItemDescription}>{section.description}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfoCard}>
          <Text style={styles.quickInfoTitle}>मूलभूत जानकारी</Text>
          <View style={styles.quickInfoGrid}>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoLabel}>Height</Text>
              <Text style={styles.quickInfoValue}>{userData.height}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoLabel}>Religion</Text>
              <Text style={styles.quickInfoValue}>{userData.religion}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoLabel}>Caste</Text>
              <Text style={styles.quickInfoValue}>{userData.caste}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoLabel}>Manglik</Text>
              <Text style={styles.quickInfoValue}>{userData.manglik}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, item.isLogout && styles.logoutItem]}
              onPress={() => handleMenuPress(item)}
            >
              <View style={[styles.menuIcon, item.isLogout && styles.logoutIcon]}>
                <Text style={styles.menuIconText}>{item.icon}</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, item.isLogout && styles.logoutText]}>
                  {item.title}
                </Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <Text style={[styles.chevron, item.isLogout && styles.logoutText]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>शुभ मिलन v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with ❤️ for Mithila community</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  editIcon: {
    fontSize: 18,
  },
  profileCard: {
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textInverse,
    fontFamily: Typography.fontFamily.hindi,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.backgroundCard,
  },
  cameraIcon: {
    fontSize: 14,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.hindi,
  },
  profileEnglishName: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  profileDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  profileProfession: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.xs,
  },
  completionContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  completionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  completionPercentage: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  completionTip: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  sectionIconText: {
    fontSize: 20,
  },
  sectionContent: {
    flex: 1,
  },
  sectionItemTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  sectionItemDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: Colors.textTertiary,
  },
  quickInfoCard: {
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
    ...Shadows.sm,
  },
  quickInfoTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    fontFamily: Typography.fontFamily.hindi,
  },
  quickInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickInfoItem: {
    width: '47%',
  },
  quickInfoLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  quickInfoValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  logoutItem: {
    backgroundColor: Colors.backgroundSecondary,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  logoutIcon: {
    backgroundColor: Colors.error,
  },
  menuIconText: {
    fontSize: 18,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  logoutText: {
    color: Colors.error,
  },
  menuDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
    fontFamily: Typography.fontFamily.hindi,
  },
  versionSubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
  },
});
