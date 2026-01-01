export default function ListingHeader() {
  return (
    <div className="card sticky-top z-3">
      <div className="card-body border-bottom d-flex justify-content-between align-items-start gap-3">

        <div>
          <h4 className="mb-1">Listing Title Goes Here</h4>
          <div className="text-muted small">
            ID: <span className="fw-medium">#listing-id</span>
            <button className="btn btn-sm btn-link ms-2 p-0">Copy</button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="badge bg-warning text-dark">Pending</span>

          <button className="btn btn-success btn-sm">Approve</button>
          <button className="btn btn-outline-danger btn-sm">Reject</button>
          <button className="btn btn-outline-secondary btn-sm">Archive</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </div>

      </div>
    </div>
  );
}
