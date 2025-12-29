// src/pages/UserListingsPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { fetchUserListings } from "../api/usersApi";

export default function UserListingsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !userId) return;
    loadUserListings();
  }, [token, userId]);

  async function loadUserListings() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchUserListings(token, userId);

     let items = Array.isArray(data) ? data : data.items || [];

     console.log(items);

      setListings(items);
    } catch (err) {
      console.error(err);
      setError("Failed to load user listings");
    } finally {
      setLoading(false);
    }
  }


  if (!token) return <div>Admin access required</div>;
  if (loading) return <div>Loading user listings…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1 style={{ marginTop: "1rem" }}>User Listings</h1>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Price</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {listings.map((l) => (
            <tr key={l.id}>
              <td>{l.title}</td>
              <td>{l.listing_type?.name || "-"}</td>
              <td>{l.status}</td>
              <td>
                {l.price} {l.currency}
              </td>
              <td>
                {l.created_at
                  ? new Date(l.created_at).toLocaleString()
                  : "-"}
              </td>

                  <tr>
                      <button
                        onClick={() => navigate(`/dashboard/listings/${l.id}`)}
                      >
                        View Details
                      </button>
                  </tr>

              <td>
                <button
                  onClick={() =>
                    navigate(`/listings/${l.id}/files`)
                  }
                >
                  View Files
                </button>
              </td>
            </tr>

            

            
          ))}

          {listings.length === 0 && (
            <tr>
              <td colSpan={6}>No listings found for this user</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
