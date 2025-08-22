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
    <TouchableOpacity style={styles.resultCard}>
      <View style={styles.cardHeader}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileImageText}>{item.name.charAt(0)}</Text>
          </View>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Icon name="check" library="feather" size={12} color={Colors.white} />
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
          <Icon name="heart" library="feather" size={16} color={Colors.primary} />
          <Text style={styles.actionButtonText}>Interest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Icon name="message-circle" library="feather" size={16} color={Colors.info} />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortlistButton}>
          <Icon name="star" library="feather" size={16} color={Colors.warning} />
          <Text style={styles.actionButtonText}>Shortlist</Text>
        </TouchableOpacity>
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
    <SafeAreaView style={styles.container}>
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
  resultCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
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
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
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
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.backgroundCard,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  profileName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  compatibilityChip: {
    backgroundColor: Colors.info,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  highCompatibility: {
    backgroundColor: Colors.success,
  },
  compatibilityText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  profileAge: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  profileLocation: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  profileProfession: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  profileEducation: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  lastSeen: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  shortlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  actionButtonText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
});
