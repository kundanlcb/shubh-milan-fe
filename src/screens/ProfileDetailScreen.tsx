import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';
import { MainScreenProps } from '../types/navigation';

interface DetailItem {
  label: string;
  value: string;
  icon?: string;
}

interface ProfileSection {
  title: string;
  items: DetailItem[];
}

// Mock data for different profile sections
const getProfileData = (sectionType: string): ProfileSection[] => {
  switch (sectionType) {
    case 'personal':
      return [
        {
          title: 'Basic Information',
          items: [
            { label: 'Full Name', value: 'Priya Sharma', icon: 'user' },
            { label: 'Age', value: '25 years', icon: 'calendar' },
            { label: 'Height', value: "5'4\" (163 cm)", icon: 'trending-up' },
            { label: 'Weight', value: '55 kg', icon: 'activity' },
            { label: 'Body Type', value: 'Slim', icon: 'user-check' },
            { label: 'Complexion', value: 'Fair', icon: 'sun' },
          ],
        },
        {
          title: 'Personal Details',
          items: [
            { label: 'Marital Status', value: 'Never Married', icon: 'heart' },
            { label: 'Mother Tongue', value: 'Hindi', icon: 'message-circle' },
            { label: 'Religion', value: 'Hindu', icon: 'book' },
            { label: 'Caste', value: 'Brahmin', icon: 'users' },
            { label: 'Sub Caste', value: 'Maithil', icon: 'user-plus' },
            { label: 'Gothra', value: 'Kashyap', icon: 'bookmark' },
          ],
        },
        {
          title: 'About Me',
          items: [
            {
              label: 'Bio',
              value: 'Traditional values with modern outlook. Looking for a caring and understanding life partner who respects family values and supports personal growth.',
            },
          ],
        },
      ];

    case 'family':
      return [
        {
          title: 'Family Background',
          items: [
            { label: 'Family Type', value: 'Nuclear Family', icon: 'home' },
            { label: 'Family Status', value: 'Middle Class', icon: 'trending-up' },
            { label: 'Family Values', value: 'Traditional', icon: 'heart' },
            { label: 'Native Place', value: 'Darbhanga, Bihar', icon: 'map-pin' },
          ],
        },
        {
          title: 'Father\'s Details',
          items: [
            { label: 'Father\'s Name', value: 'Ramesh Sharma', icon: 'user' },
            { label: 'Occupation', value: 'Business Owner', icon: 'briefcase' },
            { label: 'Status', value: 'Employed', icon: 'check-circle' },
          ],
        },
        {
          title: 'Mother\'s Details',
          items: [
            { label: 'Mother\'s Name', value: 'Sita Sharma', icon: 'user' },
            { label: 'Occupation', value: 'Homemaker', icon: 'home' },
          ],
        },
        {
          title: 'Siblings',
          items: [
            { label: 'Brothers', value: '1 (Married)', icon: 'users' },
            { label: 'Sisters', value: '1 (Unmarried)', icon: 'users' },
          ],
        },
      ];

    case 'education':
      return [
        {
          title: 'Education',
          items: [
            { label: 'Highest Qualification', value: 'M.A. Hindi Literature', icon: 'book' },
            { label: 'College/University', value: 'Lalit Narayan Mithila University', icon: 'book-open' },
            { label: 'Specialization', value: 'Hindi Literature', icon: 'award' },
            { label: 'Year of Passing', value: '2020', icon: 'calendar' },
          ],
        },
        {
          title: 'Career',
          items: [
            { label: 'Profession', value: 'Teacher', icon: 'briefcase' },
            { label: 'Company/School', value: 'Govt. High School', icon: 'building' },
            { label: 'Designation', value: 'Senior Teacher', icon: 'award' },
            { label: 'Annual Income', value: '5-7 Lakhs per annum', icon: 'dollar-sign' },
            { label: 'Work Location', value: 'Darbhanga, Bihar', icon: 'map-pin' },
          ],
        },
        {
          title: 'Professional Skills',
          items: [
            { label: 'Skills', value: 'Teaching, Content Writing, Public Speaking', icon: 'star' },
          ],
        },
      ];

    case 'lifestyle':
      return [
        {
          title: 'Lifestyle Habits',
          items: [
            { label: 'Diet', value: 'Vegetarian', icon: 'coffee' },
            { label: 'Drinking', value: 'No', icon: 'x-circle' },
            { label: 'Smoking', value: 'No', icon: 'x-circle' },
            { label: 'Exercise', value: 'Regular Yoga', icon: 'activity' },
          ],
        },
        {
          title: 'Interests & Hobbies',
          items: [
            { label: 'Hobbies', value: 'Reading, Cooking, Classical Music, Travel', icon: 'heart' },
            { label: 'Music Preference', value: 'Classical, Devotional', icon: 'music' },
            { label: 'Sports', value: 'Badminton, Walking', icon: 'target' },
            { label: 'Books', value: 'Hindi Literature, Spiritual', icon: 'book' },
          ],
        },
        {
          title: 'Living Preferences',
          items: [
            { label: 'Living Situation', value: 'With Family', icon: 'home' },
            { label: 'Willing to Relocate', value: 'Yes', icon: 'map' },
          ],
        },
      ];

    case 'horoscope':
      return [
        {
          title: 'Astrological Information',
          items: [
            { label: 'Rashi (Moon Sign)', value: 'Kanya (Virgo)', icon: 'moon' },
            { label: 'Nakshatra', value: 'Hasta', icon: 'star' },
            { label: 'Gotra', value: 'Kashyap', icon: 'bookmark' },
            { label: 'Manglik Status', value: 'No', icon: 'circle' },
          ],
        },
        {
          title: 'Birth Details',
          items: [
            { label: 'Date of Birth', value: '15 August 1998', icon: 'calendar' },
            { label: 'Time of Birth', value: '06:30 AM', icon: 'clock' },
            { label: 'Place of Birth', value: 'Darbhanga, Bihar', icon: 'map-pin' },
          ],
        },
        {
          title: 'Note',
          items: [
            {
              label: 'Horoscope Matching',
              value: 'Kundali matching will be done before finalizing the alliance. Detailed horoscope available on request.',
            },
          ],
        },
      ];

    case 'contact':
      return [
        {
          title: 'Contact Information',
          items: [
            { label: 'Mobile Number', value: '+91 98765 43210', icon: 'phone' },
            { label: 'Email Address', value: 'priya.sharma@email.com', icon: 'mail' },
            { label: 'Alternate Number', value: '+91 87654 32109', icon: 'phone' },
          ],
        },
        {
          title: 'Address',
          items: [
            { label: 'Current Location', value: 'Darbhanga, Bihar', icon: 'map-pin' },
            {
              label: 'Full Address',
              value: 'Ward No. 12, Laheriasarai Road, Darbhanga - 846004, Bihar, India',
              icon: 'home',
            },
          ],
        },
        {
          title: 'Preferred Contact Time',
          items: [
            { label: 'Best Time to Call', value: 'Evening (6 PM - 9 PM)', icon: 'clock' },
            { label: 'Contact Person', value: 'Self / Father', icon: 'user' },
          ],
        },
      ];

    default:
      return [];
  }
};

