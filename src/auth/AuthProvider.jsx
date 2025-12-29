import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { sendOtp, verifyOtp, logoutRequest } from "../api/authApi";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [otpPhone, setOtpPhone] = useState(null);

  async function requestOtp(phoneNumber) {
    if (!phoneNumber) throw new Error("Phone number required");
    setLoading(true);
    await sendOtp(phoneNumber);
    setOtpPhone(phoneNumber);
    setLoading(false);
  }

  async function confirmOtp(code) {
    if (!otpPhone) throw new Error("Restart login");

    setLoading(true);
    const data = await verifyOtp(otpPhone, code);
    setLoading(false);

    if (!data?.accessToken) throw new Error("Invalid OTP");

    localStorage.setItem("token", data.accessToken);
    setToken(data.accessToken);

    return data.context;
  }

  async function logout() {
    if (token) await logoutRequest(token);
    localStorage.clear();
    setToken(null);
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
