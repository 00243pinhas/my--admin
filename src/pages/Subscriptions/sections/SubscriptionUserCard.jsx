import { useNavigate } from "react-router-dom";

export default function SubscriptionUserCard({ subscription }) {
  const navigate = useNavigate();
  const user = subscription || {};

  console.log(user)

  return (
    <div className="card h-100">
      <div className="card-header">
        <strong>User</strong>
      </div>

      <div className="card-body">
        <div className="fw-medium">{user.email || "—"}</div>
        <div className="text-muted small">ID: {user.userId || "—"}</div>

        <span className="badge bg-light text-dark mt-2">
          {user.status || "unknown"}
        </span>

        <div className="mt-3">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() =>
              navigate(`/dashboard/users/${user.userId}`)
            }
          >
            View User
          </button>
        </div>
      </div>
    </div>
  );
}
