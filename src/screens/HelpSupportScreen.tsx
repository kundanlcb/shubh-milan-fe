import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows, GlobalStyles } from '../constants/styles';
import { Icon } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';
import { MainScreenProps } from '../types/navigation';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface SupportOption {
  icon: string;
  title: string;
  description: string;
  action: () => void;
}

const faqs: FAQ[] = [
  {
    category: 'Account',
    question: 'How do I create an account?',
    answer: 'Click on "Register" button on the login screen. Fill in your details including name, email, phone number, and create a password. Verify your email/phone to activate your account.',
  },
  {
    category: 'Account',
    question: 'I forgot my password. What should I do?',
    answer: 'Click on "Forgot Password" on the login screen. Enter your registered email or phone number. You will receive a reset link/OTP to create a new password.',
  },
  {
    category: 'Profile',
    question: 'How can I edit my profile?',
    answer: 'Go to Profile tab, click on the edit icon (pencil) at the top right. You can update your personal information, photos, preferences, and other details.',
  },
  {
    category: 'Profile',
    question: 'How do I add or change my profile photo?',
    answer: 'Go to Profile tab, tap on your profile picture, then select "Change Photo". You can choose a photo from gallery or take a new one.',
  },
  {
    category: 'Matching',
    question: 'How does profile matching work?',
    answer: 'Our algorithm matches profiles based on your preferences like age, location, education, profession, religion, caste, and other criteria you specify in partner preferences.',
  },
  {
    category: 'Matching',
    question: 'Can I filter search results?',
    answer: 'Yes! Use the filter icon on the Home screen to set preferences for age, location, profession, education, religion, salary range, and more.',
  },
  {
    category: 'Communication',
    question: 'How can I send interest to a profile?',
    answer: 'Visit the profile you like and tap on "Send Interest" button. The other person will be notified and can accept or decline your interest.',
  },
  {
    category: 'Communication',
    question: 'Why can\'t I send messages?',
    answer: 'Direct messaging requires Premium membership. Free users can send interest requests. Upgrade to Premium to unlock unlimited messaging.',
  },
  {
    category: 'Premium',
    question: 'What are the benefits of Premium membership?',
    answer: 'Premium members get unlimited messaging, contact details access, priority listing, profile boost, advanced search filters, horoscope matching, and priority support.',
  },
  {
    category: 'Premium',
    question: 'How do I upgrade to Premium?',
    answer: 'Go to Profile > Upgrade to Premium. Choose a plan that suits you and complete the payment. Your Premium benefits will activate immediately.',
  },
  {
    category: 'Privacy',
    question: 'How is my privacy protected?',
    answer: 'We use industry-standard encryption for data security. You can control who sees your profile through privacy settings. Contact details are only shared with Premium members you approve.',
  },
  {
    category: 'Privacy',
    question: 'Can I hide my profile from search?',
    answer: 'Yes! Go to Settings > Privacy and enable "Hide from Search". Your profile won\'t appear in search results, but you can still browse and send interests.',
  },
];

export const HelpSupportScreen: React.FC<MainScreenProps<'HelpSupport'>> = ({
  navigation,
}) => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Account', 'Profile', 'Matching', 'Communication', 'Premium', 'Privacy'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const supportOptions: SupportOption[] = [
    {
      icon: 'mail',
      title: 'Email Support',
      description: 'support@shubhmilan.com',
      action: () => {
        Linking.openURL('mailto:support@shubhmilan.com').catch(() => {
          Alert.alert('Error', 'Could not open email app');
        });
      },
    },
    {
      icon: 'phone',
      title: 'Call Support',
      description: '+91 1800-123-4567 (Toll Free)',
      action: () => {
        Linking.openURL('tel:+918001234567').catch(() => {
          Alert.alert('Error', 'Could not make phone call');
        });
      },
    },
    {
      icon: 'message-circle',
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: () => {
        Alert.alert(
          'Live Chat',
          'Connect with our support team?\n\nAvailable: Mon-Sat, 9 AM - 6 PM',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Start Chat', onPress: () => Alert.alert('Chat', 'Chat feature will be available soon') },
          ]
        );
      },
    },
    {
      icon: 'send',
      title: 'WhatsApp Support',
      description: '+91 98765-43210',
      action: () => {
        Linking.openURL('https://wa.me/919876543210').catch(() => {
          Alert.alert('Error', 'Could not open WhatsApp');
        });
      },
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Help & Support"
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Icon name="help-circle" library="feather" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>How can we help you?</Text>
          <Text style={styles.headerSubtitle}>
            Find answers or contact our support team
          </Text>
        </View>

        {/* Contact Support Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <View style={styles.supportOptionsContainer}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.supportOption}
                onPress={option.action}
              >
                <View style={styles.supportOptionIcon}>
                  <Icon
                    name={option.icon}
                    library="feather"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.supportOptionContent}>
                  <Text style={styles.supportOptionTitle}>{option.title}</Text>
                  <Text style={styles.supportOptionDescription}>{option.description}</Text>
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

        {/* FAQ Search */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.searchContainer}>
            <Icon name="search" library="feather" size={20} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search FAQs..."
              placeholderTextColor={Colors.inputPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="x" library="feather" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQ List */}
        <View style={styles.section}>
          {filteredFAQs.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="inbox" library="feather" size={48} color={Colors.textSecondary} />
              <Text style={styles.emptyStateText}>No FAQs found</Text>
              <Text style={styles.emptyStateSubtext}>Try a different search or category</Text>
            </View>
          ) : (
            <View style={styles.faqContainer}>
              {filteredFAQs.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => toggleFAQ(index)}
                  >
                    <View style={styles.faqQuestionContent}>
                      <Text style={styles.faqCategory}>{faq.category}</Text>
                      <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    </View>
                    <Icon
                      name={expandedFAQ === index ? 'chevron-up' : 'chevron-down'}
                      library="feather"
                      size={20}
                      color={Colors.textSecondary}
                    />
                  </TouchableOpacity>
                  {expandedFAQ === index && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Still Need Help */}
        <View style={styles.section}>
          <View style={styles.needHelpCard}>
            <Text style={styles.needHelpTitle}>Still need help?</Text>
            <Text style={styles.needHelpText}>
              Our support team is available Monday to Saturday, 9 AM - 6 PM
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => {
                Alert.alert(
                  'Contact Support',
                  'Choose how you\'d like to contact us',
                  [
                    { text: 'Email', onPress: supportOptions[0].action },
                    { text: 'Call', onPress: supportOptions[1].action },
                    { text: 'WhatsApp', onPress: supportOptions[3].action },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }}
            >
              <Icon name="headphones" library="feather" size={18} color={Colors.white} />
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundCard,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginTop: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  supportOptionsContainer: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  supportOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  supportOptionContent: {
    flex: 1,
  },
  supportOptionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  supportOptionDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    marginLeft: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  categoriesScroll: {
    marginBottom: Spacing.md,
  },
  categoriesContent: {
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  faqContainer: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  faqQuestionContent: {
    flex: 1,
  },
  faqCategory: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  faqQuestionText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  faqAnswer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.background,
  },
  faqAnswerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.sm * 1.5,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyStateText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  emptyStateSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  needHelpCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
    ...Shadows.sm,
  },
  needHelpTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  needHelpText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadows.md,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
});
