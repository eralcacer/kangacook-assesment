import { createContext, useContext, useState } from "react";
import RenderHeader from "../components/structure/RenderHeader";
import {
  RenderMenu,
  RenderRoutes,
} from "../components/structure/RenderNavigation";
import AuthenticateService from "../services/AuthenticateService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const [token, setToken] = useState(null);

  const login = async (userInformation) => {
    // Get token from cookies and send authentication request
    const loginResp = await AuthenticateService.postLoginUser(userInformation);
    if (loginResp.ok) {
      document.cookie = `auth_token=${loginResp.data.token}; path=/; secure; samesite=Lax`;
      setUser({
        name: userInformation.userName,
        email: userInformation.email,
        isAuthenticated: true,
        id: loginResp.data.user.id,
      });
      setToken(loginResp.data.token);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const logout = () => {
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=Lax";
    setUser({ name: "", isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ token, user, login, getCookie, logout }}>
      <>
        <RenderHeader />
        <RenderMenu />
        <RenderRoutes />
        {children}
      </>
    </AuthContext.Provider>
  );
};
