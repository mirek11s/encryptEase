import { User } from "firebase/auth";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserInfoProps {
  email: string;
  password: string;
}

export interface AuthContextProps {
  user: User | null;
  loginUser: (userInfo: UserInfoProps) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userInfo: UserInfoProps) => Promise<void>;
  isLoading: boolean;
}
