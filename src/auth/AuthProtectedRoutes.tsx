import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { userAuthRoutes } from "./user/constants/routes";

export const AuthProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={userAuthRoutes.login()} replace />;
  }

  return <Outlet />;
};

export default AuthProtectedRoute;
