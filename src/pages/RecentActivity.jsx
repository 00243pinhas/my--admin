import { ClockHistory } from "react-bootstrap-icons";

export default function DashboardActivity({ data }) {
  const hasActivity =
    data?.listings?.length ||
    data?.users?.length ||
    data?.subscriptions?.length;

  return (
    <section>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex align-items-center mb-3">
            <div className="me-2 text-muted">
              <ClockHistory size={20} />
            </div>
            <h5 className="mb-0 fw-semibold">Recent Activity</h5>
          </div>

          {/* Content */}
          {!hasActivity ? (
            <EmptyState />
          ) : (
            <ActivityList data={data} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================= */
/* EMPTY STATE */
/* ============================= */

function EmptyState() {
  return (
    <div className="text-center py-5 text-muted">
      <div className="mb-2">
        <ClockHistory size={32} />
      </div>
      <div className="fw-medium">No recent activity yet</div>
      <div className="small">
        New users, listings, and approvals will appear here.
      </div>
    </div>
  );
}

/* ============================= */
/* FUTURE ACTIVITY LIST */
/* ============================= */

function ActivityList() {
  return (
    <div className="text-muted small">
      Activity feed coming next
    </div>
  );
}