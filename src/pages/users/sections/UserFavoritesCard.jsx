import { Link } from "react-router-dom";

function statusBadge(status) {
  switch (status) {
    case "active":
      return "bg-success";
    case "pending":
    case "pending_verification":
      return "bg-warning text-dark";
    case "suspended":
      return "bg-secondary";
    case "banned":
    case "rejected":
      return "bg-danger";
    default:
      return "bg-light text-dark";
  }
}

export default function UserFavoritesCard({ favorites = [] }) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Favorite Listings</strong>
      </div>

      <div className="card-body p-0">
        {favorites.length === 0 ? (
          <div className="p-3 text-muted small">
            This user has no favorite listings.
          </div>
        ) : (
          <table className="table table-sm mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((l) => (
                <tr key={l.id}>
                  <td>{l.title || "—"}</td>
                  <td>
                    <span className={`badge ${statusBadge(l.status)}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link
                      to={`/dashboard/listings/${l.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
