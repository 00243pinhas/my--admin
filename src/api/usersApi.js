import axios from "axios";
import { API_BASE } from "./config";

export async function fetchAllUsers(token) {
  const res = await axios.get(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function fetchUserById(token, userId) {
  const res = await axios.get(`${API_BASE}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function fetchUserListings(token, userId) {
  const res = await axios.get(`${API_BASE}/users/${userId}/listings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function updateUserStatus(token, userId, status) {
  const res = await axios.patch(
    `${API_BASE}/users/${userId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
}

export async function updateUserRole(token, userId, role) {
  try {
    const res = await axios.patch(
      `${API_BASE}/users/${userId}/role`,
      { role }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to update user role",
    };
  }
}


export async function deleteUser(token, userId) {
  try {
    const res = await axios.delete(
      `${API_BASE}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to delete user",
    };
  }
}

export async function fetchUserSubscriptions(token, userId) {
  try {
    const res = await axios.get(
      `${API_BASE}/users/${userId}/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to fetch user subscriptions",
    };
  }
}

export async function createUserSubscription(token, userId, payload) {
  try {
    const res = await axios.post(
      `${API_BASE}/users/${userId}/subscriptions`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to create subscription",
    };
  }
}


export async function cancelUserSubscription(token, subscriptionId) {
  try {
    const res = await axios.patch(
      `${API_BASE}/users/user-subscriptions/${subscriptionId}`,
      { status: "canceled" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to cancel subscription",
    };
  }
}

export async function fetchUserFavorites(token, userId) {
  try {
    const res = await axios.get(
      `${API_BASE}/users/${userId}/favorite-listings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to fetch user favorites",
    };
  }
}

export async function seedUser(token, payload) {
  const res = await axios.post(
    `${API_BASE}/users/admin/seed`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}


