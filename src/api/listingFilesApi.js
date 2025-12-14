
import axios from "axios";
import { API_BASE } from "./config";


export async function fetchListingFiles(token, listingId) {
  try {
    const res = await axios.get(
      `${API_BASE}/listings/${listingId}/files`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (err) {
    throw (
      err.response?.data || { message: "Failed to fetch listing files" }
    );
  }
}



export async function updateListingFile(token, listingId, fileId, updateData) {
  try {
    const res = await axios.patch(
      `${API_BASE}/listings/${listingId}/files/${fileId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (err) {
    throw (
      err.response?.data || { message: "Failed to update listing file" }
    );
  }
}



export async function deleteListingFile(token, listingId, fileId) {
  try {
    const res = await axios.delete(
      `${API_BASE}/listings/${listingId}/files/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (err) {
    throw (
      err.response?.data || { message: "Failed to delete listing file" }
    );
  }
}
