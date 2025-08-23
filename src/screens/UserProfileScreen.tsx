import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/styles';
import { Icon } from '../components/Icon';
import { PostCard } from '../components/home/PostCard';
import { allUsers } from '../utils/homeData';

interface UserProfileScreenProps {
  navigation: any;
  route: {
    params: {
      userId: string;
    };
  };
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ navigation, route }) => {
  const { userId } = route.params;

  // Find user and their posts
  const userPosts = allUsers.filter(post => post.user.name.includes(userId) || post.id === userId);
  const user = userPosts.length > 0 ? userPosts[0].user : null;

  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [followStatus, setFollowStatus] = useState<'follow' | 'following' | 'requested'>('follow');

  if (!user) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaHeader} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" library="feather" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile Not Found</Text>
          </View>
        </SafeAreaView>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User profile not found</Text>
        </View>
      </View>
    );
  }

  const handleFollow = () => {
    if (followStatus === 'follow') {
      setFollowStatus('requested');
      Alert.alert('Interest Sent!', `Your interest has been sent to ${user.name}. They will be notified.`);
    } else if (followStatus === 'following') {
      setFollowStatus('follow');
    }
  };

  const handleMessage = () => {
    Alert.alert(
      'Premium Feature 🌟',
      'Upgrade to Premium to send direct messages!\n\n✓ Unlimited messaging\n✓ View contact details\n✓ Priority in search results',
      [
        { text: 'Upgrade Now', onPress: () => console.log('Show upgrade options') },
        { text: 'Send Interest Instead', onPress: handleFollow },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleCall = () => {
    Alert.alert(
      'Premium Feature 🌟',
      'Upgrade to Premium to view contact details and make calls!\n\n✓ Phone numbers\n✓ Email addresses\n✓ Direct contact access',
      [
        { text: 'Upgrade Now', onPress: () => console.log('Show upgrade options') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const formatSalary = (salary: number) => {
    const lpa = salary / 100000;
    return `${lpa.toFixed(1)} LPA`;
  };

  const getCompatibilityScore = () => Math.floor(Math.random() * 20) + 80;

  return (
    <View style={styles.fullScreenContainer}>
      {/* Header */}
      <SafeAreaView style={styles.safeAreaHeader} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" library="feather" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.compatibilityBadgeHeader}>
              <Icon name="star" library="feather" size={16} color={Colors.primary} />
              <Text style={styles.compatibilityTextHeader}>{getCompatibilityScore()}%</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Icon name="more-vertical" library="feather" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Modern Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Header with Image and Basic Info */}
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileImageText}>{user.avatar}</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Icon name="check" library="feather" size={12} color="white" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userAge}>{user.age} years • {user.profession}</Text>
              <View style={styles.locationContainer}>
                <Icon name="map-pin" library="feather" size={14} color="#666" />
                <Text style={styles.userLocation}>{user.location}</Text>
              </View>
            </View>
          </View>

          {/* Action Row - Big follow button with chat and call icons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.followButton,
                followStatus === 'following' && styles.followButtonFollowing,
                followStatus === 'requested' && styles.followButtonRequested
              ]}
              onPress={handleFollow}
            >
              <Icon
                name={followStatus === 'follow' ? 'heart' : followStatus === 'following' ? 'check' : 'clock'}
                library="feather"
                size={20}
                color={followStatus === 'follow' ? Colors.primary : followStatus === 'following' ? '#4CAF50' : '#FF9800'}
              />
              <Text style={[styles.followButtonText,
                followStatus === 'following' && styles.followButtonTextFollowing,
                followStatus === 'requested' && styles.followButtonTextRequested
              ]}>
                {followStatus === 'follow' ? 'Send Interest' : followStatus === 'following' ? 'Following' : 'Interest Sent'}
              </Text>
            </TouchableOpacity>

            <View style={styles.compactIconsRow}>
              <TouchableOpacity style={styles.compactIcon} onPress={handleMessage}>
                <Icon name="message-circle" library="feather" size={24} color={Colors.primary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.compactIcon} onPress={handleCall}>
                <Icon name="phone" library="feather" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Cards - Redesigned with better proportions */}
          {/* <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userPosts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2.5K</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>89%</Text>
              <Text style={styles.statLabel}>Response</Text>
            </View>
          </View> */}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Posts ({userPosts.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'posts' ? (
          <View style={styles.postsContainer}>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userPreferences={{ accountType: 'free' }}
                  onLike={(postId) => console.log('Like post:', postId)}
                  onProfile={() => {}}
                  onContactRequest={() => handleMessage()}
                  onComment={() => handleMessage()}
                  onShare={(postId) => console.log('Share post:', postId)}
                  onSave={() => console.log('Save post')}
                />
              ))
            ) : (
              <View style={styles.emptyPostsContainer}>
                <Icon name="image" library="feather" size={48} color="#ccc" />
                <Text style={styles.emptyPostsText}>No posts yet</Text>
                <Text style={styles.emptyPostsSubtext}>When {user.name} shares photos, they'll appear here.</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.aboutContainer}>
            {/* Basic Info */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Icon name="calendar" library="feather" size={20} color={Colors.primary} />
                  <Text style={styles.infoLabel}>Age</Text>
                  <Text style={styles.infoValue}>{user.age} years</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="briefcase" library="feather" size={20} color={Colors.primary} />
                  <Text style={styles.infoLabel}>Profession</Text>
                  <Text style={styles.infoValue}>{user.profession}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="map-pin" library="feather" size={20} color={Colors.primary} />
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>{user.location}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="book" library="feather" size={20} color={Colors.primary} />
                  <Text style={styles.infoLabel}>Education</Text>
                  <Text style={styles.infoValue}>{user.education}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="heart" library="feather" size={20} color={Colors.primary} />
                  <Text style={styles.infoLabel}>Religion</Text>
                  <Text style={styles.infoValue}>{user.religion}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="user" library="feather" size={20} color={Colors.primary} />
                  <Text style={styles.infoLabel}>Gender</Text>
                  <Text style={styles.infoValue}>{user.gender}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="dollar-sign" library="feather" size={20} color={Colors.primary} />
                  <Text style={styles.infoLabel}>Salary</Text>
                  <Text style={styles.infoValue}>{formatSalary(user.salary)}</Text>
                </View>
              </View>
            </View>

            {/* Contact Note */}
            <View style={styles.contactNote}>
              <Icon name="lock" library="feather" size={20} color="#999" />
              <Text style={styles.contactNoteText}>
                Contact details are only visible to Premium members. Upgrade to view phone number and email address.
              </Text>
            </View>

            {/* Family & Lifestyle (Coming Soon) */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Family & Lifestyle</Text>
              <View style={styles.comingSoon}>
                <Icon name="clock" library="feather" size={24} color="#ccc" />
                <Text style={styles.comingSoonText}>Coming Soon</Text>
                <Text style={styles.comingSoonSubtext}>Family details, lifestyle preferences, and more will be available here.</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeAreaHeader: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  moreButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: 'white',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userAge: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  compatibilityBadgeProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  compatibilityTextProfile: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 6,
  },
  followButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#F1F1F1',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 8,
  },
  followButtonFollowing: {
    backgroundColor: '#F1F1F1',
    borderColor: '#4CAF50',
  },
  followButtonRequested: {
    backgroundColor: '#F1F1F1',
    borderColor: '#FF9800',
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 8,
  },
  followButtonTextFollowing: {
    color: '#4CAF50',
  },
  followButtonTextRequested: {
    color: '#FF9800',
  },
  compactIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactIcon: {
    padding: 8,
    borderRadius: 24,
    marginLeft: 8,
    backgroundColor: '#F1F1F1',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 24,
  },
  statLabel: {
    fontSize: 11,
    color: '#777',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 13,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  postsContainer: {
    backgroundColor: Colors.background,
  },
  emptyPostsContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyPostsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyPostsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  aboutContainer: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
  },
  infoSection: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  contactNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  contactNoteText: {
    flex: 1,
    fontSize: 14,
    color: '#F57F17',
    marginLeft: 12,
    lineHeight: 20,
  },
  comingSoon: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  comingSoonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginBottom: 8,
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: Colors.background,
    zIndex: 1000,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInterestButton: {
    padding: 8,
    borderRadius: 24,
    marginRight: 8,
  },
  headerFollowingButton: {
    backgroundColor: '#E0E0E0',
  },
  headerRequestedButton: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatibilityBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  compatibilityTextHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 4,
  },
});
