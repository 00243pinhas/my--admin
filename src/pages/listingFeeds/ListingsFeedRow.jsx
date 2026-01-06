import {
  Eye,
  CheckCircle,
  XCircle,
  Trash,
} from "react-bootstrap-icons";

/**
 * Status → badge style mapping
 */
function statusBadge(status) {
  const s = String(status || "").toLowerCase();

  switch (s) {
    case "active":
      return "bg-success";
    case "pending":
      return "bg-warning text-dark";
    case "rejected":
      return "bg-danger";
    case "inactive":
      return "bg-secondary";
    default:
      return "bg-light text-dark";
  }
}

export default function ListingsFeedRow({
  listing,
  onView,
  onApprove,
  onReject,
  onDelete,
  actionLoading,
}) {
  const status = listing.status || "—";

  const approving =
    actionLoading?.id === listing.id &&
    actionLoading?.type === "approve";

  const rejecting =
    actionLoading?.id === listing.id &&
    actionLoading?.type === "reject";

  const owner =
    listing.user
      ? `${listing.user.first_name || ""} ${listing.user.last_name || ""}`.trim()
      : listing.user_id || "—";

  const type = listing.listingType?.name || "—";


  const createdAt = listing.createdAt
    ? new Date(listing.createdAt).toLocaleString()
    : "—";

  return (
    <tr className="align-middle">

      {/* LISTING */}
      <td>
        <div className="fw-medium">{listing.title || "Untitled listing"}</div>
        <div className="text-muted small">{listing.id}</div>
      </td>

      {/* TYPE */}
      <td className="text-muted">{type}</td>

      {/* OWNER */}
      <td className="text-muted">{owner}</td>

      {/* STATUS */}
      <td>
        <span className={`badge ${statusBadge(status)}`}>
          {status}
        </span>
      </td>

      {/* CREATED */}
      <td className="text-muted small">{createdAt}</td>

      {/* ACTIONS */}
     <td className="text-end listing-actions">


        {/* VIEW */}
        <button
          className="btn btn-sm btn-light me-2"
          title="View listing"
          onClick={() => onView(listing.id)}
        >
          <Eye />
        </button>

        {/* APPROVE / REJECT (ONLY WHEN PENDING) */}
        {String(status).toLowerCase() === "pending" && (
          <>
            <button
              className="btn btn-sm btn-success me-2"
              title="Approve listing"
              disabled={approving || rejecting}
              onClick={() => onApprove(listing.id)}
            >
              {approving ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <CheckCircle />
              )}
            </button>

            <button
              className="btn btn-sm btn-danger me-2"
              title="Reject listing"
              disabled={approving || rejecting}
              onClick={() => onReject(listing.id)}
            >
              {rejecting ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <XCircle />
              )}
            </button>
          </>
        )}

        {/* DELETE */}
        <button
          className="btn btn-sm btn-outline-danger"
          title="Delete listing"
          onClick={() => onDelete(listing)}
        >
          <Trash />
        </button>

      </td>
    </tr>
  );
}
