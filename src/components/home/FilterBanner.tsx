import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FilterBannerProps {
  postsCount: number;
  userPreferences: {
    partnerAgeMin: number;
    partnerAgeMax: number;
    partnerLocation: string[];
  };
}

export const FilterBanner: React.FC<FilterBannerProps> = ({
  postsCount,
  userPreferences,
}) => {
  return (
    <View style={styles.filterBanner}>
      <Text style={styles.filterText}>
        📍 Showing {postsCount} profiles matching your preferences: {' '}
        {userPreferences.partnerAgeMin}-{userPreferences.partnerAgeMax} years, {' '}
        {userPreferences.partnerLocation.join(', ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBanner: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: '#2E7D32',
  },
});
