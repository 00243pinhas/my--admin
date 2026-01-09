import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import {
  fetchRealEstateCategories,
} from "../../../api/categoriesApi";

export default function CategoriesTable({
  onEdit,
  onDelete,
  refreshKey,
}) {
  const { token } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchRealEstateCategories(token);

        function normalizeSubs(data) {
          if (Array.isArray(data)) return data;
          if (Array.isArray(data?.subscriptions)) return data.subscriptions;
          if (Array.isArray(data?.data)) return data.data;
          
        }
        setRows(normalizeSubs(data));
      } finally {
        setLoading(false);
      }
    }

    if (token) load();
  }, [token, refreshKey]);


  console.log(rows);
  if (loading) return <div className="p-3">Loading categories…</div>;

  return (
    <div className="card mt-4">
      <div className="card-header bg-light">
        <strong>Manage Categories</strong>
        <div className="text-muted small">
          Create, edit, or delete real estate categories
        </div>
      </div>

      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Parent & child</th>
              <th>parent id</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td className="fw-medium">{c.name}</td>

                <td className="text-muted small">
                  {c.parentId ? <span className="text-muted small">Child</span> : <span className="badge bg-dark">Parent</span>}
                </td>

                <td>
                  <span className="text-muted small">
                    {c.createdAt ? new Date(c.createdAt).toISOString().split("T")[0] : "-"}
                  </span>
                </td>

                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(c)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
