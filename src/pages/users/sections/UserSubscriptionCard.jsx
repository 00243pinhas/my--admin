import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../auth/useAuth";

import {
  fetchUserSubscriptions,
  createUserSubscription,
} from "../../../api/usersApi";

import { fetchAdminSubscriptionPlans } from "../../../api/subscriptionPlansApi";

import ConfirmModal from "../../../ components/ConfirmModal";
import Toast from "../../../ components/Toast";

export default function UserSubscriptionCard({ userId }) {
  const { token } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [confirmAssign, setConfirmAssign] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3000);
  }

  async function load() {
    try {
      setLoading(true);

      const [subs, plansData] = await Promise.all([
        fetchUserSubscriptions(token, userId),
        fetchAdminSubscriptionPlans(token),
      ]);

      setSubscriptions(
        Array.isArray(subs?.subscriptions)
          ? subs.subscriptions
          : []
      );

      setPlans(
        Array.isArray(plansData?.plans)
          ? plansData.plans
          : []
      ); 

    } catch (err) {
      console.error(err);
      showToast("Failed to load subscription data", "error");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (!token || !userId) return;
    load();
  }, [token, userId]);

  const current = useMemo(() => {
    return subscriptions.find((s) => s.status === "active") || null;
  }, [subscriptions]);

  async function assignPlan() {
    if (!selectedPlanId) return;
    try {
      setAssigning(true);
      await createUserSubscription(token, userId, {
        subscriptionPlanId: selectedPlanId,
      });

      showToast("Subscription assigned successfully");
      setSelectedPlanId("");
      setConfirmAssign(false);

      await load();
    } catch (err) {
      console.error(err);
      showToast(
        err?.message || "Failed to assign subscription",
        "error"
      );
    } finally {
      setAssigning(false);
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Subscription</strong>
        {current ? (
          <span className="badge bg-success">active</span>
        ) : (
          <span className="badge bg-secondary">none</span>
        )}
      </div>

      <div className="card-body">
        {loading && <div className="text-muted">Loading…</div>}

        {!loading && (
          <>
            {/* CURRENT SUBSCRIPTION */}
            <div className="mb-3">
              {!current ? (
                <div className="text-muted">No active subscription</div>
              ) : (
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong>Plan:</strong> {current.subscriptionPlan?.name || "—"}
                  </li>
                  <li>
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">
                      {current.status}
                    </span>
                  </li>
                  <li>
                    <strong>Started:</strong>{" "}
                    {current.createdAt
                      ? new Date(current.createdAt).toLocaleDateString()
                      : "—"}
                  </li>
                  <li>
                    <strong>Ends:</strong>{" "}
                    {current.endsAt
                      ? new Date(current.endsAt).toLocaleDateString()
                      : "—"}
                  </li>
                </ul>
              )}
            </div>

            {/* ASSIGN SUBSCRIPTION (ADMIN ACTION) */}
            <div className="border-top pt-3">
              <div className="d-flex gap-2 flex-wrap align-items-end">
                <div style={{ minWidth: 260 }}>
                  <label className="form-label small mb-1">
                    Assign plan
                  </label>
                  <select
                    className="form-select"
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                  >
                    <option value="">Select a plan…</option>
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  disabled={!selectedPlanId || assigning}
                  onClick={() => setConfirmAssign(true)}
                >
                  {assigning ? "Assigning…" : "Assign"}
                </button>
              </div>

              <div className="text-muted small mt-2">
                Admin assigns a subscription directly (no payment flow).
              </div>
            </div>
          </>
        )}
      </div>

      {/* CONFIRM ASSIGN */}
      <ConfirmModal
        show={confirmAssign}
        title="Assign subscription"
        message="Are you sure you want to assign this plan to the user?"
        confirmLabel="Assign"
        confirmVariant="primary"
        loading={assigning}
        onConfirm={assignPlan}
        onCancel={() => setConfirmAssign(false)}
      />

      {/* TOAST */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </div>
  );
}
