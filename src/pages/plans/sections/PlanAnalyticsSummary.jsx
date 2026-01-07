import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import axios from "axios";
import { API_BASE } from "../../../api/config";

export default function PlanAnalyticsSummary() {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${API_BASE}/subscription-plans/admin/analytics/popular`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setData(res.data.data || []);
      } catch (err) {
        console.error("Analytics failed", err);
      } finally {
        setLoading(false);
      }
    }

    if (token) load();
  }, [token]);
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Plan Analytics</strong>
      </div>

      <div className="card-body">
        {loading && <div className="text-muted">Loading…</div>}

        {!loading && data.length === 0 && (
          <div className="text-muted">No analytics available</div>
        )}

        {!loading && (
          <div className="row g-3">
            {data.map((p) => (
              <div key={p.planId} className="col-md-4">
                <div className="border rounded p-3 h-100">
                  <div className="fw-medium">{p.name}</div>
                  <div className="text-muted small">
                    Active: {p.sortOrder}      {/* ToDo not the right data display  */}
                  </div>
                  <div className="text-muted small">
                    Total: {p.user_count}     {/* ToDo not the right data display  */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
