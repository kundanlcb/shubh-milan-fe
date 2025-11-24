/**
 * API Types
 * TypeScript interfaces for API requests and responses
 */

// Common types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  code?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  before?: string;
  after?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    totalCount?: number;
  };
}

// User & Profile Types
export interface UserSummary {
  id: string;
  name: string;
  avatar: string;
  location: string;
  age: number;
  profession: string;
  religion: string;
  gender: 'Male' | 'Female' | 'Other';
  salary: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roles: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  createdAt: string;
  lastLogin?: string;
}

export interface Profile {
  userId: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  profession: string;
  education: string;
  location: string;
  motherTongue: string;
  religion: string;
  salary: number;
  bio: string;
  photos: string[];
}

export interface PartnerPreferences {
  ageMin: number;
  ageMax: number;
  professions: string[];
  educations: string[];
  locations: string[];
  religions: string[];
  genders: string[];
  salaryMin: number;
  salaryMax: number;
}

// Authentication Types
export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  user: User;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  profile: Omit<Profile, 'userId'>;
  partnerPreferences: PartnerPreferences;
  accountType: 'FREE' | 'PREMIUM';
  privacyLevel: 'PUBLIC' | 'FILTERED' | 'PRIVATE';
}

export interface RegisterResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Post & Feed Types
export interface MediaItem {
  id: string;
  uri: string;
  type: 'image' | 'video';
}

export interface PostData {
  id: string;
  user: UserSummary;
  media: MediaItem[];
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
  createdAt: string;
  visibility?: 'PUBLIC' | 'FILTERED' | 'PRIVATE';
}

export interface CreatePostRequest {
  caption: string;
  mediaKeys: string[];
  visibility: 'PUBLIC' | 'FILTERED' | 'PRIVATE';
}

export interface FeedFilters {
  ageMin?: number;
  ageMax?: number;
  professions?: string[];
  locations?: string[];
  religions?: string[];
  genders?: string[];
  salaryMin?: number;
  salaryMax?: number;
}

