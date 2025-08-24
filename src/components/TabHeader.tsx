import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
import { Icon } from './Icon';

interface TabHeaderProps {
  title?: string;
  titleComponent?: React.ReactNode;
  actionIcon?: string;
  actionIconLibrary?: 'feather' | 'material' | 'material-community' | 'ionicons';
  onActionPress?: () => void;
  leftIcon?: string;
  leftIconLibrary?: 'feather' | 'material' | 'material-community' | 'ionicons';
  onLeftPress?: () => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({
  title,
  titleComponent,
  actionIcon = 'plus',
  actionIconLibrary = 'feather',
  onActionPress,
  leftIcon,
  leftIconLibrary = 'feather',
  onLeftPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {leftIcon && onLeftPress && (
          <TouchableOpacity style={styles.leftButton} onPress={onLeftPress}>
            <Icon name={leftIcon} library={leftIconLibrary} size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
        {titleComponent ? (
          titleComponent
        ) : (
          <Text style={styles.headerTitle}>{title}</Text>
        )}
      </View>
      {onActionPress && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
          <Icon name={actionIcon} library={actionIconLibrary} size={20} color={Colors.textInverse} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftButton: {
    marginRight: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
});
