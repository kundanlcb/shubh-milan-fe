import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/styles';
import { Icon, AppIcons } from '../components/Icon';

// Mock search results data
const searchResults = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 25,
    location: 'Darbhanga, Bihar',
    profession: 'Teacher',
    education: 'M.A. Hindi Literature',
    height: "5'4\"",
    compatibility: 88,
    lastSeen: 'Online now',
    verified: true,
  },
  {
    id: '2',
    name: 'Anjali Mishra',
    age: 23,
    location: 'Muzaffarpur, Bihar',
    profession: 'Software Engineer',
    education: 'B.Tech Computer Science',
    height: "5'3\"",
    compatibility: 92,
    lastSeen: '2 hours ago',
    verified: true,
  },
  {
    id: '3',
    name: 'Kavita Jha',
    age: 27,
    location: 'Madhubani, Bihar',
    profession: 'Doctor',
    education: 'MBBS',
    height: "5'5\"",
    compatibility: 85,
    lastSeen: 'Yesterday',
    verified: false,
  },
  {
    id: '4',
    name: 'Rekha Singh',
    age: 26,
    location: 'Samastipur, Bihar',
    profession: 'Government Officer',
    education: 'M.A. Political Science',
    height: "5'2\"",
    compatibility: 79,
    lastSeen: '3 days ago',
    verified: true,
  },
];

const filterOptions = [
  { key: 'age', label: 'Age', iconConfig: AppIcons.age },
  { key: 'location', label: 'Location', iconConfig: AppIcons.location },
  { key: 'profession', label: 'Profession', iconConfig: AppIcons.profession },
  { key: 'education', label: 'Education', iconConfig: AppIcons.education },
  { key: 'height', label: 'Height', iconConfig: AppIcons.height },
  { key: 'religion', label: 'Religion', iconConfig: AppIcons.religion },
];

interface SearchScreenProps {
  navigation?: any;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (filterKey: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterKey)
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const handleUserProfilePress = (user: typeof searchResults[0]) => {
    if (navigation) {
      navigation.navigate('UserProfile', { userId: user.id });
    }
  };

  const renderSearchResult = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleUserProfilePress(item)}
      activeOpacity={0.7}
    >
      {/* Main content row - Profile pic + User info */}
      <View style={styles.mainContentRow}>
        <View style={styles.resultImageContainer}>
          <View style={styles.resultProfileImage}>
            <Text style={styles.resultProfileImageText}>{item.name.charAt(0)}</Text>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.resultContent}>
          <View style={styles.resultInfo}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultDetails}>{item.age} years • {item.profession}</Text>
            <Text style={styles.resultLocation}>
              <Icon name="map-pin" library="feather" size={12} color={Colors.textSecondary} />
              {' '}{item.location}
            </Text>
          </View>
        </View>
      </View>

      {/* Horizontal line separator */}
      <View style={styles.separator} />

      {/* Bottom badges row - completely independent */}
      <View style={styles.badgesRow}>
        <View style={styles.compatibilityInfo}>
          <Text style={styles.compatibilityText}>{item.compatibility}% Match</Text>
        </View>
        {item.verified && (
          <View style={styles.verifiedInfo}>
            <Icon name="check" library="feather" size={8} color="#16a34a" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
        <View style={styles.lastSeenInfo}>
          <Text style={styles.lastSeenText}>{item.lastSeen}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChip = ({ item }: { item: typeof filterOptions[0] }) => {
    const isSelected = selectedFilters.includes(item.key);

    return (
      <TouchableOpacity
        style={[
          styles.filterChip,
          isSelected && styles.activeFilterChip
        ]}
        onPress={() => toggleFilter(item.key)}
      >
        <Icon
          name={item.iconConfig.name}
          library={item.iconConfig.library}
          size={16}
          color={isSelected ? Colors.white : Colors.primary}
        />
        <Text style={[
          styles.filterText,
          isSelected && styles.activeFilterText
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>खोजें</Text>
          <Text style={styles.headerSubtitle}>Find Your Perfect Match</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="sliders" library="feather" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" library="feather" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, location, profession..."
            placeholderTextColor={Colors.inputPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Icon name="filter" library="feather" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      {showFilters && (
        <View style={styles.filterContainer}>
          <FlatList
            data={filterOptions}
            renderItem={renderFilterChip}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          />
        </View>
      )}

      {/* Results */}
      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    paddingVertical: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterContainer: {
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterList: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: Spacing.xs,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  activeFilterText: {
    color: Colors.white,
  },
  resultsList: {
    padding: Spacing.md,
  },
  resultItem: {
    flexDirection: 'column',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mainContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  resultProfileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultProfileImageText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  compatibilityInfo: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  compatibilityText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '500',
  },
  verifiedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  verifiedText: {
    fontSize: 11,
    color: '#16a34a',
    marginLeft: 3,
    fontWeight: '500',
  },
  lastSeenInfo: {
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.2)',
  },
  lastSeenText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  resultContent: {
    flex: 1,
    paddingVertical: Spacing.xs,
  },
  resultInfo: {
    // No changes needed - keeping existing margin
  },
  resultName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  resultDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  resultLocation: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultEducation: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
