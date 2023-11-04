export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserInfoProps {
  email: string;
  password: string;
}

export interface AppwriteUserResponse {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs: Record<string, unknown>;
  accessedAt: string;
}

export interface AuthContextProps {
  user: AppwriteUserResponse | null;
  loginUser: (userInfo: UserInfoProps) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userInfo: UserInfoProps) => Promise<void>;
  checkUserStatus: () => Promise<void>;
  isLoading: boolean;
}

export interface AppwriteErrorProps {
  message: string;
  code: number;
  type: string;
  version: string;
}
