export default function RolesTable({ roles, loading }) {
  if (loading) {
    return <div className="p-4">Loading roles…</div>;
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Users</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td className="fw-medium">{r.name}</td>

                <td className="text-muted small">
                  {r.name === "admin" &&
                    "Full platform access and system control"}
                  {r.name === "moderator" &&
                    "Content moderation and review access"}
                  {r.name === "regular_user" &&
                    "Standard user access"}
                </td>

                <td>
                  <span className="badge bg-info">
                    {r.userCount}
                  </span>
                </td>

                <td>
                  <span className="badge bg-dark">
                    System
                  </span>
                </td>
              </tr>
            ))}

            {roles.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-muted py-4"
                >
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
