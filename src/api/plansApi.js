import axios from "axios";
import { API_BASE } from "./config";

export async function fetchAdminPlans(token) {
  const res = await axios.get(
    `${API_BASE}/subscription-plans/admin`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
}

export async function activatePlan(token, planId) {
  await axios.patch(
    `${API_BASE}/subscription-plans/admin/${planId}/activate`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function deactivatePlan(token, planId) {
  await axios.patch(
    `${API_BASE}/subscription-plans/admin/${planId}/deactivate`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
