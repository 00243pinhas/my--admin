// src/pages/ListingsPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import {
  fetchAllListings,
  updateListingStatus,
  deleteListing,
} from "../api/listingsApi";

const STATUS_OPTIONS = ["pending", "active", "inactive", "rejected", "sold", "rented"];

export default function ListingsPage() {
  const { token } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    if (!token) return;
    loadListings();
  }, [token, statusFilter]);

  async function loadListings() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAllListings(token, statusFilter);

      const items = Array.isArray(data)
        ? data
        : data?.listings || [];

      setListings(items);
    } catch (err) {
      console.error(err);
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeStatus(id, newStatus) {
    try {
      await updateListingStatus(id, { status: newStatus }, token);

      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: newStatus } : l
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteListing(id, token);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing");
    }
  }

  if (!token) return <div>You must be logged in as admin.</div>;
  if (loading) return <div>Loading listings…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem" }} className="p-4">
      <h1>Listings moderation</h1>

      <div style={{ margin: "1rem 0" }}>
        <label>
          Filter by status:{" "}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l) => (
            <tr key={l.id}>
              <td>{l.title}</td>

              
              <td>
                {l.user
                  ? `${l.user.first_name} ${l.user.last_name}`
                  : l.user_id}
              </td>

              <td>{l.price} {l.currency}</td>
              <td>{l.status}</td>

         
              <td>
                {l.created_at
                  ? new Date(l.created_at).toLocaleString()
                  : "-"}
              </td>

              <td>
                {l.status === "pending" && (
                  <>
                    <button onClick={() => handleChangeStatus(l.id, "active")}>
                      Approve
                    </button>{" "}
                    <button onClick={() => handleChangeStatus(l.id, "rejected")}>
                      Reject
                    </button>{" "}
                  </>
                )}

                {l.status === "active" && (
                  <button onClick={() => handleChangeStatus(l.id, "inactive")}>
                    Deactivate
                  </button>
                )}{" "}

                <button onClick={() => handleDelete(l.id)}>Delete</button>
              </td>
            </tr>
          ))}

          {listings.length === 0 && (
            <tr>
              <td colSpan={6}>No listings found for this status.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
