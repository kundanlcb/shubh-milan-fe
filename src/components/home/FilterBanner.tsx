import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants/styles';
import { Icon } from '../Icon';

interface FilterBannerProps {
  postsCount: number;
  preferences: {
    ageRange: string;
    location: string[];
    profession: string[];
  };
}

export const FilterBanner: React.FC<FilterBannerProps> = ({ postsCount, preferences }) => {
  return (
    <View style={styles.banner}>
      <View style={styles.bannerContent}>
        <Icon name="map-pin" library="feather" size={16} color={Colors.primary} />
        <Text style={styles.bannerText}>
          Showing {postsCount} profiles matching your preferences: {' '}
          Age {preferences.ageRange}, {preferences.location.join(', ')}, {preferences.profession.join(', ')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    margin: 16,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    marginLeft: 8,
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
  },
});
