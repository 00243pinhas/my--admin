export default function FeatureFlagsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <strong>Feature Flags</strong>
      </div>

      <div className="card-body small">
        <ul className="list-unstyled mb-0">
          <li>Subscriptions: <span className="badge bg-success">Enabled</span></li>
          <li>Listings Moderation: <span className="badge bg-success">Enabled</span></li>
          <li>Languages: <span className="badge bg-warning text-dark">Partial</span></li>
          <li>Advanced Analytics: <span className="badge bg-secondary">Coming soon</span></li>
        </ul>
      </div>
    </div>
  );
}
