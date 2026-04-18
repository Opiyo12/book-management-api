import { createContext, useContext, useState } from "react";
import {
  getUser,
  getAccessToken,
  setUser as storeUser,
  setTokens,
  clearUser,
} from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Store logged in user
  const [user, setUser] = useState(getUser());

  // Store JWT token
  const [token, setToken] = useState(getAccessToken() || null);

  // Login function - accepts { user, token, refreshToken } from API response
  const login = ({ user, token, refreshToken }) => {
    setUser(user);
    setToken(token);

    storeUser(user);
    setTokens({ token, refreshToken });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);

    clearUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}