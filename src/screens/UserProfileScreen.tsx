import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/styles';
import { Icon } from '../components/Icon';
import { PostCard } from '../components/home/PostCard';
import { allUsers, PostData } from '../utils/homeData';

const { width } = Dimensions.get('window');

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

  const calculateAge = (age: number) => age;
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" library="feather" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{user.name}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more-vertical" library="feather" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileImageText}>{user.avatar}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Icon name="check" library="feather" size={16} color="white" />
            </View>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userLocation}>📍 {user.location}</Text>

          {/* Compatibility Score */}
          <View style={styles.compatibilityContainer}>
            <Text style={styles.compatibilityScore}>{getCompatibilityScore()}% Match</Text>
            <Text style={styles.compatibilityText}>High Compatibility</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.followButton,
                followStatus === 'following' && styles.followingButton,
                followStatus === 'requested' && styles.requestedButton
              ]}
              onPress={handleFollow}
            >
              <Text style={[styles.actionButtonText,
                followStatus === 'following' && styles.followingButtonText,
                followStatus === 'requested' && styles.requestedButtonText
              ]}>
                {followStatus === 'follow' ? 'Send Interest' :
                 followStatus === 'following' ? 'Following' : 'Interest Sent'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.messageButton]} onPress={handleMessage}>
              <Icon name="message-circle" library="feather" size={18} color="white" />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={handleCall}>
              <Icon name="phone" library="feather" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userPosts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2.5K</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89%</Text>
              <Text style={styles.statLabel}>Response Rate</Text>
            </View>
          </View>
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
              userPosts.map((post, index) => (
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
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  compatibilityContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  compatibilityScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  compatibilityText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  followButton: {
    backgroundColor: Colors.primary,
  },
  followingButton: {
    backgroundColor: '#E0E0E0',
  },
  requestedButton: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  messageButton: {
    backgroundColor: '#2196F3',
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  followingButtonText: {
    color: '#666',
  },
  requestedButtonText: {
    color: '#FF9800',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
});
