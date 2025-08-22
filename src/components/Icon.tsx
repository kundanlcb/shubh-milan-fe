import React from 'react';
import { StyleProp, ViewStyle, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/colors';

type IconLibrary = 'feather' | 'material' | 'material-community' | 'ionicons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  library?: IconLibrary;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = Colors.textPrimary,
  library = 'feather',
  style,
}) => {
  const iconProps = {
    name,
    size,
    color,
    style,
  };

  try {
    switch (library) {
      case 'material':
        return <MaterialIcon {...iconProps} />;
      case 'material-community':
        return <MaterialCommunityIcon {...iconProps} />;
      case 'ionicons':
        return <IonIcon {...iconProps} />;
      case 'feather':
      default:
        return <FeatherIcon {...iconProps} />;
    }
  } catch (error) {
    // Fallback to text if vector icons fail to render
    console.warn('Vector icon failed to render, using fallback:', error);
    return (
      <Text style={[{ fontSize: size, color }, style]}>
        {getIconFallback(name)}
      </Text>
    );
  }
};

// Fallback emoji icons for when vector icons don't load
const getIconFallback = (iconName: string): string => {
  const fallbackMap: { [key: string]: string } = {
    // Tab icons
    'home': '🏠',
    'search': '🔍',
    'message-circle': '💬',
    'user': '👤',

    // Action icons
    'heart': '❤️',
    'share-2': '📤',
    'star': '⭐',
    'edit-2': '✏️',
    'settings': '⚙️',
    'log-out': '🚪',

    // Profile icons
    'user-circle': '👤',
    'users': '👥',
    'briefcase': '💼',
    'book-open': '📖',
    'coffee': '☕',
    'phone': '📞',

    // Filter icons
    'calendar': '📅',
    'map-pin': '📍',
    'graduation-cap': '🎓',
    'trending-up': '📈',

    // Common icons
    'check': '✓',
    'plus': '+',
    'filter': '🔽',
    'mail': '✉️',
    'eye': '👁',
    'chevron-right': '→',
    'arrow-left': '←',
    'more-horizontal': '⋯',
  };

  return fallbackMap[iconName] || '•';
};

// Modern icon mappings for different app sections
export const AppIcons = {
  // Tab Navigation Icons
  home: { name: 'home', library: 'feather' as IconLibrary },
  homeActive: { name: 'home', library: 'feather' as IconLibrary },
  search: { name: 'search', library: 'feather' as IconLibrary },
  searchActive: { name: 'search', library: 'feather' as IconLibrary },
  chat: { name: 'message-circle', library: 'feather' as IconLibrary },
  chatActive: { name: 'message-circle', library: 'feather' as IconLibrary },
  profile: { name: 'user', library: 'feather' as IconLibrary },
  profileActive: { name: 'user', library: 'feather' as IconLibrary },

  // Search Filter Icons
  age: { name: 'calendar', library: 'feather' as IconLibrary },
  location: { name: 'map-pin', library: 'feather' as IconLibrary },
  profession: { name: 'briefcase', library: 'feather' as IconLibrary },
  education: { name: 'book-open', library: 'feather' as IconLibrary },
  height: { name: 'trending-up', library: 'feather' as IconLibrary },
  religion: { name: 'heart', library: 'feather' as IconLibrary },

  // Profile Section Icons
  personalInfo: { name: 'user-circle', library: 'feather' as IconLibrary },
  family: { name: 'users', library: 'feather' as IconLibrary },
  educationCareer: { name: 'graduation-cap', library: 'feather' as IconLibrary },
  lifestyle: { name: 'coffee', library: 'feather' as IconLibrary },
  horoscope: { name: 'star', library: 'feather' as IconLibrary },
  contact: { name: 'phone', library: 'feather' as IconLibrary },

  // Common Action Icons
  edit: { name: 'edit-2', library: 'feather' as IconLibrary },
  settings: { name: 'settings', library: 'feather' as IconLibrary },
  logout: { name: 'log-out', library: 'feather' as IconLibrary },
  back: { name: 'arrow-left', library: 'feather' as IconLibrary },
  filter: { name: 'filter', library: 'feather' as IconLibrary },
  sort: { name: 'sort', library: 'feather' as IconLibrary },
  like: { name: 'heart', library: 'feather' as IconLibrary },
  liked: { name: 'heart', library: 'feather' as IconLibrary },
  share: { name: 'share-2', library: 'feather' as IconLibrary },
  more: { name: 'more-horizontal', library: 'feather' as IconLibrary },
};
