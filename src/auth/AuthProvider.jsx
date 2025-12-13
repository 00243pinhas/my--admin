// src/auth/AuthProvider.jsx
import {  useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest,logoutRequest } from "../api/ authApi";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [roles, setRoles] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return [];
    const u = JSON.parse(storedUser);
    return u.roles || (u.role ? [u.role] : []);
  });

  const [loading, setLoading] = useState(false);

  async function login(email, password) {
    setLoading(true);

    const data = await loginRequest(email, password);

    const { user, access_token } = data;

    // Save token
    localStorage.setItem("token", access_token);
    setToken(access_token);

    // Save user in state AND localStorage
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    // Normalize roles
    const normalizedRoles =
      user.roles || (user.role ? [user.role] : []);

    setRoles(normalizedRoles);

    setLoading(false);
  }

async function logout() {
  try {
    if (token) {
      await logoutRequest(token); 
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setToken(null);
  setUser(null);
  setRoles([]);
}


  function isAuthorized(requiredRoles = []) {
    if (requiredRoles.length === 0) return true;
    return roles.some((r) => requiredRoles.includes(r));
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        roles,
        loading,
        login,
        logout,
        isLoggedIn: !!token,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
