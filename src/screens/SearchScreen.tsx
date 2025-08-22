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
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';
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

export const SearchScreen: React.FC = () => {
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

  const renderSearchResult = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity style={styles.gridItem}>
      <View style={styles.imageContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>{item.name.charAt(0)}</Text>
        </View>

        {/* Top badges */}
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Icon name="check" library="feather" size={8} color={Colors.white} />
          </View>
        )}
        <View style={styles.compatibilityBadge}>
          <Text style={styles.compatibilityText}>{item.compatibility}%</Text>
        </View>
      </View>

      {/* Content below image */}
      <View style={styles.profileContent}>
        <Text style={styles.profileName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.profileDetails}>{item.age} years • {item.profession}</Text>
        <Text style={styles.profileLocation} numberOfLines={1}>
          <Icon name="map-pin" library="feather" size={10} color={Colors.textSecondary} />
          {' '}{item.location.split(',')[0]}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="heart" library="feather" size={14} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="message-circle" library="feather" size={14} color={Colors.info} />
          </TouchableOpacity>
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
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>खोजें</Text>
        <Text style={styles.headerSubtitle}>Find Your Perfect Match</Text>
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
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
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
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xs, // Add horizontal spacing between cards
  },
  gridItem: {
    width: '48%', // Fixed width for consistent card sizes
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.backgroundCard,
  },
  compatibilityBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.info,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  compatibilityText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  profileContent: {
    padding: Spacing.md,
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: -20, // Pull up to overlap the image
  },
  profileName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  profileDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  profileLocation: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
