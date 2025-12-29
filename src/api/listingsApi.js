import axios from "axios";
import { API_BASE } from "./config";

export async function fetchAllListings(token, status = "") {
  try {
    const response = await axios.get(`${API_BASE}/listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: typeof status === "string" && status
        ? { status }
        : {},
    });

    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch listings" };
  }
}


export async function updateListingStatus(id, updateData, token) {
  try {
    const response = await axios.patch(`${API_BASE}/listings/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update listing" };
  }
}

export async function deleteListing(id, token) {
  try {
    const response = await axios.delete(`${API_BASE}/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete listing" };
  }
}


export async function fetchListingById(token, listingId) {
  try {
    const response = await axios.get(
      `${API_BASE}/listings/${listingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch listing" };
  }
}
