// Mithila-inspired color palette
export const Colors = {
  // Primary Colors - Inspired by traditional Mithila art
  primary: '#D32F2F', // Deep red - traditional Mithila color
  primaryLight: '#FF6659',
  primaryDark: '#9A0007',

  // Secondary Colors
  secondary: '#FF9800', // Golden orange - auspicious color
  secondaryLight: '#FFCC02',
  secondaryDark: '#C66900',

  // Accent Colors
  accent: '#4CAF50', // Green - prosperity color
  accentLight: '#80E27E',
  accentDark: '#087F23',

  // Traditional Mithila Colors
  madhubani: {
    red: '#C62828',
    orange: '#FF8F00',
    yellow: '#FBC02D',
    green: '#388E3C',
    blue: '#1976D2',
    black: '#212121',
  },

  // Background Colors
  background: '#FAFAFA',
  backgroundSecondary: '#F5F5F5',
  backgroundCard: '#FFFFFF',

  // Text Colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  textInverse: '#FFFFFF',
  white: '#FFFFFF', // Added missing white color

  // UI Colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  divider: '#EEEEEE',
  shadow: '#000000',

  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  errorLight: '#FFCDD2', // Added missing errorLight color
  info: '#2196F3',

  // Button Colors
  buttonPrimary: '#D32F2F',
  buttonSecondary: '#FF9800',
  buttonDisabled: '#BDBDBD',
  buttonText: '#FFFFFF',
  buttonTextSecondary: '#212121',

  // Input Colors
  inputBackground: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputPlaceholder: '#9E9E9E',
  inputFocus: '#D32F2F',

  // Card and Surface Colors
  cardShadow: 'rgba(0, 0, 0, 0.1)',
} as const;

// Color utilities
export const getColorWithOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

export default Colors;
