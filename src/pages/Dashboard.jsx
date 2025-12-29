// src/pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { fetchDashboardData } from "../api/dashboard.api";

import DashboardSnapshot from "./Snapshot";
import DashboardActions from "./ActionRequired";
import DashboardMomentum from "./Momentum";
import DashboardActivity from "./RecentActivity";

export default function Dashboard() {
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");
        const dashboardData = await fetchDashboardData(token);
        setData(dashboardData);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    if (token) loadDashboard();
  }, [token]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold">Admin Dashboard</h1>
        <p className="text-muted mb-0">
          System overview and operational control
        </p>
      </div>

      <DashboardSnapshot data={data.snapshot} />
      <DashboardActions data={data.actions} />
      <DashboardMomentum data={data.momentum} />
      <DashboardActivity data={data.activity} />
    </div>
  );
}
