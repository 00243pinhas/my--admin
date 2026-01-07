export default function SubscriptionPlanCard({ subscription }) {
  const plan = subscription || {};

  console.log(plan)

  return (
    <div className="card h-100">
      <div className="card-header">
        <strong>Plan</strong>
      </div>

      <div className="card-body">
        <div className="fw-medium">{plan.subscriptionPlan?.name || "—"}</div>
        <div className="text-muted small">
          Plan ID: {plan.subscriptionPlan_id || "—"}
        </div>

        <ul className="list-unstyled small mt-3 mb-0">
          <li>
            <strong>Price:</strong>{" "}
            {plan.subscriptionPlan?.price
              ? `${plan.subscriptionPlan?.price} ${plan.currency || "$"}`
              : "—"}
          </li>
          <li>
            <strong>Duration:</strong>{" "}
            {plan.subscriptionPlan?.durationDays
              ? `${plan.subscriptionPlan?.durationDays} days`
              : "—"}
          </li>
        </ul>
      </div>
    </div>
  );
}
