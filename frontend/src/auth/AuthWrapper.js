import { createContext, useContext, useEffect, useState } from "react";
import RenderHeader from "../components/structure/RenderHeader";
import {
  RenderMenu,
  RenderRoutes,
} from "../components/structure/RenderNavigation";
import AuthenticateService from "../services/AuthenticateService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", isAuthenticated: false });
  const [token, setToken] = useState(null);
  const authService = new AuthenticateService();

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const authenticateResp = await authService.getAuthenticateUser();
      if (authenticateResp.success) {
        setUser({
          first_name: authenticateResp.user.first_name,
          last_name: authenticateResp.user.last_name,
          email: authenticateResp.user.email,
          username: authenticateResp.user.username,
          isAuthenticated: true,
          id: authenticateResp.user.id,
        });
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const signup = async (userInformation) => {
    try {
      const signupResp = await authService.postSignUpUser(userInformation);

      if (signupResp.success) {
        setUser({
          first_name: signupResp.user.first_name,
          last_name: signupResp.user.last_name,
          email: signupResp.user.email,
          username: signupResp.user.username,
          isAuthenticated: true,
          id: signupResp.user.user.id,
        });
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const login = async (userInformation) => {
    try {
      const loginResp = await authService.postLoginUser(userInformation);
      if (loginResp.success === true) {
        setUser({
          first_name: loginResp.user.first_name,
          last_name: loginResp.user.last_name,
          email: loginResp.user.email,
          username: loginResp.user.username,
          isAuthenticated: true,
          id: loginResp.user.id,
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast.error("Failed login.", {
        duration: 4000,
        style: {
          background: "#ff5252",
          color: "#fff",
        },
      });
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const logout = async () => {
    try {
      const logoutResp = await authService.postLogOutUser();
      if (logoutResp.success) {
        setUser({ isAuthenticated: false });
        navigate("/login");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to logout.", {
        duration: 4000,
        style: {
          background: "#ff5252",
          color: "#fff",
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, signup, getCookie, logout }}
    >
      <>
        <RenderHeader />
        <RenderMenu />
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
