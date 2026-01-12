import { DASHBOARD_ROUTES } from "../../Dashboard/dashboard.routes";
import {
  HourglassSplit,
  ExclamationTriangle,
  CheckCircle,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function DashboardActions({ data }) {
  const navigate = useNavigate();

  const hasActions =
    data.pendingListings > 0 ||
    data.incompleteListings > 0;

  return (
    <section className="mb-4">
      <div
        className="card border-0 shadow action-required-card"
        style={{ borderLeft: "4px solid #dc3545" }}
      >
        <div className="card-body">
          {/* HEADER */}
          <div className="d-flex align-items-start justify-content-between mb-3">
            <div>
              <h5 className="fw-semibold mb-0">
                ⚠️ Action Required 
              </h5>
              <small className="text-muted">
                Immediate admin attention needed
              </small>
            </div>
          </div>

          {/* CONTENT */}
          {!hasActions ? (
            <AllClear />
          ) : (
            <div className="list-group list-group-flush">

              {data.incompleteListings > 0 && (
                <ActionItem
                  icon={<ExclamationTriangle />}
                  label="Incomplete listings"
                  value={data.incompleteListings}
                  variant="danger"
                  onClick={() =>
                    navigate(DASHBOARD_ROUTES.incompleteListings)
                  }
                />
              )}

              {data.pendingListings > 0 && (
                <ActionItem
                  icon={<HourglassSplit />}
                  label="Listings pending approval"
                  value={data.pendingListings}
                  variant="warning"
                  onClick={() =>
                    navigate(DASHBOARD_ROUTES.pendingListings)
                  }
                />
              )}

            </div>
          )}
        </div>
      </div>
    </section>
  );
}


/* ============================= */
/* ACTION ITEM */
/* ============================= */

function ActionItem({ icon, label, value, variant, onClick }) {
  const color =
    variant === "danger"
      ? "text-danger"
      : variant === "warning"
      ? "text-warning"
      : "text-muted";

  const badge =
    variant === "danger"
      ? "bg-danger"
      : variant === "warning"
      ? "bg-warning text-dark"
      : "bg-secondary";

  return (
    <div
      className="list-group-item d-flex justify-content-between align-items-center clickable py-3"
      role="button"
      onClick={onClick}
    >
      <div className="d-flex align-items-center gap-3">
        <span className={`${color}`} style={{ fontSize: 18 }}>
          {icon}
        </span>
        <span className="fw-medium">
          {label}
        </span>
      </div>

      <span className={`badge ${badge} fs-6`}>
        {value}
      </span>
    </div>
  );
}


/* ============================= */
/* EMPTY STATE */
/* ============================= */

function AllClear() {
  return (
    <div className="text-center py-4">
      <div className="mb-2 text-success">
        <CheckCircle size={32} />
      </div>
      <div className="fw-semibold">
        All clear
      </div>
      <div className="small text-muted">
        No admin action required at this time.
      </div>
    </div>
  );
}

