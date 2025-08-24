import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/styles';
import { Icon, AppIcons } from '../components/Icon';
import { TabHeader } from '../components/TabHeader';

// Mock search results data
const searchResults = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://picsum.photos/200/200?random=1001',
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
    avatar: 'https://picsum.photos/200/200?random=1002',
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
    avatar: 'https://picsum.photos/200/200?random=1003',
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
    avatar: 'https://picsum.photos/200/200?random=1004',
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
            <Image
              source={{ uri: item.avatar }}
              style={styles.resultProfileImage}
              resizeMode="cover"
            />
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
      <TabHeader
        title="Search"
        actionIcon="search"
        onActionPress={() => setShowFilters(!showFilters)}
      />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
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
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
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
  searchInputWrapper: {
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
    flex: 1,
  },
  resultItem: {
    flexDirection: 'column',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  mainContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  resultProfileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultProfileImageText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
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
