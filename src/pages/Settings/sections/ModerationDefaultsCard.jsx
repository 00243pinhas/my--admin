export default function ModerationDefaultsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <strong>Moderation Defaults</strong>
      </div>

      <div className="card-body small">
        <ul className="list-unstyled mb-0">
          <li>New listings require approval</li>
          <li>Incomplete listings are flagged</li>
          <li>Rejected listings are archived</li>
        </ul>
      </div>
    </div>
  );
}
