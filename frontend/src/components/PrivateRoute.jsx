import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  // Get user authentication status from Redux store
  const { user } = useSelector((state) => state.auth);
  
  // Check for token in user object or localStorage as fallback
  const token = user?.token || localStorage.getItem("token");
  
  // If no token exists, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the protected route's children
  return <Outlet />;
};

export default PrivateRoute;