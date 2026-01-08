import { useNavigate } from "react-router-dom";

export default function ListingTypesTable({ types, loading }) {
  const navigate = useNavigate();

  console.log(types);

  if (loading) {
    return <div className="p-4">Loading listing types…</div>;
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Type</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {types.map((t) => (
              <tr key={t.id}>
                <td className="fw-medium">{t.name}</td>

                <td>
                  <span className="badge bg-secondary">{t.code}</span>
                </td>

                <td>
                  <span className="badge bg-dark">System</span>
                </td>

                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() =>
                      navigate(`/dashboard/listing-types/${t.slug}`)
                    }
                  >
                    Manage Categories
                  </button>
                </td>
              </tr>
            ))}

            {types.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  No listing types found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
