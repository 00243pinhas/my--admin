import api from "./axios";

export async function sendOtp(phoneNumber) {
  const res = await api.post("/auth", {
    phoneNumber,
  });

  return res.data.data;
}

export async function verifyOtp(phoneNumber, code) {
  const res = await api.post("/auth/verify", {
    phoneNumber,
    code,
  });

  return res.data.data;
}
export async function logoutRequest() {
  const res = await api.post("/auth/logout");
  return res.data.data;
}
