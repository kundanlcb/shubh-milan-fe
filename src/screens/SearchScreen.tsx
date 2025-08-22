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
import { Colors, GlobalStyles, Typography, Spacing, BorderRadius, Shadows } from '../constants/styles';

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
  { key: 'age', label: 'Age', icon: '🎂' },
  { key: 'location', label: 'Location', icon: '📍' },
  { key: 'profession', label: 'Profession', icon: '💼' },
  { key: 'education', label: 'Education', icon: '🎓' },
  { key: 'height', label: 'Height', icon: '📏' },
  { key: 'religion', label: 'Religion', icon: '🕉️' },
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
    <TouchableOpacity style={styles.resultCard}>
      <View style={styles.cardHeader}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileImageText}>{item.name.charAt(0)}</Text>
          </View>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          )}
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.profileName}>{item.name}</Text>
            <View style={[
              styles.compatibilityChip,
              item.compatibility > 85 && styles.highCompatibility
            ]}>
              <Text style={styles.compatibilityText}>{item.compatibility}%</Text>
            </View>
          </View>
          <Text style={styles.profileAge}>{item.age} years • {item.height}</Text>
          <Text style={styles.profileLocation}>{item.location}</Text>
          <Text style={styles.profileProfession}>{item.profession}</Text>
          <Text style={styles.profileEducation}>{item.education}</Text>
          <Text style={styles.lastSeen}>{item.lastSeen}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.interestButton}>
          <Text style={styles.interestIcon}>💝</Text>
          <Text style={styles.actionButtonText}>Interest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageIcon}>💬</Text>
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortlistButton}>
          <Text style={styles.shortlistIcon}>⭐</Text>
          <Text style={styles.actionButtonText}>Shortlist</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChip = ({ item }: { item: typeof filterOptions[0] }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        selectedFilters.includes(item.key) && styles.activeFilterChip
      ]}
      onPress={() => toggleFilter(item.key)}
    >
      <Text style={styles.filterIcon}>{item.icon}</Text>
      <Text style={[
        styles.filterText,
        selectedFilters.includes(item.key) && styles.activeFilterText
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>खोजें</Text>
        <Text style={styles.headerSubtitle}>Find Your Perfect Match</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, location, profession..."
          placeholderTextColor={Colors.inputPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterToggle}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterToggleIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <FlatList
            data={filterOptions}
            renderItem={renderFilterChip}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={() => setSelectedFilters([])}
          >
            <Text style={styles.clearFiltersText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Quick Search Options */}
      <View style={styles.quickSearchContainer}>
        <Text style={styles.quickSearchTitle}>Quick Search</Text>
        <View style={styles.quickSearchGrid}>
          <TouchableOpacity style={styles.quickSearchItem}>
            <Text style={styles.quickSearchIcon}>📍</Text>
            <Text style={styles.quickSearchText}>Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickSearchItem}>
            <Text style={styles.quickSearchIcon}>🎓</Text>
            <Text style={styles.quickSearchText}>Highly Educated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickSearchItem}>
            <Text style={styles.quickSearchIcon}>⭐</Text>
            <Text style={styles.quickSearchText}>Top Matches</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickSearchItem}>
            <Text style={styles.quickSearchIcon}>🌟</Text>
            <Text style={styles.quickSearchText}>Recently Joined</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{searchResults.length} matches found</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by Compatibility</Text>
          <Text style={styles.sortIcon}>↕️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item.id}
        style={styles.resultsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsContainer}
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    fontFamily: Typography.fontFamily.hindi,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  searchInput: {
    ...GlobalStyles.input,
    flex: 1,
    marginBottom: 0,
  },
  filterToggle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterToggleIcon: {
    fontSize: 18,
  },
  filtersContainer: {
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    marginBottom: Spacing.md,
  },
  filtersList: {
    paddingHorizontal: Spacing.md,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  filterText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
  },
  activeFilterText: {
    color: Colors.textInverse,
  },
  clearFiltersButton: {
    alignSelf: 'center',
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  clearFiltersText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  quickSearchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  quickSearchTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  quickSearchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickSearchItem: {
    width: '47%',
    backgroundColor: Colors.backgroundCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  quickSearchIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  quickSearchText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  resultsCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sortText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  sortIcon: {
    fontSize: 12,
  },
  resultsList: {
    flex: 1,
  },
  resultsContainer: {
    paddingHorizontal: Spacing.md,
  },
  resultCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textInverse,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.backgroundCard,
  },
  verifiedIcon: {
    fontSize: 12,
    color: Colors.textInverse,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  profileName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    flex: 1,
  },
  compatibilityChip: {
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  highCompatibility: {
    backgroundColor: Colors.success,
  },
  compatibilityText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textInverse,
  },
  profileAge: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  profileLocation: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  profileProfession: {
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 2,
  },
  profileEducation: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: Typography.fontSize.xs,
    color: Colors.success,
    fontWeight: Typography.fontWeight.medium,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  interestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  shortlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  interestIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  messageIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  shortlistIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  actionButtonText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textInverse,
  },
});
