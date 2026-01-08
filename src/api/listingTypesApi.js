import axios from "axios";
import { API_BASE } from "./config";

export async function fetchListingTypes(token) {
  const res = await axios.get(`${API_BASE}/listing-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
}
