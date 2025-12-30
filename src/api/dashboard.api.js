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


export async function fetchActionRequired(token) {
  const res = await axios.get(`${API_BASE}/listings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const listings = Array.isArray(res.data.data)
    ? res.data.data
    : res.data.data?.listings || [];

  const pending = listings.filter(
    (l) => l.status === "pending"
  );

  const incomplete = listings.filter(
    (l) =>
      !l.title ||
      !l.listing_type ||
      !l.user_id
  );

  return {
    pendingCount: pending.length,
    incompleteCount: incomplete.length,
  };
}


export async function fetchBasicDashboardStats(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const [
      usersRes,
      listingsRes,
      pendingRes,
      rejectedRes,
    ] = await Promise.all([
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

    const users = usersRes.data.data || [];
    const listingsData = listingsRes.data.data;
    const pendingData = pendingRes.data.data;
    const rejectedData = rejectedRes.data.data;

    const listings = Array.isArray(listingsData)
      ? listingsData
      : listingsData?.listings || [];

    const pending = Array.isArray(pendingData)
      ? pendingData
      : pendingData?.listings || [];

    const rejected = Array.isArray(rejectedData)
      ? rejectedData
      : rejectedData?.listings || [];

    return {
      totalUsers: users.length,
      totalListings: listings.length,
      pendingListings: pending.length,
      rejectedListings: rejected.length,
    };
  } catch (err) {
    console.error("Dashboard stats error:", err);
    throw err.response?.data || {
      message: "Failed to load dashboard stats",
    };
  }
}