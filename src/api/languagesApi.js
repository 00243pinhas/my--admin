import axios from "axios";
import { API_BASE } from "./config";

export async function fetchLanguages(token) {
  try {
    const res = await axios.get(
      `${API_BASE}/languages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data || res.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to fetch languages",
    };
  }
}
