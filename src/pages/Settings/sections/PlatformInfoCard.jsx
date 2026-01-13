export default function PlatformInfoCard() {
  return (
    <div className="card">
      <div className="card-header">
        <strong>Platform Information</strong>
      </div>

      <div className="card-body small">
        <ul className="list-unstyled mb-0">
          <li><strong>Platform:</strong> Dilli Admin</li>
          <li><strong>Environment:</strong> Production</li>
          <li><strong>Version:</strong> v1.0.0</li>
          <li><strong>Region:</strong> Global</li>
        </ul>
      </div>
    </div>
  );
}
