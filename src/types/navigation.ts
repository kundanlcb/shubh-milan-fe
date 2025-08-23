export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OTPVerification: { email: string; phone: string };
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  Chat: undefined;
  ChatConversation: { chatId: string; chatName: string; isOnline?: boolean };
  AddPost: undefined;
  Settings: undefined;
  UserProfile: { userId: string };
  ProfileDetail: { userId: string };
  EditProfile: undefined;
  StoryViewer: {
    user: { name: string; avatar: string };
    stories: { id: string; uri: string; type: 'image' | 'video' }[]
  };
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// Screen props types for easier use
export type AuthScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any; // Will be properly typed when navigation is set up
  route: { params: AuthStackParamList[T] };
};

export type MainScreenProps<T extends keyof MainStackParamList> = {
  navigation: any; // Will be properly typed when navigation is set up
  route: { params: MainStackParamList[T] };
};
