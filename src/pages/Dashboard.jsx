import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

import {
  fetchBasicDashboardStats,
  fetchActionRequired,
} from "../api/dashboard.api";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  /* ===========================
     STATE
  =========================== */
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    activeListings: 0,
    pendingListings: 0,
    incompleteListings: 0,
    subscriptions: 0,
  });

  const [actionRequired, setActionRequired] = useState({
    pending: 0,
    incomplete: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===========================
     LOAD DASHBOARD DATA
  =========================== */
  useEffect(() => {
    if (!token) return;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const basic = await fetchBasicDashboardStats(token);
        const ar = await fetchActionRequired(token);

        setStats({
          totalUsers: basic.totalUsers,
          totalListings: basic.totalListings,
          activeListings: basic.totalListings - basic.pendingListings,
          pendingListings: basic.pendingListings,
          incompleteListings: ar.incompleteCount,
          subscriptions: 0,
        });

        setActionRequired({
          pending: ar.pendingCount,
          incomplete: ar.incompleteCount,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  /* ===========================
     STATES
  =========================== */
  if (loading) {
    return <div className="p-4">Loading dashboard…</div>;
  }

  if (error) {
    return <div className="p-4 text-danger">{error}</div>;
  }

  /* ===========================
     RENDER
  =========================== */
  return (
    <div className="container-fluid">

      {/* ===========================
          HEADER
      =========================== */}
      <div className="mb-4">
        <h1 className="h4 fw-semibold mb-1">Admin Dashboard</h1>
        <p className="text-muted mb-0">
          System overview and operational control
        </p>
      </div>

      {/* ===========================
          SNAPSHOT CARDS
      =========================== */}
      <div className="row g-3 mb-4">

        <StatCard
          label="Users"
          value={stats.totalUsers}
          onClick={() => navigate("/dashboard/users")}
        />

        <StatCard
          label="Listings"
          value={stats.totalListings}
          onClick={() => navigate("/dashboard/listings")}
        />

        <StatCard
          label="Active Listings"
          value={stats.activeListings}
        />

        <StatCard
          label="Pending"
          value={stats.pendingListings}
          highlight="warning"
          onClick={() =>
            navigate("/dashboard/listings?status=pending")
          }
        />

        <StatCard
          label="Incomplete"
          value={stats.incompleteListings}
          highlight="danger"
          onClick={() =>
            navigate("/dashboard/listings?incomplete=true")
          }
        />

        <StatCard
          label="Subscriptions"
          value={stats.subscriptions}
        />

      </div>

      {/* ===========================
          ACTION REQUIRED
      =========================== */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">

          <h6 className="fw-semibold mb-3">
            ⚠️ Action Required
          </h6>

          {actionRequired.pending === 0 &&
          actionRequired.incomplete === 0 ? (
            <div className="text-center text-muted py-4">
              <div className="fs-4 mb-2">✔</div>
              <div>All clear</div>
              <small>No actions are required at the moment.</small>
            </div>
          ) : (
            <ul className="list-group list-group-flush">

              {actionRequired.pending > 0 && (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center clickable"
                  onClick={() =>
                    navigate("/dashboard/listings?status=pending")
                  }
                >
                  Pending listings
                  <span className="badge bg-warning text-dark">
                    {actionRequired.pending}
                  </span>
                </li>
              )}

              {actionRequired.incomplete > 0 && (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center clickable"
                  onClick={() =>
                    navigate("/dashboard/listings?incomplete=true")
                  }
                >
                  Incomplete listings
                  <span className="badge bg-danger">
                    {actionRequired.incomplete}
                  </span>
                </li>
              )}

            </ul>
          )}
        </div>
      </div>

      {/* ===========================
          PLATFORM MOMENTUM
      =========================== */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-3">
          Platform Momentum (7 days)
        </h6>

        <div className="row g-3">
          <MomentumCard label="New Users" value={0} />
          <MomentumCard label="New Listings" value={0} />
          <MomentumCard label="Approved Listings" value={0} />
          <MomentumCard label="New Subscriptions" value={0} />
        </div>
      </div>

      {/* ===========================
          RECENT ACTIVITY
      =========================== */}
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center text-muted py-4">
          Recent activity feed will be connected next
        </div>
      </div>

    </div>
  );
}

/* ===========================
   SUB COMPONENTS
=========================== */

function StatCard({ label, value, onClick, highlight }) {
  const bg =
    highlight === "warning"
      ? "bg-warning text-dark"
      : highlight === "danger"
      ? "bg-danger text-white"
      : "";

  return (
    <div className="col-6 col-md-4 col-xl-2">
      <div
        className={`card border-0 shadow-sm h-100 ${bg} clickable`}
        onClick={onClick}
      >
        <div className="card-body">
          <div className="fw-semibold">{value}</div>
          <div className="small">{label}</div>
        </div>
      </div>
    </div>
  );
}

function MomentumCard({ label, value }) {
  return (
    <div className="col-6 col-md-3">
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center">
          <div className="fw-semibold">{value}</div>
          <div className="small text-muted">{label}</div>
        </div>
      </div>
    </div>
  );
}
