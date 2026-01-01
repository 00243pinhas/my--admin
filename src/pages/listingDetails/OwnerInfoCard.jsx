export default function OwnerInfoCard() {
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Owner Information</h6>
      </div>

      <div className="card-body d-flex justify-content-between align-items-start flex-wrap gap-3">

        <div>
          <strong>User Name</strong>
          <div className="text-muted small">user@email.com</div>
          <span className="badge bg-success mt-1">Active</span>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm">
            View Profile
          </button>
          <button className="btn btn-outline-secondary btn-sm">
            View Listings
          </button>
        </div>

      </div>
    </div>
  );
}
