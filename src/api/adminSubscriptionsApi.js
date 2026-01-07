import axios from "axios";
import { API_BASE } from "./config";

// GET: http://localhost:3000/api/v1/users/admin/user-subscriptions
export async function fetchAdminUserSubscriptions(token) {
  try {
    const res = await axios.get(
      `${API_BASE}/users/admin/user-subscriptions`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to fetch subscriptions",
    };
  }
}

// PATCH: /api/v1/users/user-subscriptions/{id}  (admin)
export async function updateAdminUserSubscription(token, subscriptionId, payload) {
  try {
    const res = await axios.patch(
      `${API_BASE}/users/user-subscriptions/${subscriptionId}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to update subscription",
    };
  }
}

// DELETE: /api/v1/users/user-subscriptions/{id}  (admin)
export async function deleteAdminUserSubscription(token, subscriptionId) {
  try {
    const res = await axios.delete(
      `${API_BASE}/users/user-subscriptions/${subscriptionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to delete subscription",
    };
  }
}


export async function fetchAdminUserSubscriptionById(token, id) {
  try {
    const res = await axios.get(
      `${API_BASE}/users/user-subscriptions/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to fetch subscription",
    };
  }
}
