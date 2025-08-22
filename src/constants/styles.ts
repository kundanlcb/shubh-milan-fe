import { StyleSheet, Platform } from 'react-native';
import { Colors } from './colors';

// Typography system
export const Typography = {
  // Font Families
  fontFamily: {
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
    light: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
    // For Hindi/Devanagari text
    hindi: Platform.OS === 'ios' ? 'Devanagari Sangam MN' : 'Noto Sans Devanagari',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font Weights - Fixed to use proper React Native values
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

// Spacing system
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

// Border radius system
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

// Shadow system
export const Shadows = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Global styles
export const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  // Layout styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  // Padding styles
  padding: {
    padding: Spacing.md,
  },

  paddingHorizontal: {
    paddingHorizontal: Spacing.md,
  },

  paddingVertical: {
    paddingVertical: Spacing.md,
  },

  // Margin styles
  margin: {
    margin: Spacing.md,
  },

  marginHorizontal: {
    marginHorizontal: Spacing.md,
  },

  marginVertical: {
    marginVertical: Spacing.md,
  },

  // Card styles
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.md,
  },

  cardWithoutShadow: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // Typography styles
  heading1: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamily.bold,
  },

  heading2: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamily.bold,
  },

  heading3: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamily.medium,
  },

  heading4: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamily.medium,
  },

  bodyText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
  },

  bodyTextSecondary: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
  },

  caption: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontFamily: Typography.fontFamily.regular,
  },

  // Hindi text styles
  hindiText: {
    fontFamily: Typography.fontFamily.hindi,
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
  },

  hindiHeading: {
    fontFamily: Typography.fontFamily.hindi,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },

  // Button styles
  button: {
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  buttonPrimary: {
    backgroundColor: Colors.buttonPrimary,
  },

  buttonSecondary: {
    backgroundColor: Colors.buttonSecondary,
  },

  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  buttonDisabled: {
    backgroundColor: Colors.buttonDisabled,
  },

  buttonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.buttonText,
    fontFamily: Typography.fontFamily.medium,
  },

  buttonTextSecondary: {
    color: Colors.buttonTextSecondary,
  },

  buttonTextOutline: {
    color: Colors.primary,
  },

  // Input styles
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
    color: Colors.inputText,
    backgroundColor: Colors.inputBackground,
    fontFamily: Typography.fontFamily.regular,
    minHeight: 48,
  },

  inputFocused: {
    borderColor: Colors.inputBorderFocused,
    borderWidth: 2,
  },

  inputError: {
    borderColor: Colors.error,
  },

  inputLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontFamily: Typography.fontFamily.medium,
    marginBottom: Spacing.xs,
  },

  inputHelper: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
  },

  inputErrorText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },

  // List styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },

  listItemLast: {
    borderBottomWidth: 0,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.sm,
  },

  // Status styles
  statusSuccess: {
    color: Colors.success,
  },

  statusWarning: {
    color: Colors.warning,
  },

  statusError: {
    color: Colors.error,
  },

  statusInfo: {
    color: Colors.info,
  },

  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayLight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlayLight,
  },
});

// Utility functions
export const createSpacing = (multiplier: number) => Spacing.md * multiplier;

export const createFontSize = (size: keyof typeof Typography.fontSize) =>
  Typography.fontSize[size];

export const createShadow = (elevation: keyof typeof Shadows) =>
  Shadows[elevation];

// Cultural/Traditional styles
export const CulturalStyles = StyleSheet.create({
  traditionalCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    ...Shadows.md,
  },

  auspiciousText: {
    color: Colors.auspicious,
    fontWeight: Typography.fontWeight.semibold,
  },

  sacredText: {
    color: Colors.sacred,
    fontWeight: Typography.fontWeight.bold,
  },

  biodata: {
    backgroundColor: Colors.pure,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
  },

  culturalBorder: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'solid',
  },
});

export { Colors };
