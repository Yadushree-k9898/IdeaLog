import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth); // Get user from Redux store
  const token = user?.token || localStorage.getItem("token"); // Check local storage

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
