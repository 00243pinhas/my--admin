import axios from "axios";
import { API_BASE } from "./config";

/* ===================== FILES ===================== */

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
    throw err.response?.data || {
      message: "Failed to fetch listing files",
    };
  }
}

export async function uploadListingFiles(token, listingId, files) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const res = await axios.post(
      `${API_BASE}/listings/${listingId}/upload-files`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to upload files",
    };
  }
}

export async function updateListingFile(
  token,
  listingId,
  file_id,
  payload
) {
  try {
    const res = await axios.patch(
      `${API_BASE}/listings/${listingId}/files/${file_id}`,
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
      message: "Failed to update file",
    };
  }
}

export async function deleteListingFile(token, listingId, file_id) {
  try {
    const res = await axios.delete(
      `${API_BASE}/listings/${listingId}/files/${file_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Failed to delete file",
    };
  }
}
