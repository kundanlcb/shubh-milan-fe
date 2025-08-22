import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';
import { Icon } from '../Icon';

interface HomeHeaderProps {
  userPreferences: {
    accountType: 'free' | 'premium';
    name: string;
  };
  onHeartPress: () => void;
  onChatPress: () => void;
  onAddPress: () => void;
  onFilterPress: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  userPreferences,
  onHeartPress,
  onChatPress,
  onAddPress,
  onFilterPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.greeting}>नमस्ते, {userPreferences.name}!</Text>
        <Text style={styles.subtitle}>
          {userPreferences.accountType === 'premium' ? 'Premium Member ⭐' : 'Filtered Feed'}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton} onPress={onHeartPress}>
          <Icon name="heart" library="feather" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onChatPress}>
          <Icon name="message-circle" library="feather" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onAddPress}>
          <Icon name="plus" library="feather" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onFilterPress}>
          <Icon name="filter" library="feather" size={20} color={Colors.primary} />
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
  greeting: {
    fontSize: 18,
    fontWeight: '600',
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
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});
