import { useState, useEffect, createContext, useRef } from "react";
import { account } from "../appwriteConfig";
import {
  AuthContextProps,
  UserInfoProps,
  AuthProviderProps,
  AppwriteAuthResponse,
} from "./util.types";

import { Toast } from "primereact/toast";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const toast = useRef<Toast>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AppwriteAuthResponse | null>(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const loginUser = async (userInfo: UserInfoProps) => {
    setIsLoading(true);
    try {
      const { email, password } = userInfo;
      const response: AppwriteAuthResponse = await account.createEmailSession(
        email,
        password
      );
      const accountDetails = await account.get();
      setUser(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {};

  const registerUser = async (userInfo: UserInfoProps) => {};

  const checkUserStatus = async () => {};

  const contextData: AuthContextProps = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <Toast ref={toast} />
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
