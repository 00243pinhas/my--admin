// src/api/baseApi.js
// const API_URL = "http://localhost:3000/api/v1";

import { API_BASE } from "../api/config";




export async function authGet(path, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`GET ${path} failed with status ${res.status}`);
  }

  const json = await res.json();
  return json.data ?? json;
}
