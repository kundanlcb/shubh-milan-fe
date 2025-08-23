// Enhanced mock data with detailed user profiles for filtering
export const allUsers = [
  {
    id: '1',
    user: {
      name: 'Priya Sharma',
      avatar: 'https://picsum.photos/200/200?random=1001',
      location: 'Darbhanga',
      age: 25,
      profession: 'Teacher',
      religion: 'Hindu',
      gender: 'Female',
      salary: 400000, // Annual salary in INR
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '1-1', uri: 'https://picsum.photos/400/300?random=1', type: 'image' as const },
      { id: '1-2', uri: 'https://picsum.photos/400/300?random=11', type: 'image' as const },
      { id: '1-3', uri: 'https://picsum.photos/400/300?random=21', type: 'video' as const },
      { id: '1-4', uri: 'https://picsum.photos/400/300?random=101', type: 'image' as const },
    ],
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
      avatar: 'https://picsum.photos/200/200?random=1002',
      location: 'Muzaffarpur',
      age: 23,
      profession: 'Software Engineer',
      religion: 'Hindu',
      gender: 'Female',
      salary: 1200000,
      education: 'Master\'s Degree',
    },
    media: [
      { id: '2-1', uri: 'https://picsum.photos/400/400?random=2', type: 'image' as const },
    ],
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
      avatar: 'https://picsum.photos/200/200?random=1003',
      location: 'Madhubani',
      age: 27,
      profession: 'Doctor',
      religion: 'Hindu',
      gender: 'Female',
      salary: 800000,
      education: 'PhD',
    },
    media: [
      { id: '3-1', uri: 'https://picsum.photos/400/350?random=3', type: 'image' as const },
      { id: '3-2', uri: 'https://picsum.photos/400/350?random=103', type: 'image' as const },
      { id: '3-3', uri: 'https://picsum.photos/400/350?random=203', type: 'video' as const },
      { id: '3-4', uri: 'https://picsum.photos/400/350?random=303', type: 'image' as const },
      { id: '3-5', uri: 'https://picsum.photos/400/350?random=403', type: 'image' as const },
    ],
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
      avatar: 'https://picsum.photos/200/200?random=1004',
      location: 'Saharsa',
      age: 29,
      profession: 'Business Owner',
      religion: 'Hindu',
      gender: 'Male',
      salary: 1500000,
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '4-1', uri: 'https://picsum.photos/400/320?random=4', type: 'image' as const },
      { id: '4-2', uri: 'https://picsum.photos/400/320?random=14', type: 'video' as const },
      { id: '4-3', uri: 'https://picsum.photos/400/320?random=24', type: 'image' as const },
    ],
    caption: 'Started my own business this year! Family support means everything. 💼',
    likes: 18,
    comments: 6,
    timeAgo: '8h',
    isLiked: false,
  },
  {
    id: '5',
    user: {
      name: 'Sunita Thakur',
      avatar: 'https://picsum.photos/200/200?random=1005',
      location: 'Sitamarhi',
      age: 26,
      profession: 'Nurse',
      religion: 'Hindu',
      gender: 'Female',
      salary: 600000,
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '5-1', uri: 'https://picsum.photos/400/380?random=5', type: 'image' as const },
      { id: '5-2', uri: 'https://picsum.photos/400/380?random=15', type: 'video' as const },
      { id: '5-3', uri: 'https://picsum.photos/400/380?random=105', type: 'image' as const },
      { id: '5-4', uri: 'https://picsum.photos/400/380?random=205', type: 'image' as const },
      { id: '5-5', uri: 'https://picsum.photos/400/380?random=305', type: 'image' as const },
    ],
    caption: 'Serving patients brings me joy. Looking for a caring life partner who values compassion. 🩺',
    likes: 35,
    comments: 11,
    timeAgo: '10h',
    isLiked: false,
  },
  {
    id: '6',
    user: {
      name: 'Deepak Singh',
      avatar: 'https://picsum.photos/200/200?random=1006',
      location: 'Begusarai',
      age: 28,
      profession: 'Government Officer',
      religion: 'Hindu',
      gender: 'Male',
      salary: 700000,
      education: 'Master\'s Degree',
    },
    media: [
      { id: '6-1', uri: 'https://picsum.photos/400/360?random=6', type: 'image' as const },
      { id: '6-2', uri: 'https://picsum.photos/400/360?random=16', type: 'video' as const },
    ],
    caption: 'Building bridges and dreams! Family values are important to me. 🏗️',
    likes: 27,
    comments: 9,
    timeAgo: '12h',
    isLiked: true,
  },
  {
    id: '7',
    user: {
      name: 'Rekha Yadav',
      avatar: 'https://picsum.photos/200/200?random=1007',
      location: 'Purnia',
      age: 24,
      profession: 'Student',
      religion: 'Hindu',
      gender: 'Female',
      salary: 0,
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '7-1', uri: 'https://picsum.photos/400/340?random=7', type: 'image' as const },
      { id: '7-2', uri: 'https://picsum.photos/400/340?random=107', type: 'image' as const },
      { id: '7-3', uri: 'https://picsum.photos/400/340?random=207', type: 'image' as const },
      { id: '7-4', uri: 'https://picsum.photos/400/340?random=307', type: 'video' as const },
    ],
    caption: 'Teaching children is my passion. Seeking someone who values education and family. 📚',
    likes: 41,
    comments: 16,
    timeAgo: '14h',
    isLiked: false,
  },
  {
    id: '8',
    user: {
      name: 'Vikash Prasad',
      avatar: 'https://picsum.photos/200/200?random=1008',
      location: 'Araria',
      age: 30,
      profession: 'Engineer',
      religion: 'Hindu',
      gender: 'Male',
      salary: 900000,
      education: 'Master\'s Degree',
    },
    media: [
      { id: '8-1', uri: 'https://picsum.photos/400/320?random=8', type: 'image' as const },
    ],
    caption: 'Code, family, and traditions - that\'s my life! Looking for my coding partner in life. 💻',
    likes: 33,
    comments: 14,
    timeAgo: '16h',
    isLiked: true,
  },
  {
    id: '9',
    user: {
      name: 'Meera Kumari',
      avatar: 'https://picsum.photos/200/200?random=1009',
      location: 'Katihar',
      age: 22,
      profession: 'Teacher',
      religion: 'Hindu',
      gender: 'Female',
      salary: 350000,
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '9-1', uri: 'https://picsum.photos/400/370?random=9', type: 'image' as const },
      { id: '9-2', uri: 'https://picsum.photos/400/370?random=19', type: 'image' as const },
      { id: '9-3', uri: 'https://picsum.photos/400/370?random=109', type: 'video' as const },
    ],
    caption: 'Healing hearts and souls. Family gatherings are my favorite time! ❤️',
    likes: 48,
    comments: 20,
    timeAgo: '18h',
    isLiked: false,
  },
  {
    id: '10',
    user: {
      name: 'Amit Jha',
      avatar: 'https://picsum.photos/200/200?random=1010',
      location: 'Kishanganj',
      age: 27,
      profession: 'Business Owner',
      religion: 'Hindu',
      gender: 'Male',
      salary: 1100000,
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '10-1', uri: 'https://picsum.photos/400/330?random=10', type: 'image' as const },
      { id: '10-2', uri: 'https://picsum.photos/400/330?random=110', type: 'image' as const },
      { id: '10-3', uri: 'https://picsum.photos/400/330?random=210', type: 'image' as const },
      { id: '10-4', uri: 'https://picsum.photos/400/330?random=310', type: 'image' as const },
      { id: '10-5', uri: 'https://picsum.photos/400/330?random=410', type: 'video' as const },
    ],
    caption: 'Financial stability and family values go hand in hand. 🏦',
    likes: 22,
    comments: 7,
    timeAgo: '20h',
    isLiked: false,
  },
  {
    id: '11',
    user: {
      name: 'Pooja Singh',
      avatar: 'https://picsum.photos/200/200?random=1011',
      location: 'Madhepura',
      age: 25,
      profession: 'Software Engineer',
      religion: 'Hindu',
      gender: 'Female',
      salary: 1300000,
      education: 'Master\'s Degree',
    },
    media: [
      { id: '11-1', uri: 'https://picsum.photos/400/350?random=11', type: 'image' as const },
      { id: '11-2', uri: 'https://picsum.photos/400/350?random=31', type: 'video' as const },
      { id: '11-3', uri: 'https://picsum.photos/400/350?random=41', type: 'image' as const },
      { id: '11-4', uri: 'https://picsum.photos/400/350?random=51', type: 'image' as const },
      { id: '11-5', uri: 'https://picsum.photos/400/350?random=61', type: 'video' as const },
    ],
    caption: 'Healthcare is my calling. Seeking someone who appreciates dedication and care. 💊',
    likes: 29,
    comments: 10,
    timeAgo: '22h',
    isLiked: true,
  },
  {
    id: '12',
    user: {
      name: 'Raj Kumar',
      avatar: 'https://picsum.photos/200/200?random=1012',
      location: 'Supaul',
      age: 31,
      profession: 'Doctor',
      religion: 'Hindu',
      gender: 'Male',
      salary: 1600000,
      education: 'PhD',
    },
    media: [
      { id: '12-1', uri: 'https://picsum.photos/400/380?random=12', type: 'image' as const },
      { id: '12-2', uri: 'https://picsum.photos/400/380?random=32', type: 'image' as const },
    ],
    caption: 'Serving the nation and my family with pride. Traditional values matter! 🇮🇳',
    likes: 36,
    comments: 13,
    timeAgo: '1d',
    isLiked: false,
  },
  {
    id: '13',
    user: {
      name: 'Sita Devi',
      avatar: 'https://picsum.photos/200/200?random=1013',
      location: 'Sheohar',
      age: 23,
      profession: 'Government Officer',
      religion: 'Hindu',
      gender: 'Female',
      salary: 650000,
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '13-1', uri: 'https://picsum.photos/400/360?random=13', type: 'image' as const },
    ],
    caption: 'Educating young minds is my joy. Family festivals bring us together! 🎉',
    likes: 44,
    comments: 18,
    timeAgo: '1d',
    isLiked: true,
  },
  {
    id: '14',
    user: {
      name: 'Manoj Thakur',
      avatar: 'https://picsum.photos/200/200?random=1014',
      location: 'East Champaran',
      age: 29,
      profession: 'Engineer',
      religion: 'Hindu',
      gender: 'Male',
      salary: 850000,
      education: 'Master\'s Degree',
    },
    media: [
      { id: '14-1', uri: 'https://picsum.photos/400/340?random=14', type: 'image' as const },
      { id: '14-2', uri: 'https://picsum.photos/400/340?random=34', type: 'video' as const },
      { id: '14-3', uri: 'https://picsum.photos/400/340?random=44', type: 'image' as const },
    ],
    caption: 'Designing homes and building dreams. Family is the foundation of everything! 🏡',
    likes: 31,
    comments: 12,
    timeAgo: '1d',
    isLiked: false,
  },
  {
    id: '15',
    user: {
      name: 'Geeta Sharma',
      avatar: 'https://picsum.photos/200/200?random=1015',
      location: 'West Champaran',
      age: 26,
      profession: 'Teacher',
      religion: 'Hindu',
      gender: 'Female',
      salary: 400000,
      education: 'Bachelor\'s Degree',
    },
    media: [
      { id: '15-1', uri: 'https://picsum.photos/400/370?random=15', type: 'image' as const },
      { id: '15-2', uri: 'https://picsum.photos/400/370?random=35', type: 'image' as const },
    ],
    caption: 'Fighting for justice and family values. Seeking a partner who respects both! ⚖️',
    likes: 39,
    comments: 15,
    timeAgo: '1d',
    isLiked: true,
  },
];

// User preferences from registration (normally from backend/storage)
export const currentUserPreferences = {
  name: 'Prakash Roy',
  partnerAgeMin: 22,
  partnerAgeMax: 30,
  partnerProfession: ['Teacher', 'Software Engineer', 'Doctor', 'Business Owner', 'Nurse', 'Engineer', 'Pharmacist', 'Government Officer', 'Architect', 'Banker', 'Lawyer'],
  partnerLocation: ['Darbhanga', 'Muzaffarpur', 'Madhubani', 'Saharsa', 'Sitamarhi', 'Begusarai'],
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
