import axios from "axios";
import { API_BASE } from "./config";

export async function fetchRealEstateDetails(token, listingId) {
  try {
    const response = await axios.get(
      `${API_BASE}/real-estate/listings/${listingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch real estate details" };
  }
}