const getSectionTitle = (type: string): string => {
  switch (type) {
    case 'personal': return 'Personal Information';
    case 'family': return 'Family Details';
    case 'education': return 'Education & Career';
    case 'lifestyle': return 'Lifestyle';
    case 'horoscope': return 'Horoscope Details';
    case 'contact': return 'Contact Information';
    default: return 'Profile Details';
  }
};

export const ProfileDetailScreen: React.FC<MainScreenProps<'ProfileDetail'>> = ({
  navigation,
  route,
}) => {
  const sectionType = route.params?.sectionType || 'personal';
  const sections = getProfileData(sectionType);
  const title = getSectionTitle(sectionType);

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <TabHeader
        title={title}
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
        actionIcon="edit-3"
        onActionPress={handleEdit}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View
                  key={itemIndex}
                  style={[
                    styles.detailRow,
                    itemIndex !== section.items.length - 1 && styles.detailRowBorder,
                  ]}
                >
                  {item.icon && (
                    <View style={styles.iconContainer}>
                      <Icon
                        name={item.icon}
                        library="feather"
                        size={18}
                        color={Colors.primary}
                      />
                    </View>
                  )}
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>{item.label}</Text>
                    <Text style={styles.detailValue}>{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Edit Button at Bottom */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Icon name="edit-3" library="feather" size={18} color={Colors.white} />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
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
  sectionCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  detailRow: {
    flexDirection: 'row',
    padding: Spacing.md,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.md * 1.5,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing['2xl'],
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.sm,
  },
});
