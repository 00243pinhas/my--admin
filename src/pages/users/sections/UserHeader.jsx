export default function UserHeader({ user }) {
  return (
    <div className="card mb-4">
      <div className="card-body d-flex justify-content-between align-items-start">

        {/* LEFT */}
        <div>
          <h4 className="mb-1">
            {user.firstName} {user.lastName}
          </h4>

          <div className="text-muted small">
            ID: {user.id}
          </div>

          {user.city && user.country && (
            <div className="text-muted small">
              {user.city}, {user.country}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="d-flex gap-2 flex-wrap align-items-start">
          <span
            className={`badge ${
              user.accountStatus === "active"
                ? "bg-success"
                : "bg-danger"
            }`}
          >
            {user.accountStatus}
          </span>

          {user.rating && (
            <span className="badge bg-secondary">
              ⭐ {user.rating} ({user.numReviews})
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
