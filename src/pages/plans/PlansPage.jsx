import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";

import { fetchAdminPlans } from "../../api/plansApi";

import PlanAnalyticsSummary from "./sections/PlanAnalyticsSummary";
import PlansTable from "./sections/PlansTable";

export default function PlansPage() {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPlans() {
    try {
      setLoading(true);
      const data = await fetchAdminPlans(token);
      console.log(data);

      function normalizePlans(data) {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.plans)) return data.plans;
        if (Array.isArray(data?.data)) return data.data;
        return [];
      }
      setPlans(normalizePlans(data));
    } catch (err) {
      console.error("Failed to load plans", err);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    if (!token) return;
    loadPlans();
  }, [token]);

  return (
    <div className="container-fluid p-4">
      <div className="mb-3">
        <h4 className="mb-0">Subscription Plans</h4>
        <div className="text-muted small">
          Manage pricing plans and availability
        </div>
      </div>

      {/* 🔹 BUSINESS VIEW */}
      <PlanAnalyticsSummary />

      {/* 🔹 PLANS TABLE */}
      <PlansTable
        plans={plans}
        loading={loading}
        onReload={loadPlans}
      />
    </div>
  );
}
