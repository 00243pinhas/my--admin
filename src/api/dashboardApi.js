
import axios from "axios";
import { API_BASE } from "./config";

export async function fetchBasicDashboardStats(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const [usersRes, listingsRes, pendingRes, rejectedRes] = await Promise.all([
      axios.get(`${API_BASE}/users`, { headers }),
      axios.get(`${API_BASE}/listings`, { headers }),
      axios.get(`${API_BASE}/listings`, {
        headers,
        params: { status: "pending" },
      }),
      axios.get(`${API_BASE}/listings`, {
        headers,
        params: { status: "rejected" },
      }),
    ]);

    return {
      totalUsers: usersRes.data.data.length,

      totalListings: listingsRes.data.data.listings.length,

      pendingListings: pendingRes.data.data.listings.length,

      rejectedListings: rejectedRes.data.data.listings.length,
    };
  } catch (err) {
    console.error("Dashboard stats error:", err);
    throw err.response?.data || { message: "Dashboard stats failed" };
  }
}
