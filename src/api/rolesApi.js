import axios from "axios";
import { API_BASE } from "./config";

export async function fetchRoles(token) {
  const res = await axios.get(`${API_BASE}/roles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function createRole(token, payload) {
  const res = await axios.post(`${API_BASE}/roles`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function updateUserRole(token, userId, role) {
  return axios.patch(
    `${API_BASE}/users/${userId}/role`,
    { role }, // 👈 THIS IS CORRECT
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


export async function deleteRole(token, roleId) {
  const res = await axios.delete(
    `${API_BASE}/roles/${roleId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
}
