import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

import {
  fetchAdminUserSubscriptionById,
  updateAdminUserSubscription,
} from "../../api/adminSubscriptionsApi";

import SubscriptionHeader from "./sections/SubscriptionHeader";
import SubscriptionUserCard from "./sections/SubscriptionUserCard";
import SubscriptionPlanCard from "./sections/SubscriptionPlanCard";
import SubscriptionPeriodCard from "./sections/SubscriptionPeriodCard";
import SubscriptionActivity from "./sections/SubscriptionActivity";

import ConfirmModal from "../../components/ConfirmModal";
import Toast from "../../components/Toast";

export default function SubscriptionDetailsPage() {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
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
      const data = await fetchAdminUserSubscriptionById(
        token,
        subscriptionId
      );
      setSubscription(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load subscription", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    load();
  }, [token, subscriptionId]);

  async function cancelSubscription() {
    try {
      setCanceling(true);
      await updateAdminUserSubscription(token, subscription.id, {
        status: "canceled",
      });
      showToast("Subscription canceled");
      navigate("/dashboard/subscriptions");
    } catch (err) {
      console.error(err);
      showToast("Failed to cancel subscription", "error");
    } finally {
      setCanceling(false);
    }
  }

  if (loading) return <div className="p-4">Loading…</div>;
  if (!subscription) return null;

  return (
    <div className="container-fluid">
      <SubscriptionHeader
        subscription={subscription}
        onCancel={() => setCanceling(true)}
      />

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-6">
          <SubscriptionUserCard subscription={subscription} />
        </div>

        <div className="col-12 col-lg-6">
          <SubscriptionPlanCard subscription={subscription} />
        </div>

        <div className="col-12">
          <SubscriptionPeriodCard subscription={subscription} />
        </div>

        <div className="col-12">
          <SubscriptionActivity />
        </div>
      </div>

      <ConfirmModal
        show={canceling}
        title="Cancel subscription"
        message="Cancel this subscription? This action affects user access."
        confirmLabel="Cancel subscription"
        confirmVariant="danger"
        loading={canceling}
        onConfirm={cancelSubscription}
        onCancel={() => setCanceling(false)}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((t) => ({ ...t, show: false }))
        }
      />
    </div>
  );
}
