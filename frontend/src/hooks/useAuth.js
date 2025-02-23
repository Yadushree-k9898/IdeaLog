import { useEffect, useState } from "react";
import { getToken, removeToken } from "../utils/authUtils";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return { user, logout };
};

export default useAuth;
