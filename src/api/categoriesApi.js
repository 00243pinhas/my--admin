import axios from "axios";
import { API_BASE } from "./config";

export async function fetchCategoryTree(token) {
  const res = await axios.get(
    `${API_BASE}/real-estate/categories/tree`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Category tree data:", res.data);
  return res.data;
}


// export async function fetchRealEstateCategoryTree(token) {
//   const res = await axios.get(
//     `${API_BASE}/real-estate/categories/tree`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// }

export async function createRealEstateCategory(token, payload) {
  const res = await axios.post(
    `${API_BASE}/real-estate/categories`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
}

export async function updateRealEstateCategory(token, id, payload) {
  const res = await axios.patch(
    `${API_BASE}/real-estate/categories/${id}`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
}

export async function deleteRealEstateCategory(token, id) {
  const res = await axios.delete(
    `${API_BASE}/real-estate/categories/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
}

