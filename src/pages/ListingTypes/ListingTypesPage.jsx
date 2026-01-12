import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { fetchListingTypes } from "../../api/listingTypesApi";
import ListingTypesTable from "./sections// ListingTypesTable";

export default function ListingTypesPage() {
  const { token } = useAuth();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchListingTypes(token);
        setTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load listing types", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Listing Types</h4>
        <span className="badge bg-secondary">System-defined</span>
      </div>

      <div className="alert alert-light small mb-3">
        Listing types define the core categories of listings on the platform.
        They are predefined and cannot be modified.
      </div>

      <ListingTypesTable types={types} loading={loading} />
    </div>
  );
}
