import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";

// ✅ future-ready adapter
import { fetchCategoryTreeByType } from "../../api/categoryTreesApi";

// ✅ diagram renderer
import CategoriesDiagram from "./sections/CategoriesDiagram";

function normalizeTree(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.tree)) return data.tree;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function CategoriesPage() {
  const { token } = useAuth();

  // 🔒 V1 is scoped to real estate
  const [listingType] = useState("real_estate");

  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);

        const data = await fetchCategoryTreeByType(
          token,
          listingType
        );

        setTree(normalizeTree(data));
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token, listingType]);

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h4 className="mb-0">
            Real Estate Category Structure
          </h4>
          <div className="text-muted small">
            Read-only hierarchy map (V1)
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="alert alert-light small mb-3">
        This page visualizes the current classification hierarchy
        used by listings. Editing and management are handled in
        dedicated category management screens.
      </div>

      {/* LISTING TYPE SWITCHER (DISABLED – INTENTIONAL) */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <label className="small text-muted mb-0">
          Listing type:
        </label>

        <select
          className="form-select form-select-sm"
          style={{ maxWidth: 220 }}
          value={listingType}
          disabled
        >
          <option value="real_estate">
            Real Estate
          </option>
          <option value="jobs">
            Jobs (coming soon)
          </option>
          <option value="events">
            Events (coming soon)
          </option>
          <option value="health">
            Health (coming soon)
          </option>
        </select>

        <span className="badge bg-light text-muted">
          Read-only
        </span>
      </div>

      {/* DIAGRAM */}
      <CategoriesDiagram
        tree={tree}
        loading={loading}
      />
    </div>
  );
}
