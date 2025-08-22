import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

interface EmptyStateProps {
  onAdjustPreferences: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAdjustPreferences }) => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No matches found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your preferences to see more profiles
      </Text>
      <TouchableOpacity style={styles.adjustButton} onPress={onAdjustPreferences}>
        <Text style={styles.adjustButtonText}>Adjust Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  adjustButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  adjustButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
