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
import { Icon } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';
import { MainScreenProps } from '../types/navigation';

interface PremiumFeature {
  icon: string;
  title: string;
  description: string;
}

interface PremiumPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  isPopular?: boolean;
  savings?: string;
}

const premiumFeatures: PremiumFeature[] = [
  {
    icon: 'message-circle',
    title: 'Unlimited Messaging',
    description: 'Send unlimited messages to all profiles',
  },
  {
    icon: 'eye',
    title: 'See Who Viewed You',
    description: 'Know who visited your profile',
  },
  {
    icon: 'phone',
    title: 'Contact Details Access',
    description: 'View phone numbers and email addresses',
  },
  {
    icon: 'star',
    title: 'Priority Listing',
    description: 'Your profile appears first in search results',
  },
  {
    icon: 'users',
    title: 'Advanced Search Filters',
    description: 'Use premium filters for better matches',
  },
  {
    icon: 'zap',
    title: 'Instant Notifications',
    description: 'Get real-time alerts for new matches',
  },
  {
    icon: 'trending-up',
    title: 'Profile Boost',
    description: 'Get 3x more profile views',
  },
  {
    icon: 'check-circle',
    title: 'Verified Badge',
    description: 'Stand out with premium verified badge',
  },
  {
    icon: 'book-open',
    title: 'Horoscope Matching',
    description: 'Advanced kundali compatibility analysis',
  },
  {
    icon: 'headphones',
    title: 'Priority Support',
    description: 'Get faster customer support response',
  },
];

const premiumPlans: PremiumPlan[] = [
  {
    id: '1_month',
    name: '1 Month',
    duration: '30 Days',
    price: 999,
    originalPrice: 1499,
    discount: '33% OFF',
  },
  {
    id: '3_months',
    name: '3 Months',
    duration: '90 Days',
    price: 1999,
    originalPrice: 4497,
    discount: '56% OFF',
    isPopular: true,
    savings: 'Save ₹2,498',
  },
  {
    id: '6_months',
    name: '6 Months',
    duration: '180 Days',
    price: 2999,
    originalPrice: 8994,
    discount: '67% OFF',
    savings: 'Save ₹5,995',
  },
  {
    id: '12_months',
    name: '1 Year',
    duration: '365 Days',
    price: 4999,
    originalPrice: 17988,
    discount: '72% OFF',
    savings: 'Save ₹12,989',
  },
];

export const PremiumUpgradeScreen: React.FC<MainScreenProps<'PremiumUpgrade'>> = ({
  navigation,
}) => {
  const [selectedPlan, setSelectedPlan] = useState('3_months');

  const handleSubscribe = () => {
    const plan = premiumPlans.find(p => p.id === selectedPlan);
    if (plan) {
      Alert.alert(
        'Confirm Subscription',
        `Subscribe to ${plan.name} plan for ₹${plan.price}?\n\nYou'll be redirected to payment gateway.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Continue to Payment', 
            onPress: () => {
              Alert.alert('Payment', 'Payment gateway integration will be implemented here.');
            }
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Upgrade to Premium"
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Badge */}
        <View style={styles.premiumBadge}>
          <View style={styles.badgeIcon}>
            <Icon name="award" library="feather" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.premiumTitle}>Unlock Premium Features</Text>
          <Text style={styles.premiumSubtitle}>
            Find your perfect match faster with exclusive benefits
          </Text>
        </View>

        {/* Premium Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <View style={styles.plansContainer}>
            {premiumPlans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardSelected,
                  plan.isPopular && styles.planCardPopular,
                ]}
                onPress={() => setSelectedPlan(plan.id)}
              >
                {plan.isPopular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                  </View>
                )}
                {plan.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>{plan.discount}</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <View style={styles.radioButton}>
                    {selectedPlan === plan.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View style={styles.planInfo}>
                    <Text style={[
                      styles.planName,
                      selectedPlan === plan.id && styles.planNameSelected,
                    ]}>
                      {plan.name}
                    </Text>
                    <Text style={styles.planDuration}>{plan.duration}</Text>
                  </View>
                </View>
                <View style={styles.planPricing}>
                  <View style={styles.priceRow}>
                    <Text style={[
                      styles.planPrice,
                      selectedPlan === plan.id && styles.planPriceSelected,
                    ]}>
                      ₹{plan.price}
                    </Text>
                    {plan.originalPrice && (
                      <Text style={styles.planOriginalPrice}>₹{plan.originalPrice}</Text>
                    )}
                  </View>
                  {plan.savings && (
                    <Text style={styles.planSavings}>{plan.savings}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          <View style={styles.featuresCard}>
            {premiumFeatures.map((feature, index) => (
              <View
                key={index}
                style={[
                  styles.featureRow,
                  index !== premiumFeatures.length - 1 && styles.featureRowBorder,
                ]}
              >
                <View style={styles.featureIcon}>
                  <Icon
                    name={feature.icon}
                    library="feather"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <Icon
                  name="check"
                  library="feather"
                  size={20}
                  color={Colors.success}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustSection}>
          <View style={styles.trustItem}>
            <Icon name="shield" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.trustText}>Secure Payment</Text>
          </View>
          <View style={styles.trustItem}>
            <Icon name="rotate-ccw" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.trustText}>Cancel Anytime</Text>
          </View>
          <View style={styles.trustItem}>
            <Icon name="lock" library="feather" size={20} color={Colors.primary} />
            <Text style={styles.trustText}>Privacy Protected</Text>
          </View>
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
        >
          <Icon name="zap" library="feather" size={20} color={Colors.white} />
          <Text style={styles.subscribeButtonText}>
            Subscribe Now
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.termsText}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          Subscription will auto-renew unless cancelled 24 hours before the end of the period.
        </Text>
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
  premiumBadge: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundCard,
    marginBottom: Spacing.md,
  },
  badgeIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  premiumTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  premiumSubtitle: {
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
  plansContainer: {
    gap: Spacing.md,
  },
  planCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
    ...Shadows.sm,
  },
  planCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  planCardPopular: {
    borderColor: Colors.secondary,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: Spacing.md,
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  popularBadgeText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  discountBadgeText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  planNameSelected: {
    color: Colors.primary,
  },
  planDuration: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  planPricing: {
    alignItems: 'flex-start',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  planPrice: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  planPriceSelected: {
    color: Colors.primary,
  },
  planOriginalPrice: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  planSavings: {
    fontSize: Typography.fontSize.sm,
    color: Colors.success,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.xs,
  },
  featuresCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  featureRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  trustItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  trustText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  subscribeButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    ...Shadows.md,
  },
  subscribeButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  termsText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing['2xl'],
    lineHeight: Typography.fontSize.xs * 1.5,
  },
});
