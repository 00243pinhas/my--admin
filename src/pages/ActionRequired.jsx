import { DASHBOARD_ROUTES } from "./Dashboard/dashboard.routes";

import {
  HourglassSplit,
  ExclamationTriangle,
  CreditCard,
  ShieldExclamation,
  CheckCircle,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


export default function DashboardActions({ data }) {
  const navigate = useNavigate();

  const hasActions =
    data.pendingListings ||
    data.incompleteListings ||
    data.expiredSubscriptions ||
    data.flaggedUsers;

  return (
    <section className="mb-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex align-items-center mb-3">
            <div className="me-2 text-warning">
              <HourglassSplit size={20} />
            </div>
            <h5 className="mb-0 fw-semibold">Action Required</h5>
          </div>

          {/* Content */}
          {!hasActions ? (
            <AllClear />
          ) : (
            <div className="list-group list-group-flush">
              <ActionItem
                icon={<HourglassSplit />}
                label="Listings pending approval"
                value={data.pendingListings}
                onClick={() => navigate(DASHBOARD_ROUTES.pendingListings)}
              />

              <ActionItem
                icon={<ExclamationTriangle />}
                label="Incomplete listings"
                value={data.incompleteListings}
                variant="warning"
                onClick={() => navigate(DASHBOARD_ROUTES.incompleteListings)}
              />

              <ActionItem
                icon={<CreditCard />}
                label="Expired subscriptions"
                value={data.expiredSubscriptions}
                onClick={() => navigate(DASHBOARD_ROUTES.subscriptions)}
              />

              <ActionItem
                icon={<ShieldExclamation />}
                label="Flagged users"
                value={data.flaggedUsers}
                onClick={() => navigate(DASHBOARD_ROUTES.flaggedUsers)}
              />
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
  return (
    <div
      className={`list-group-item d-flex justify-content-between align-items-center ${
        variant === "warning" ? "list-group-item-warning" : ""
      }`}
      role="button"
      onClick={onClick}
    >
      <div className="d-flex align-items-center gap-2">
        <span className="text-muted">{icon}</span>
        <span>{label}</span>
      </div>

      <span className="badge bg-secondary rounded-pill">
        {value ?? "—"}
      </span>
    </div>
  );
}

/* ============================= */
/* EMPTY STATE */
/* ============================= */

function AllClear() {
  return (
    <div className="text-center py-4 text-muted">
      <div className="mb-2 text-success">
        <CheckCircle size={28} />
      </div>
      <div className="fw-medium">All clear</div>
      <div className="small">
        No actions are required at the moment.
      </div>
    </div>
  );
}
