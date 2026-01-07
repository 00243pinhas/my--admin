export default function SubscriptionHeader({ subscription, onCancel }) {
  const status = subscription.status || "unknown";

  const badge =
    status === "active"
      ? "bg-success"
      : status === "canceled"
      ? "bg-secondary"
      : status === "expired"
      ? "bg-dark"
      : "bg-warning text-dark";

  return (
    <div className="card sticky-top z-3">
      <div className="card-body d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h4 className="mb-1">Subscription</h4>
          <div className="text-muted small">
            ID: <strong>{subscription.id}</strong>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className={`badge ${badge}`}>{status}</span>

          <button
            className="btn btn-outline-danger btn-sm"
            disabled={status !== "active"}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
