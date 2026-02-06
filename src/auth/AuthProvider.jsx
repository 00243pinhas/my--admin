import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { sendOtp, verifyOtp, logoutRequest } from "../api/authApi";
import api from "../api/axios";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(false);
  const [otpPhone, setOtpPhone] = useState(null);

  async function requestOtp(phoneNumber) {
    if (!phoneNumber) {
      throw new Error("Phone number required");
    }

    setLoading(true);
    try {
      await sendOtp(phoneNumber);
      setOtpPhone(phoneNumber);
    } finally {
      setLoading(false);
    }
  }

  async function confirmOtp(code) {
    if (!otpPhone) {
      throw new Error("Restart login");
    }

    setLoading(true);
    try {
      const data = await verifyOtp(otpPhone, code);

      if (!data?.accessToken) {
        throw new Error("Invalid OTP");
      }

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );
      setToken(data.accessToken);

      api.defaults.headers.Authorization =
        `Bearer ${data.accessToken}`;

      return data.context;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await logoutRequest(); // backend invalidates refresh token
    } catch (e) {
      // ignore errors
    } finally {
      localStorage.removeItem("accessToken");
      setToken(null);
      delete api.defaults.headers.Authorization;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        requestOtp,
        confirmOtp,
        logout,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
