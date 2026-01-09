import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { fetchAllUsers } from "../../api/usersApi";
import { countLastNDays } from "../../outils/dateStats";
import DashboardMomentum from "./sections/Momentum";


import {
  fetchBasicDashboardStats,
  fetchActionRequired,
} from "../../api/dashboard.api";
import { fetchAllListings } from "../../api/listingsApi";
import { buildListingsStatusTimeline } from "../../outils/listingsStats";
import ListingsStatusChart from "../../ components/ListingsStatusChart";

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

  const [listings, setListings] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [momentum, setMomentum] = useState({
  users: "—",
  listings: "—",
  approved: "—",
  subscriptions: "—",
});


  /* ===========================
     LOAD DASHBOARD DATA
  =========================== */
  useEffect(() => {
  if (!token) return;

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      /* ===========================
         BASIC STATS
      =========================== */
      const basic = await fetchBasicDashboardStats(token);
      const ar = await fetchActionRequired(token);

      setStats({
        totalUsers: basic.totalUsers,
        totalListings: basic.totalListings,
        activeListings: basic.totalListings - basic.pendingListings,
        pendingListings: basic.pendingListings,
        incompleteListings: ar.incompleteCount,
        subscriptions: 0, // v1 placeholder (truthful)
      });

      setActionRequired({
        pending: ar.pendingCount,
        incomplete: ar.incompleteCount,
      });

      /* ===========================
         LISTINGS (USED BY MULTIPLE SECTIONS)
      =========================== */
      const listingsResponse = await fetchAllListings(token);
      const listingsArray = Array.isArray(listingsResponse)
        ? listingsResponse
        : listingsResponse?.listings || [];

      setListings(listingsArray);

      /* ===========================
         SYSTEM HEALTH GRAPH
      =========================== */
      const timeline = buildListingsStatusTimeline(listingsArray, 14);
      setChartData(timeline);

      /* ===========================
         USERS (FOR MOMENTUM)
      =========================== */
      const usersResponse = await fetchAllUsers(token);
      const usersArray = Array.isArray(usersResponse)
        ? usersResponse
        : [];

      /* ===========================
         PLATFORM MOMENTUM (7 DAYS)
      =========================== */
      const newUsers7d = countLastNDays(
        usersArray,
        "created_at",
        7
      );

      const newListings7d = countLastNDays(
        listingsArray,
        "created_at",
        7
      );

      const approvedListings7d = listingsArray.filter(
        (l) =>
          l.status === "active" &&
          l.updated_at &&
          new Date(l.updated_at) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length;

      setMomentum({
        newUsers7d,
        newListings7d,
        approvedListings7d,
        subscriptions7d: null, // honest placeholder
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
  if (loading) return <div className="p-4">Loading dashboard…</div>;
  if (error) return <div className="p-4 text-danger">{error}</div>;

  /* ===========================
     RENDER
  =========================== */
  return (
    <div className="container-fluid">

      {/* SNAPSHOT CARDS */}
      <div className="row g-3 mb-4">
        <StatCard label="Users" value={stats.totalUsers}
          onClick={() => navigate("/dashboard/users")} />

        <StatCard label="Listings" value={stats.totalListings}
          onClick={() => navigate("/dashboard/listings")} />

        <StatCard label="Active Listings" value={stats.activeListings} />

        <StatCard label="Pending" value={stats.pendingListings}
          highlight="warning"
          onClick={() => navigate("/dashboard/listings?status=pending")} />

        <StatCard label="Incomplete" value={stats.incompleteListings}
          highlight="danger"
          onClick={() => navigate("/dashboard/listings?incomplete=true")} />

        <StatCard label="Subscriptions" value={stats.subscriptions} />
      </div>

      {/* ACTION REQUIRED */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">⚠️ Action Requireddd</h6>

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
                <li className="list-group-item d-flex justify-content-between clickable"
                  onClick={() => navigate("/dashboard/listings?status=pending")}>
                  Pending listings
                  <span className="badge bg-warning text-dark">
                    {actionRequired.pending}
                  </span>
                </li>
              )}

              {actionRequired.incomplete > 0 && (
                <li className="list-group-item d-flex justify-content-between clickable"
                  onClick={() => navigate("/dashboard/listings?incomplete=true")}>
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

      {/* PLATFORM MOMENTUM (v1 placeholder) */}
      <DashboardMomentum data={momentum} />


      {/* SYSTEM HEALTH GRAPH */}
      <div className="mb-4">
        <ListingsStatusChart data={chartData} />
      </div>

      {/* RECENT ACTIVITY (future-ready) */}
      <div className="card border-0 shadow-sm">
        <div className="card-body text-muted small">
          Recent activity will appear here.
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
