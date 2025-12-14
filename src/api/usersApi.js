import axios from "axios";
import { API_BASE } from "./config";

export async function fetchAllUsers(token) {
  const res = await axios.get(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function updateUserRole(token, userId, role) {
  const res = await axios.patch(
    `${API_BASE}/users/${userId}/role`,
    { role },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
}

export async function updateUserStatus(token, userId, status) {
  const res = await axios.patch(
    `${API_BASE}/users/${userId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
}

export async function deleteUser(token, userId) {
  const res = await axios.delete(`${API_BASE}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchUserListings(token, userId) {
  const response = await axios.get(
    `${API_BASE}/users/${userId}/listings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}
