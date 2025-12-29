// src/api/dashboard.api.js
import axios from "axios";
import { API_BASE } from "./config";

/**
 * Dashboard v1 data contract
 * Admin-only
 */
export async function fetchDashboardData(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const [usersRes, listingsRes, pendingRes] = await Promise.all([
      axios.get(`${API_BASE}/users`, { headers }),
      axios.get(`${API_BASE}/listings`, { headers }),
      axios.get(`${API_BASE}/listings`, {
        headers,
        params: { status: "pending" },
      }),
    ]);

    const totalUsers = usersRes.data.data.length;
    const totalListings = listingsRes.data.data.listings.length;
    const pendingListings = pendingRes.data.data.listings.length;

    return {
      snapshot: {
        totalUsers,
        totalListings,
        activeListings: 0,
        pendingListings,
        incompleteListings: 0,
        activeSubscriptions: 0,
      },

      actions: {
        pendingListings,
        incompleteListings: 0,
        expiredSubscriptions: 0,
        flaggedUsers: 0,
      },

      momentum: {
        newUsers7d: 0,
        newListings7d: 0,
        approvedListings7d: 0,
        subscriptions7d: 0,
      },

      activity: {
        listings: [],
        users: [],
        subscriptions: [],
      },
    };
  } catch (err) {
    console.error("Dashboard v1 fetch failed:", err);
    throw err.response?.data || { message: "Failed to load dashboard" };
  }
}
