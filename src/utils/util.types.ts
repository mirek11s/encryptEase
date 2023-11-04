export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserInfoProps {
  email: string;
  password: string;
}

export interface AuthContextProps {
  user: any;
  loginUser: (userInfo: UserInfoProps) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userInfo: UserInfoProps) => Promise<void>;
  checkUserStatus: () => Promise<void>;
  isLoading: boolean;
}
