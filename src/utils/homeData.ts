// Enhanced mock data with detailed user profiles for filtering
export const allUsers = [
  {
    id: '1',
    user: {
      name: 'Priya Sharma',
      avatar: 'PS',
      location: 'Darbhanga',
      age: 25,
      profession: 'Teacher',
      religion: 'Hindu',
      education: 'Bachelor\'s Degree',
    },
    image: 'https://via.placeholder.com/400x300',
    caption: 'Family celebration during Chhath Puja! 🙏 Looking for someone special to share life\'s beautiful moments.',
    likes: 24,
    comments: 8,
    timeAgo: '2h',
    isLiked: false,
  },
  {
    id: '2',
    user: {
      name: 'Anjali Mishra',
      avatar: 'AM',
      location: 'Muzaffarpur',
      age: 23,
      profession: 'Software Engineer',
      religion: 'Hindu',
      education: 'Master\'s Degree',
    },
    image: 'https://via.placeholder.com/400x400',
    caption: 'Enjoying traditional Mithila art workshop with family. Art brings people together! 🎨',
    likes: 42,
    comments: 15,
    timeAgo: '4h',
    isLiked: true,
  },
  {
    id: '3',
    user: {
      name: 'Kavita Jha',
      avatar: 'KJ',
      location: 'Madhubani',
      age: 27,
      profession: 'Doctor',
      religion: 'Hindu',
      education: 'PhD',
    },
    image: 'https://via.placeholder.com/400x350',
    caption: 'Weekend family picnic at Janakpur. Life is beautiful with loved ones! 🌿',
    likes: 31,
    comments: 12,
    timeAgo: '6h',
    isLiked: false,
  },
  {
    id: '4',
    user: {
      name: 'Rohit Kumar',
      avatar: 'RK',
      location: 'Saharsa',
      age: 29,
      profession: 'Business Owner',
      religion: 'Hindu',
      education: 'Bachelor\'s Degree',
    },
    image: 'https://via.placeholder.com/400x320',
    caption: 'Started my own business this year! Family support means everything. 💼',
    likes: 18,
    comments: 6,
    timeAgo: '8h',
    isLiked: false,
  },
];

// User preferences from registration (normally from backend/storage)
export const currentUserPreferences = {
  partnerAgeMin: 22,
  partnerAgeMax: 30,
  partnerProfession: ['Teacher', 'Software Engineer', 'Doctor'],
  partnerLocation: ['Darbhanga', 'Muzaffarpur', 'Madhubani'],
  partnerReligion: 'Hindu',
  accountType: 'free' as 'free' | 'premium',
};

// Filter posts based on user preferences
export const filterPostsByPreferences = (posts: typeof allUsers, preferences: typeof currentUserPreferences) => {
  return posts.filter(post => {
    const user = post.user;

    // Age filter
    if (user.age < preferences.partnerAgeMin || user.age > preferences.partnerAgeMax) {
      return false;
    }

    // Profession filter (if specified)
    if (preferences.partnerProfession.length > 0 && !preferences.partnerProfession.includes(user.profession)) {
      return false;
    }

    // Location filter (if specified)
    if (preferences.partnerLocation.length > 0 && !preferences.partnerLocation.includes(user.location)) {
      return false;
    }

    // Religion filter (if specified)
    if (preferences.partnerReligion && user.religion !== preferences.partnerReligion) {
      return false;
    }

    return true;
  });
};

export type PostUser = typeof allUsers[0]['user'];
export type PostData = typeof allUsers[0];
export type UserPreferences = typeof currentUserPreferences;
