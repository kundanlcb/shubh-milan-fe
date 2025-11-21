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
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  clientMessageId?: string;
}

export interface SendMessageRequest {
  threadId: string;
  type: 'text' | 'image' | 'video';
  content: string;
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
  type: 'LIKE' | 'CONNECT';
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
  respondedAt?: string;
}

export interface SendIntentRequest {
  type: 'LIKE' | 'CONNECT';
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
