export default function SystemMetaCard() {
  return (
    <div className="card">
      <div className="card-header">
        <strong>System Metadata</strong>
      </div>

      <div className="card-body small">
        <ul className="list-unstyled mb-0">
          <li>Last deployment: 2026-01-06</li>
          <li>API base: /api/v1</li>
          <li>Logging: Enabled</li>
        </ul>
      </div>
    </div>
  );
}
