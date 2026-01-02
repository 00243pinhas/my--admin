export default function ListingHeader({
  listing,
  loading,
  onApprove,
  onReject,
  onArchive,
  onDelete,
}) {
  function badge(status) {
    switch (status) {
      case "active":
        return "bg-success";
      case "pending":
        return "bg-warning text-dark";
      case "rejected":
        return "bg-danger";
      case "archived":
        return "bg-secondary";
      default:
        return "bg-light text-dark";
    }
  }

  function copyId() {
    navigator.clipboard.writeText(listing.id);
  }

  return (
    <div className="card sticky-top z-3">
      <div className="card-body border-bottom d-flex justify-content-between gap-3">

        <div>
          <h4 className="mb-1">{listing.title || "Untitled Listing"}</h4>
          <div className="text-muted small">
            ID: <span className="fw-medium">{listing.id}</span>
            <button className="btn btn-sm btn-link ms-2 p-0" onClick={copyId}>
              Copy
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className={`badge ${badge(listing.status)}`}>
            {listing.status}
          </span>

          <button
            className="btn btn-success btn-sm"
            disabled={loading || listing.status === "active"}
            onClick={onApprove}
          >
            Approve
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            disabled={loading || listing.status === "rejected"}
            onClick={onReject}
          >
            Reject
          </button>

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={loading || listing.status === "archived"}
            onClick={onArchive}
          >
            Archive
          </button>

          <button
            className="btn btn-danger btn-sm"
            disabled={loading}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
