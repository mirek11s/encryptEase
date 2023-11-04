import { useState, useEffect, createContext, useRef } from "react";
import { ID } from "appwrite";
import { account } from "../appwriteConfig";
import {
  AuthContextProps,
  UserInfoProps,
  AuthProviderProps,
  AppwriteUserResponse,
  AppwriteErrorProps,
} from "./util.types";

import { Toast } from "primereact/toast";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const toast = useRef<Toast>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AppwriteUserResponse | null>(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo: UserInfoProps) => {
    setIsLoading(true);
    try {
      const { email, password } = userInfo;
      await account.createEmailSession(email, password);

      const accountDetails = await account.get();
      setUser(accountDetails);
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

  const logoutUser = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const registerUser = async (userInfo: UserInfoProps) => {
    setIsLoading(true);
    try {
      const { email, password } = userInfo;
      await account.create(ID.unique(), email, password);

      await loginUser(userInfo);

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "User registered successfully",
      });
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

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      const appwriteError = error as AppwriteErrorProps;
      if (appwriteError?.code !== 401) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: appwriteError.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
