export default function SubscriptionPeriodCard({ subscription }) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>Period</strong>
      </div>

      <div className="card-body small">
        <div>
          <strong>Start:</strong>{" "}
          {subscription.startsAt
            ? new Date(subscription.startsAt).toLocaleDateString()
            : "—"}
        </div>
        <div>
          <strong>End:</strong>{" "}
          {subscription.endsAt
            ? new Date(subscription.endsAt).toLocaleDateString()
            : "—"}
        </div>
        <div className="text-muted mt-2">
          Created at:{" "}
          {subscription.createdAt
            ? new Date(subscription.createdAt).toLocaleString()
            : "—"}
        </div>
      </div>
    </div>
  );
}
