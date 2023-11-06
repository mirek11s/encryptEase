import { useState, useEffect, createContext, useRef } from "react";
import {
  AuthContextProps,
  UserInfoProps,
  AuthProviderProps,
} from "./util.types";
import { toastDisplay } from "layouts/layoutUtils";

import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";

import { Toast } from "primereact/toast";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const toast = useRef<Toast>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginUser = async (userInfo: UserInfoProps) => {
    setIsLoading(true);
    try {
      const { email, password } = userInfo;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        toastDisplay(toast, error.message, "error", "Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        toastDisplay(toast, error.message, "error", "Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userInfo: UserInfoProps) => {
    setIsLoading(true);
    try {
      const { email, password } = userInfo;
      await createUserWithEmailAndPassword(auth, email, password);
      toastDisplay(toast, "User registered successfully", "success", "Success");
    } catch (error) {
      if (error instanceof Error) {
        toastDisplay(toast, error.message, "error", "Error");
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
