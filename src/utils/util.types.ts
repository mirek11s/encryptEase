export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserInfoProps {
  email: string;
  password: string;
}

export interface AppwriteAuthResponse {
  $id: string;
  $createdAt: string;
  userId: string;
  expire: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: boolean;
}

export interface AuthContextProps {
  user: AppwriteAuthResponse | null;
  loginUser: (userInfo: UserInfoProps) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userInfo: UserInfoProps) => Promise<void>;
  checkUserStatus: () => Promise<void>;
  isLoading: boolean;
}
