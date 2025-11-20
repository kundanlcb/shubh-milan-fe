import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';
import { MainScreenProps } from '../types/navigation';

type TabType = 'terms' | 'privacy';

export const TermsPrivacyScreen: React.FC<MainScreenProps<'TermsPrivacy'>> = ({
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('terms');

  const renderTermsContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.lastUpdated}>Last updated: January 1, 2024</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using शुभ मिलन (Shubh Milan), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Eligibility</Text>
        <Text style={styles.paragraph}>
          You must be at least 18 years of age to use this service. By using this service, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all of the terms and conditions set forth herein.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. User Accounts</Text>
        <Text style={styles.paragraph}>
          • You are responsible for maintaining the confidentiality of your account and password
        </Text>
        <Text style={styles.paragraph}>
          • You agree to accept responsibility for all activities that occur under your account
        </Text>
        <Text style={styles.paragraph}>
          • You must provide accurate and complete information when creating your profile
        </Text>
        <Text style={styles.paragraph}>
          • You may not impersonate any person or entity or misrepresent your affiliation
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. User Conduct</Text>
        <Text style={styles.paragraph}>
          You agree not to:
        </Text>
        <Text style={styles.paragraph}>
          • Post false, inaccurate, misleading, or defamatory content
        </Text>
        <Text style={styles.paragraph}>
          • Harass, abuse, or harm another person
        </Text>
        <Text style={styles.paragraph}>
          • Use the service for any illegal or unauthorized purpose
        </Text>
        <Text style={styles.paragraph}>
          • Transmit any viruses, malware, or harmful code
        </Text>
        <Text style={styles.paragraph}>
          • Attempt to gain unauthorized access to any portion of the service
        </Text>
        <Text style={styles.paragraph}>
          • Create multiple accounts or share your account with others
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Content</Text>
        <Text style={styles.paragraph}>
          • You retain ownership of content you post on our platform
        </Text>
        <Text style={styles.paragraph}>
          • By posting content, you grant us a license to use, display, and distribute it
        </Text>
        <Text style={styles.paragraph}>
          • We reserve the right to remove any content that violates our policies
        </Text>
        <Text style={styles.paragraph}>
          • You are solely responsible for the content you post
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Premium Subscription</Text>
        <Text style={styles.paragraph}>
          • Premium subscriptions are charged at the rate specified at the time of purchase
        </Text>
        <Text style={styles.paragraph}>
          • Subscriptions auto-renew unless cancelled 24 hours before the renewal date
        </Text>
        <Text style={styles.paragraph}>
          • Refunds are provided as per our refund policy
        </Text>
        <Text style={styles.paragraph}>
          • We may modify Premium features and pricing with notice
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Termination</Text>
        <Text style={styles.paragraph}>
          We reserve the right to suspend or terminate your account if you violate these terms or engage in fraudulent activities. You may delete your account at any time through the app settings.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Disclaimers</Text>
        <Text style={styles.paragraph}>
          • The service is provided "as is" without warranties of any kind
        </Text>
        <Text style={styles.paragraph}>
          • We do not guarantee the accuracy of user profiles
        </Text>
        <Text style={styles.paragraph}>
          • We are not responsible for user interactions or relationships
        </Text>
        <Text style={styles.paragraph}>
          • Users are advised to exercise caution when meeting others
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          To the maximum extent permitted by law, Shubh Milan shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bihar, India.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms at any time. We will notify users of significant changes. Continued use of the service after changes constitutes acceptance of the new terms.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms of Service, please contact us at:
        </Text>
        <Text style={styles.paragraph}>
          Email: legal@shubhmilan.com
        </Text>
        <Text style={styles.paragraph}>
          Phone: +91 1800-123-4567
        </Text>
      </View>
    </View>
  );

  const renderPrivacyContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.lastUpdated}>Last updated: January 1, 2024</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          शुभ मिलन (Shubh Milan) ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our matrimonial application.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.subtitle}>Personal Information:</Text>
        <Text style={styles.paragraph}>
          • Name, age, gender, date of birth
        </Text>
        <Text style={styles.paragraph}>
          • Email address and phone number
        </Text>
        <Text style={styles.paragraph}>
          • Photos and profile pictures
        </Text>
        <Text style={styles.paragraph}>
          • Education and profession details
        </Text>
        <Text style={styles.paragraph}>
          • Family information and background
        </Text>
        <Text style={styles.paragraph}>
          • Religious and cultural preferences
        </Text>
        <Text style={styles.paragraph}>
          • Location and address information
        </Text>
        <Text style={styles.subtitle}>Usage Information:</Text>
        <Text style={styles.paragraph}>
          • Device information and IP address
        </Text>
        <Text style={styles.paragraph}>
          • App usage patterns and preferences
        </Text>
        <Text style={styles.paragraph}>
          • Search history and filter preferences
        </Text>
        <Text style={styles.paragraph}>
          • Interaction with other profiles
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use your information to:
        </Text>
        <Text style={styles.paragraph}>
          • Provide and maintain our service
        </Text>
        <Text style={styles.paragraph}>
          • Match you with compatible profiles
        </Text>
        <Text style={styles.paragraph}>
          • Communicate with you about your account
        </Text>
        <Text style={styles.paragraph}>
          • Send notifications about matches and interests
        </Text>
        <Text style={styles.paragraph}>
          • Improve our services and user experience
        </Text>
        <Text style={styles.paragraph}>
          • Prevent fraud and ensure security
        </Text>
        <Text style={styles.paragraph}>
          • Comply with legal obligations
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Information Sharing</Text>
        <Text style={styles.paragraph}>
          We may share your information with:
        </Text>
        <Text style={styles.paragraph}>
          • Other users as part of your profile (controlled by your privacy settings)
        </Text>
        <Text style={styles.paragraph}>
          • Service providers who assist in operating our platform
        </Text>
        <Text style={styles.paragraph}>
          • Law enforcement when required by law
        </Text>
        <Text style={styles.paragraph}>
          • Business partners with your consent
        </Text>
        <Text style={styles.paragraph}>
          We will never sell your personal information to third parties.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement industry-standard security measures to protect your data:
        </Text>
        <Text style={styles.paragraph}>
          • Encryption of data in transit and at rest
        </Text>
        <Text style={styles.paragraph}>
          • Secure authentication and access controls
        </Text>
        <Text style={styles.paragraph}>
          • Regular security audits and monitoring
        </Text>
        <Text style={styles.paragraph}>
          • Staff training on data protection
        </Text>
        <Text style={styles.paragraph}>
          However, no method of transmission over the internet is 100% secure.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Your Privacy Rights</Text>
        <Text style={styles.paragraph}>
          You have the right to:
        </Text>
        <Text style={styles.paragraph}>
          • Access your personal information
        </Text>
        <Text style={styles.paragraph}>
          • Correct inaccurate information
        </Text>
        <Text style={styles.paragraph}>
          • Delete your account and data
        </Text>
        <Text style={styles.paragraph}>
          • Opt-out of marketing communications
        </Text>
        <Text style={styles.paragraph}>
          • Control privacy settings and visibility
        </Text>
        <Text style={styles.paragraph}>
          • Export your data in a portable format
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Data Retention</Text>
        <Text style={styles.paragraph}>
          We retain your information as long as your account is active or as needed to provide services. When you delete your account, we will delete or anonymize your data within 30 days, except where retention is required by law.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Cookies and Tracking</Text>
        <Text style={styles.paragraph}>
          We use cookies and similar technologies to:
        </Text>
        <Text style={styles.paragraph}>
          • Remember your preferences
        </Text>
        <Text style={styles.paragraph}>
          • Analyze app usage and performance
        </Text>
        <Text style={styles.paragraph}>
          • Provide personalized content
        </Text>
        <Text style={styles.paragraph}>
          You can control cookie preferences in your device settings.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Our service is not intended for users under 18 years of age. We do not knowingly collect information from children. If we discover that we have collected information from a child, we will delete it immediately.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. International Data Transfers</Text>
        <Text style={styles.paragraph}>
          Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11. Changes to Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this Privacy Policy from time to time. We will notify you of significant changes via email or app notification. Your continued use after changes indicates acceptance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12. Contact Us</Text>
        <Text style={styles.paragraph}>
          For questions about this Privacy Policy or to exercise your rights, contact us at:
        </Text>
        <Text style={styles.paragraph}>
          Email: privacy@shubhmilan.com
        </Text>
        <Text style={styles.paragraph}>
          Phone: +91 1800-123-4567
        </Text>
        <Text style={styles.paragraph}>
          Address: Darbhanga, Bihar, India
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Legal Information"
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
      />

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'terms' && styles.tabActive]}
          onPress={() => setActiveTab('terms')}
        >
          <Icon
            name="file-text"
            library="feather"
            size={18}
            color={activeTab === 'terms' ? Colors.primary : Colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'terms' && styles.tabTextActive]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'privacy' && styles.tabActive]}
          onPress={() => setActiveTab('privacy')}
        >
          <Icon
            name="shield"
            library="feather"
            size={18}
            color={activeTab === 'privacy' ? Colors.primary : Colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'privacy' && styles.tabTextActive]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'terms' ? renderTermsContent() : renderPrivacyContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    ...Shadows.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  tabActive: {
    backgroundColor: Colors.primaryLight,
  },
  tabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
  },
  lastUpdated: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  paragraph: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.md * 1.6,
    marginBottom: Spacing.xs,
  },
});
