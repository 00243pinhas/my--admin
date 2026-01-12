import { ClockHistory } from "react-bootstrap-icons";

export default function DashboardActivity({ items = [] }) {
  return (
    <section>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex align-items-center mb-3 text-muted">
            <ClockHistory size={18} className="me-2" />
            <h6 className="mb-0 fw-semibold">Recent Activity</h6>
          </div>

          {/* Content */}
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <ActivityList items={items} />
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
    <div className="text-center py-4 text-muted">
      <div className="mb-2">
        <ClockHistory size={28} />
      </div>
      <div className="fw-medium">No recent activity</div>
      <div className="small">
        New users, listings, and approvals will appear here.
      </div>
    </div>
  );
}


/* ============================= */
/* FUTURE ACTIVITY LIST */
/* ============================= */

function ActivityList({ items }) {
  return (
    <ul className="list-group list-group-flush">
      {items.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between small"
        >
          <span className="me-3">
            {item.href ? (
              <a href={item.href} className="text-decoration-none">
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </span>

          <span className="text-muted flex-shrink-0">
            {formatRelativeTime(item.timestamp)}
          </span>
        </li>
      ))}
    </ul>
  );
}



function formatRelativeTime(date) {
  const diff = Math.floor(
    (Date.now() - new Date(date).getTime()) / 60000
  );

  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

