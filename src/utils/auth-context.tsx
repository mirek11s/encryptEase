import { useState, useEffect, createContext } from "react";
import { account } from "../appwriteConfig";
import {
  AuthContextProps,
  UserInfoProps,
  AuthProviderProps,
} from "./util.types";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const loginUser = async (userInfo: UserInfoProps) => {
    setIsLoading(true);
    try {
      const { email, password } = userInfo;
      const response = await account.createEmailSession(email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
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
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
