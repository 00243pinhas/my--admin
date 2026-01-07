import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/useAuth";

import {
  fetchAdminUserSubscriptions,
  updateAdminUserSubscription,
} from "../../api/adminSubscriptionsApi";

import ConfirmModal from "../../ components/ConfirmModal";
import Toast from "../../ components/Toast";

function normalizeSubs(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.subscriptions)) return data.subscriptions;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function badgeForStatus(status) {
  const s = (status || "").toLowerCase();
  if (s === "active") return "bg-success";
  if (s === "canceled" || s === "cancelled") return "bg-secondary";
  if (s === "expired") return "bg-dark";
  if (s === "pending") return "bg-warning text-dark";
  return "bg-light text-dark";
}

export default function SubscriptionsPage() {
  const { token } = useAuth();

  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: "",
    planId: "",
    search: "",
  });

  const [cancelTarget, setCancelTarget] = useState(null);
  const [canceling, setCanceling] = useState(false);

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
      const data = await fetchAdminUserSubscriptions(token);
      setSubs(normalizeSubs(data));
    } catch (err) {
      console.error(err);
      showToast("Failed to load subscriptions", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Build plan dropdown options from loaded subscriptions (fast + no extra API)
  const planOptions = useMemo(() => {
    const map = new Map();
    subs.forEach((s) => {
      const p = s.plan || s.subscriptionPlan || s.subscription_plan;
      const id = p?.id || s.subscriptionPlan_id || s.subscriptionPlanId;
      const name = p?.name || p?.title || "Plan";
      if (id) map.set(id, name);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [subs]);

  const visibleSubs = useMemo(() => {
    let items = [...subs];

    if (filters.status) {
      items = items.filter(
        (s) => (s.status || "").toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.planId) {
      items = items.filter((s) => {
        const p = s.plan || s.subscriptionPlan || s.subscription_plan;
        const id = p?.id || s.subscriptionPlan_id || s.subscriptionPlanId;
        return id === filters.planId;
      });
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      items = items.filter((s) => {
        const u = s.user || s.owner;
        const email = (u?.email || "").toLowerCase();
        const userId = (u?.id || s.userId || "").toLowerCase();
        const subId = (s.id || "").toLowerCase();
        const planName = (
          (s.plan || s.subscriptionPlan || s.subscription_plan)?.name || ""
        )
          .toLowerCase();

        return (
          email.includes(q) ||
          userId.includes(q) ||
          subId.includes(q) ||
          planName.includes(q)
        );
      });
    }

    return items;
  }, [subs, filters]);

  const counts = useMemo(() => {
    const c = { total: subs.length, active: 0, canceled: 0, expired: 0 };
    subs.forEach((s) => {
      const st = (s.status || "").toLowerCase();
      if (st === "active") c.active += 1;
      else if (st === "canceled" || st === "cancelled") c.canceled += 1;
      else if (st === "expired") c.expired += 1;
    });
    return c;
  }, [subs]);

  async function confirmCancel() {
    if (!cancelTarget) return;

    try {
      setCanceling(true);

      // ✅ Admin cancel via PATCH update
      // NOTE: backend enum might be "canceled" or "cancelled".
      await updateAdminUserSubscription(token, cancelTarget.id, {
        status: "canceled",
      });

      showToast("Subscription canceled");
      setCancelTarget(null);
      await load();
    } catch (err) {
      console.error(err);
      showToast(
        err?.message || "Failed to cancel subscription",
        "error"
      );
    } finally {
      setCanceling(false);
    }
  }

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <h4 className="mb-0">Subscriptions</h4>
          <div className="text-muted small">
            System-wide subscription records (admin)
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <span className="badge bg-light text-dark">
            Total: {counts.total}
          </span>
          <span className="badge bg-success">
            Active: {counts.active}
          </span>
          <span className="badge bg-secondary">
            Canceled: {counts.canceled}
          </span>
          <span className="badge bg-dark">
            Expired: {counts.expired}
          </span>
        </div>
      </div>

      {/* FILTERS */}
      <div className="card mb-3">
        <div className="card-body d-flex gap-3 flex-wrap">
          <input
            className="form-control"
            placeholder="Search by user email, user ID, subscription ID, plan name…"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
          />

          <select
            className="form-select"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
            style={{ maxWidth: 220 }}
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="canceled">Canceled</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>

          <select
            className="form-select"
            value={filters.planId}
            onChange={(e) =>
              setFilters((f) => ({ ...f, planId: e.target.value }))
            }
            style={{ maxWidth: 260 }}
          >
            <option value="">All plans</option>
            {planOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              setFilters({ status: "", planId: "", search: "" })
            }
          >
            Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <div className="p-4 text-muted">Loading subscriptions…</div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Period</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleSubs.map((s) => {
                  const u = s.user || s.owner || {};
                  const plan = s.plan || s.subscriptionPlan || s.subscription_plan || {};
                  const startsAt = s.startsAt || s.startedAt || s.start_date;
                  const endsAt = s.endsAt || s.end_date || s.expiresAt;

                  return (
                    <tr key={s.id}>
                      <td>
                        <div className="fw-medium">{u.email || "—"}</div>
                        <div className="text-muted small">
                          User: {u.id || s.userId || "—"}
                        </div>
                        <div className="text-muted small">
                          Sub: {s.id}
                        </div>
                      </td>

                      <td>
                        <div className="fw-medium">{plan.name || "—"}</div>
                        <div className="text-muted small">
                          Plan ID: {plan.id || s.subscriptionPlan_id || "—"}
                        </div>
                      </td>

                      <td>
                        <span className={`badge ${badgeForStatus(s.status)}`}>
                          {s.status || "unknown"}
                        </span>
                      </td>

                      <td className="text-muted small">
                        <div>
                          <strong>Start:</strong>{" "}
                          {startsAt ? new Date(startsAt).toLocaleDateString() : "—"}
                        </div>
                        <div>
                          <strong>End:</strong>{" "}
                          {endsAt ? new Date(endsAt).toLocaleDateString() : "—"}
                        </div>
                      </td>

                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2 flex-wrap">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled
                            title="Details page can be added later"
                          >
                            View
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            disabled={(s.status || "").toLowerCase() !== "active"}
                            onClick={() => setCancelTarget(s)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {visibleSubs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      No subscriptions match the current filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CANCEL CONFIRM */}
      <ConfirmModal
        show={!!cancelTarget}
        title="Cancel subscription"
        message="Cancel this active subscription? The user will lose access according to subscription rules."
        confirmLabel="Cancel subscription"
        confirmVariant="danger"
        loading={canceling}
        onConfirm={confirmCancel}
        onCancel={() => setCancelTarget(null)}
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
