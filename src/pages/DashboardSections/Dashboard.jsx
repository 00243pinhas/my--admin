import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { fetchAllUsers } from "../../api/usersApi";
import { countLastNDays } from "../../outils/dateStats";
import DashboardMomentum from "./sections/Momentum";
import DashboardActivity from "./sections/RecentActivity";
import { buildRecentActivity } from "../../outils/activity";
import DashboardActions from "./sections/ActionRequired";
import {
  fetchBasicDashboardStats,
  fetchActionRequired,
} from "../../api/dashboard.api";
import { fetchAllListings } from "../../api/listingsApi";
import { buildListingsStatusTimeline } from "../../outils/listingsStats";
import ListingsStatusChart from "../../ components/ListingsStatusChart";
import {fetchAdminUserSubscriptions} from "../../api/adminSubscriptionsApi"




export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();


  const [rawData, setRawData] = useState(null);


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

  const [momentum, setMomentum] = useState({
    newUsers7d: "—",
    newListings7d: "—",
    approvedListings7d: "—",
    subscriptions7d: "—",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentActivity, setRecentActivity] = useState([]);


useEffect(() => {
  if (!token) return;

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [
        basic,
        ar,
        listingsRes,
        usersRes,
        subscriptionsRes,
      ] = await Promise.all([
        fetchBasicDashboardStats(token),
        fetchActionRequired(token),
        fetchAllListings(token),
        fetchAllUsers(token),
        fetchAdminUserSubscriptions(token),
      ]);

      const listingsArray = Array.isArray(listingsRes)
        ? listingsRes
        : listingsRes?.listings || [];

      const usersArray = Array.isArray(usersRes)
        ? usersRes
        : [];

      const subscriptionsArray = Array.isArray(subscriptionsRes)
        ? subscriptionsRes
        : subscriptionsRes?.subscriptions || [];

      setRawData({
        basic,
        ar,
        listings: listingsArray,
        users: usersArray,
        subscriptions: subscriptionsArray,
      });

    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, [token]);


  console.log(listings);

  useEffect(() => {
  if (!rawData) return;

  const { basic, ar, listings, users, subscriptions } = rawData;

  /* ===========================
     SNAPSHOT STATS
  =========================== */
  setStats({
    totalUsers: basic.totalUsers ?? 0,
    totalListings: basic.totalListings ?? 0,
    pendingListings: basic.pendingListings ?? 0,
    rejectedListings: basic.rejectedListings ?? 0,
    incompleteListings: ar.incompleteCount ?? 0,
    subscriptions: subscriptions.length ?? 0,
  });

  setActionRequired({
    pending: ar.pendingCount,
    incomplete: ar.incompleteCount,
  });

  setListings(listings);

  setChartData(
    buildListingsStatusTimeline(listings, 14)
  );

  console.log("subscriptions",subscriptions)

setRecentActivity(
  buildRecentActivity({
    listings,
    users,
    subscriptions,
    hours: 24,
    limit: 8,
  })
);



  /* ===========================
     PLATFORM MOMENTUM (7 DAYS)
  =========================== */
  const cutoff = Date.now() - 7 * 86400000;

  const approvedListings7d = listings.filter((l) => {
    if (l.status !== "active") return false;
    if (!l.updatedAt) return false;

    const time = new Date(l.updatedAt).getTime();
    return !Number.isNaN(time) && time >= cutoff;
  }).length;

  setMomentum({
    newUsers7d: countLastNDays(users, "createdAt", 7),
    newListings7d: countLastNDays(listings, "createdAt", 7),
    approvedListings7d,
    subscriptions7d: countLastNDays(
      subscriptions,
      "createdAt",
      7
    ),
  });
}, [rawData]);



  // console.log("recentActivity", recentActivity);

  if (loading) return <div className="p-4">Loading dashboard…</div>;
  if (error) return <div className="p-4 text-danger">{error}</div>;


  return (
    <div className="container-fluid p-4">

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

 
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">

          <DashboardActions
            data={{
              pendingListings: actionRequired.pending,
              incompleteListings: actionRequired.incomplete,
              expiredSubscriptions: 0, 
              flaggedUsers: 0,        
            }}
          />

        </div>
      </div>

      {/* PLATFORM MOMENTUM (v1 placeholder) */}
      <DashboardMomentum data={momentum} />

      {/* RECENT ACTIVITY (future-ready) */}

      {/* SYSTEM HEALTH GRAPH */}
      <div className="mb-4">
        <ListingsStatusChart data={chartData} />
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body text-muted small">
          <DashboardActivity items={recentActivity} />
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

// function MomentumCard({ label, value }) {
//   return (
//     <div className="col-6 col-md-3">
//       <div className="card border-0 shadow-sm">
//         <div className="card-body text-center">
//           <div className="fw-semibold">{value}</div>
//           <div className="small text-muted">{label}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
