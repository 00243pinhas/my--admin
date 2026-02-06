import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

import { fetchAllUsers } from "../../api/usersApi";
import { fetchAllListings } from "../../api/listingsApi";
import { fetchBasicDashboardStats, fetchActionRequired } from "../../api/dashboard.api";
import { fetchAdminUserSubscriptions } from "../../api/adminSubscriptionsApi";

import { countLastNDays } from "../../outils/dateStats";
import { buildRecentActivity } from "../../outils/activity";
import { buildListingsStatusTimeline } from "../../outils/listingsStats";

import DashboardMomentum from "./sections/Momentum";
import DashboardActivity from "./sections/RecentActivity";
import DashboardActions from "./sections/ActionRequired";
import ListingsStatusChart from "../../ components/ListingsStatusChart";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Only raw data in state (1 state update per fetch)
  const [raw, setRaw] = useState({
    basic: null,
    ar: null,
    listings: [],
    users: [],
    subscriptions: [],
  });

  useEffect(() => {
    if (!token) return;

    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [basic, ar, listingsRes, usersRes, subsRes] = await Promise.all([
          fetchBasicDashboardStats(token),
          fetchActionRequired(token),
          fetchAllListings(token),
          fetchAllUsers(token),
          fetchAdminUserSubscriptions(token),
        ]);

        if (ignore) return;

        const listings = Array.isArray(listingsRes)
          ? listingsRes
          : listingsRes?.listings || [];

        const users = Array.isArray(usersRes) ? usersRes : [];

        const subscriptions = Array.isArray(subsRes)
          ? subsRes
          : subsRes?.subscriptions || [];

        setRaw({ basic, ar, listings, users, subscriptions });
      } catch (e) {
        if (!ignore) {
          console.error(e);
          setError("Failed to load dashboard");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [token]);

  // ✅ Derived data (no extra setState)
  const stats = useMemo(() => {
    const { basic, listings, users, subscriptions, ar } = raw;

    return {
      totalUsers: basic?.totalUsers ?? users.length ?? 0,
      totalListings: basic?.totalListings ?? listings.length ?? 0,
      activeListings: listings.filter((l) => l.status === "active").length,
      pendingListings: basic?.pendingListings ?? listings.filter((l) => l.status === "pending").length,
      incompleteListings: ar?.incompleteCount ?? 0,
      subscriptions: subscriptions.length ?? 0,
    };
  }, [raw]);

  const actionRequired = useMemo(() => {
    return {
      pending: raw.ar?.pendingCount ?? 0,
      incomplete: raw.ar?.incompleteCount ?? 0,
    };
  }, [raw.ar]);

  const chartData = useMemo(() => {
    if (!raw.listings?.length) return [];
    return buildListingsStatusTimeline(raw.listings, 14);
  }, [raw.listings]);

  const recentActivity = useMemo(() => {
    return buildRecentActivity({
      listings: raw.listings,
      users: raw.users,
      subscriptions: raw.subscriptions,
      hours: 24,
      limit: 8,
    });
  }, [raw.listings, raw.users, raw.subscriptions]);

  const momentum = useMemo(() => {
    const listings = raw.listings;
    const users = raw.users;
    const subscriptions = raw.subscriptions;

    const cutoff = Date.now() - 7 * 86400000;

    const approvedListings7d = listings.filter((l) => {
      if (l.status !== "active") return false;
      if (!l.updatedAt) return false;
      const time = new Date(l.updatedAt).getTime();
      return !Number.isNaN(time) && time >= cutoff;
    }).length;

    return {
      newUsers7d: countLastNDays(users, "createdAt", 7),
      newListings7d: countLastNDays(listings, "createdAt", 7),
      approvedListings7d,
      subscriptions7d: countLastNDays(subscriptions, "createdAt", 7),
    };
  }, [raw.listings, raw.users, raw.subscriptions]);

  if (loading) return <div className="p-4">Loading dashboard…</div>;
  if (error) return <div className="p-4 text-danger">{error}</div>;

  return (
    <div className="container-fluid p-4">
      <div className="row g-3 mb-4">
        <StatCard label="Users" value={stats.totalUsers} onClick={() => navigate("/dashboard/users")} />
        <StatCard label="Listings" value={stats.totalListings} onClick={() => navigate("/dashboard/listings")} />
        <StatCard label="Active Listings" value={stats.activeListings} />
        <StatCard
          label="Pending"
          value={stats.pendingListings}
          highlight="warning"
          onClick={() => navigate("/dashboard/listings?status=pending")}
        />
        <StatCard
          label="Incomplete"
          value={stats.incompleteListings}
          highlight="danger"
          onClick={() => navigate("/dashboard/listings?incomplete=true")}
        />
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

      <DashboardMomentum data={momentum} />

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
        className={`card border-0 shadow-sm h-100 ${bg} ${onClick ? "clickable" : ""}`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
      >
        <div className="card-body">
          <div className="fw-semibold">{value}</div>
          <div className="small">{label}</div>
        </div>
      </div>
    </div>
  );
}
