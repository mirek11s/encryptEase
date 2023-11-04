import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./use-auth";

const PrivateRoutes: React.FC = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