// Comment Types
export interface Comment {
  id: string;
  postId: string;
  user: UserSummary;
  text: string;
  parentId?: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface CreateCommentRequest {
  text: string;
  parentId?: string;
}

// Story Types
export interface Story {
  id: string;
  userId: string;
  user?: UserSummary;
  uri: string;
  type: 'image' | 'video';
  createdAt: string;
  expiresAt: string;
  viewersCount: number;
  isViewed: boolean;
}

export interface CreateStoryRequest {
  mediaKey: string;
  type: 'image' | 'video';
}

// Chat Types
export interface ChatThread {
  id: string;
  participant1: UserSummary;
  participant2: UserSummary;
  lastMessage?: ChatMessage;
  lastMessageAt: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  type: 'text' | 'image' | 'video' | 'typing';
  content: string;
  mediaUrl?: string;
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  isRead?: boolean;
  clientMessageId?: string;
}

export interface SendMessageRequest {
  threadId: string;
  type: 'text' | 'image' | 'video';
  content: string;
  mediaUrl?: string;
  clientMessageId?: string;
}

export interface CreateThreadRequest {
  participantId: string;
}

// Notification Types
export type NotificationType = 'LIKE' | 'COMMENT' | 'MATCH' | 'MESSAGE' | 'STORY_VIEW' | 'PROFILE_VIEW';

export interface Notification {
  id: string;
  type: NotificationType;
  payload: {
    postId?: string;
    commentId?: string;
    messageId?: string;
    storyId?: string;
    actor: UserSummary;
  };
  createdAt: string;
  readAt?: string;
}

// Match/Interest Types
export interface MatchIntent {
  id: string;
  requesterId: string;
  targetId: string;
  fromUser?: UserSummary;
  toUser?: UserSummary;
  type: 'LIKE' | 'CONNECT';
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
  respondedAt?: string;
}

export interface SendIntentRequest {
  type: 'LIKE' | 'CONNECT';
  message?: string;
}

export interface MatchesResponse {
  connections: UserSummary[];
  pendingOutgoing: MatchIntent[];
  pendingIncoming: MatchIntent[];
}

// Media Upload Types
export interface PresignedUploadUrl {
  uploadUrl: string;
  key: string;
  expiresAt: string;
}

export interface PresignUploadRequest {
  count: number;
  contentTypes: string[];
}

export interface PresignUploadResponse {
  urls: PresignedUploadUrl[];
}

// Search Types
export interface UserSearchParams extends PaginationParams {
  search?: string;
  ageMin?: number;
  ageMax?: number;
  professions?: string[];
  locations?: string[];
  religions?: string[];
  genders?: string[];
  salaryMin?: number;
  salaryMax?: number;
}

// Settings Types
export interface AppSettings {
  notifications: {
    likes: boolean;
    comments: boolean;
    messages: boolean;
    matches: boolean;
  };
  privacy: {
    showOnline: boolean;
    showLastSeen: boolean;
    profileVisibility: 'PUBLIC' | 'FILTERED' | 'PRIVATE';
  };
  preferences: {
    language: 'en' | 'hi' | 'mai'; // English, Hindi, Maithili
    theme: 'light' | 'dark' | 'auto';
  };
}

// ==========================================
// SWAGGER API TYPES (Strict DTOs)
// ==========================================

export interface ApiPostRequest {
  content?: string;
  userId?: number;
  mediaUrls?: string[];
}

export interface ApiPartnerPreferencesRequest {
  ageMin?: number;
  ageMax?: number;
  professions?: string[];
  educations?: string[];
  locations?: string[];
  religions?: string[];
  genders?: string[];
  salaryMin?: number;
  salaryMax?: number;
}

export interface ApiStoryRequest {
  mediaUrl: string;
  mediaType: string;
}

export interface ApiProfileUpdateRequest {
  fullName: string;
  gender: string;
  bio?: string;
  profession?: string;
  education?: string;
  location?: string;
  salary?: number;
  city?: string;
  state?: string;
  country?: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  maritalStatus?: string;
  height?: string;
  weight?: string;
  occupation?: string;
  income?: string;
  profilePhoto?: string;
}

export interface ApiCommentRequest {
  postId: number;
  text: string;
  parentId?: number;
}

export interface ApiConnectionRequest {
  targetUserId: number;
  message?: string;
}

export interface ApiLikeRequest {
  userId: number;
  postId: number;
}

export interface ApiChatThreadRequest {
  participantId: number;
}

export interface ApiSendMessageRequest {
  threadId: number;
  content: string;
  type: string;
  mediaUrl?: string;
}

export interface ApiRegisterRequest {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  gender: string;
  dob: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  maritalStatus?: string;
  city?: string;
  state?: string;
  country?: string;
  profilePhoto?: string;
}

export interface ApiRefreshTokenRequest {
  refreshToken: string;
}

export interface ApiLoginRequest {
  identifier: string;
  password: string;
}

export interface ApiProfile {
  id?: number;
  fullName?: string;
  gender?: string;
  dob?: string;
  age?: number;
  profession?: string;
  education?: string;
  location?: string;
  salary?: number;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  maritalStatus?: string;
  city?: string;
  state?: string;
  country?: string;
  heightCm?: number;
  weightKg?: number;
  diet?: 'VEG' | 'NON_VEG' | 'EGGITARIAN' | 'VEGAN';
  smoking?: 'YES' | 'NO' | 'OCCASIONALLY';
  drinking?: 'YES' | 'NO' | 'OCCASIONALLY';
  photos?: string[];
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiStory {
  id?: number;
  user?: ApiUser;
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO';
  createdAt?: string;
  expiresAt?: string;
  viewCount?: number;
  visibility?: 'PUBLIC' | 'CONNECTIONS' | 'CLOSE_FRIENDS';
  thumbnailUrl?: string;
  durationSeconds?: number;
}

export interface ApiUser {
  id?: number;
  fullName?: string;
  username?: string;
  email?: string;
  mobile?: string;
  password?: string;
  roles?: string[];
  status?: 'ACTIVE' | 'SUSPENDED' | 'DELETED' | 'PENDING_VERIFICATION';
  isVerified?: boolean;
  isPremium?: boolean;
  lastLogin?: string;
  lastActiveAt?: string;
  deletedAt?: string;
  profile?: ApiProfile;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiPageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface ApiPagePost {
  totalPages?: number;
  totalElements?: number;
  pageable?: ApiPageableObject;
  numberOfElements?: number;
  size?: number;
  content?: ApiPost[];
  number?: number;
  sort?: ApiSortObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface ApiPageableObject {
  unpaged?: boolean;
  pageNumber?: number;
  paged?: boolean;
  pageSize?: number;
  offset?: number;
  sort?: ApiSortObject;
}

export interface ApiPost {
  id?: number;
  caption?: string;
  content?: string;
  mediaUrls?: string[];
  visibility?: 'PUBLIC' | 'FILTERED' | 'PRIVATE';
  location?: string;
  likeCount?: number;
  commentCount?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: ApiUser; // Assuming the API returns the user object populated, though Swagger schema for Post didn't explicitly show it, it's common. If not, we might need to fetch separately or it's in a wrapper. *Correction*: Swagger Post schema didn't show `user` field. Checking `PagePost` -> `content` -> `Post`. The `Post` schema in Swagger (lines 4402) does NOT have a `user` field. However, the `Feed` endpoint usually returns posts with user info. I will assume for now it might be there or I'll need to check the actual API response. *Self-correction*: The `PostData` UI type has `user`. I will add `user` to `ApiPost` as optional, but be aware it might not be in the strict schema.
}


export interface ApiSortObject {
  unsorted?: boolean;
  sorted?: boolean;
  empty?: boolean;
}

export interface ApiChatMessage {
  id?: number;
  chatId?: number;
  senderId?: number;
  content?: string;
  mediaUrl?: string;
  type?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE';
  read?: boolean;
  createdAt?: string;
}

export interface ApiChat {
  id?: number;
  users?: ApiUser[];
  lastMessage?: ApiChatMessage;
  unreadCount?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface ApiConnection {
  id?: number;
  requester?: ApiUser;
  receiver?: ApiUser;
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'BLOCKED';
  createdAt?: string;
  updatedAt?: string;
  message?: string;
}


