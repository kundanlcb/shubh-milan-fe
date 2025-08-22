import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

interface HomeHeaderProps {
  userPreferences: {
    accountType: 'free' | 'premium';
  };
  onHeartPress: () => void;
  onChatPress: () => void;
  onAddPress: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  userPreferences,
  onHeartPress,
  onChatPress,
  onAddPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.appTitle}>शुभ मिलन</Text>
        <Text style={styles.subtitle}>
          {userPreferences.accountType === 'premium' ? 'Premium Member ⭐' : 'Filtered Feed'}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton} onPress={onHeartPress}>
          <Text style={styles.headerIcon}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={onChatPress}>
          <Text style={styles.headerIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={onAddPress}>
          <Text style={styles.headerIcon}>➕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  headerIcon: {
    fontSize: 24,
  },
});
