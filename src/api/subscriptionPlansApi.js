import axios from "axios";
import { API_BASE } from "./config";

export async function fetchAdminSubscriptionPlans(token) {
  try {
    const res = await axios.get(`${API_BASE}/subscription-plans/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to fetch subscription plans",
    };
  }
}
