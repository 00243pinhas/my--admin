// src/pages/Dashboard/DashboardMomentum.jsx
import {
  PersonPlus,
  FileEarmarkPlus,
  CheckCircle,
  CreditCard,
} from "react-bootstrap-icons";

export default function DashboardMomentum({ data }) {

  console.log(data);
  return (
    <section className="mb-4">
      <h5 className="fw-semibold mb-3">Platform Momentum (7 days)</h5>

      <div className="row g-4">
        <Metric
          label="New Users"
          value={data.newUsers7d}
          icon={<PersonPlus />}
        />

        <Metric
          label="New Listings"
          value={data.newListings7d}
          icon={<FileEarmarkPlus />}
        />

        <Metric
          label="Approved Listings"
          value={data.approvedListings7d}
          icon={<CheckCircle />}
        />

        <Metric
          label="New Subscriptions"
          value={data.subscriptions7d}
          icon={<CreditCard />}
        />
      </div>
    </section>
  );
}

/* ============================= */
/* MOMENTUM METRIC */
/* ============================= */

function Metric({ label, value, icon }) {
  return (
    <div className="col-6 col-md-3">
      <div className="card h-100 border-0 shadow-sm momentum-card">
        <div className="card-body text-center">
          <div className="momentum-icon text-muted mb-2">
            {icon}
          </div>

          <div className="fs-6 fw-bold">
            {value ?? "—"}
          </div>

          <div className="text-muted small">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
