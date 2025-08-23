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
  AddPost: undefined;
  Settings: undefined;
  ProfileDetail: { userId: string };
  EditProfile: undefined;
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
