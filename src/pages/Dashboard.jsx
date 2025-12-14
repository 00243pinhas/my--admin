// src/pages/Dashboard.jsx
import "./dashboard.css";
import {  useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import {fetchBasicDashboardStats} from "../api/dashboardApi";
import { useNavigate } from "react-router-dom";





export default function Dashboard() {

  const {token} = useAuth();

const [stats, setStats] = useState({
  totalListings: 0,
  totalUsers: 0,
  pendingListings: 0,
  rejectedListings: 0,
});


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");




  useEffect(() => {
    async function loadStats() {

      try {
        setLoading(true);
        setError("");
        const data = await fetchBasicDashboardStats(token);
        setStats(data);

      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }

    }if (token) {
    loadStats();
    }
  },[token]);

    if (loading) {
    return <div className="dashboard-container">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-container">{error}</div>;
  }


  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">Error: {error}</div>;
  }
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dilli Admin Dashboard</h1>

      <div className="stats-grid">

          <StatCard
            number={stats.totalListings}
            label="Total Listings"
            to="/dashboard/listings"
          />

         <StatCard
          number={stats.totalUsers}
          label="Total Users"
          to="/dashboard/users"
          />



          <StatCard
            number={stats.pendingListings}
            label="Pending Listings"
            to="/dashboard/listings?status=pending"
          />

          <StatCard
            number={stats.rejectedListings}
            label="Rejected Listings"
            to="/dashboard/listings?status=rejected"
          />

      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Recent Activity</h2>
        <p>We’ll plug real recent activity here in the next step.</p>
      </div>
    </div>
    );


}


function StatCard({ number, label, to }) {
  const navigate = useNavigate();

  return (
    <div
      className="stat-card clickable"
      onClick={() => to && navigate(to)}
      style={{ cursor: to ? "pointer" : "default" }}
    >
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}