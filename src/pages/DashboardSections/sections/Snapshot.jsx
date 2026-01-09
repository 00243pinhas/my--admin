// DashboardSnapshot.jsx
import {
    People,
    ListUl,
    CheckCircle,
  HourglassSplit,
  ExclamationTriangle,
  CreditCard
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../Dashboard/dashboard.routes";

export default function DashboardSnapshot({ data }) {
  const navigate = useNavigate();

  return (
    <section className="mb-4">
      
      <div className="row g-4">
        <Stat
          label="Users"
          value={data.totalUsers}
          icon={<People size={22} />}
          color="primary"
          onClick={() => navigate(DASHBOARD_ROUTES.users)}
        />

        <Stat
          label="Listings"
          value={data.totalListings}
          icon={<ListUl size={22} />}
          color="purple"
          onClick={() => navigate(DASHBOARD_ROUTES.listings)}
        />

        <Stat
          label="Active Listings"
          value={data.activeListings}
          icon={<CheckCircle size={22} />}
          color="success"
          onClick={() => navigate(DASHBOARD_ROUTES.listings)}
        />

        <Stat
          label="Pending"
          value={data.pendingListings}
          icon={<HourglassSplit size={22} />}
          color="warning"
          onClick={() => navigate(DASHBOARD_ROUTES.pendingListings)}
        />

        <Stat
          label="Incomplete"
          value={data.incompleteListings}
          icon={<ExclamationTriangle size={22} />}
          color="amber"
          onClick={() => navigate(DASHBOARD_ROUTES.incompleteListings)}
        />

        <Stat
          label="Subscriptions"
          value={data.activeSubscriptions}
          icon={<CreditCard size={22} />}
          color="teal"
          onClick={() => navigate(DASHBOARD_ROUTES.subscriptions)}
        />
      </div>
    </section>
  );
}

function Stat({ label, value, icon, color, onClick }) {
  return (
    <div className="col-6 col-md-4 col-xl-2">
      <div
        className="card h-100 shadow-sm border-0 stat-card"
        role="button"
        onClick={onClick}
      >
        <div className="card-body d-flex flex-column">
          {/* ICON BADGE (ONLY COLORED ELEMENT) */}
          <div className={`stat-icon bg-${color} text-white mb-3`}>
            {icon}
          </div>

          {/* NUMBER */}
          <div className="fs-3 fw-bold mb-1">
            {value ?? "—"}
          </div>

          {/* LABEL */}
          <div className="text-muted small">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

