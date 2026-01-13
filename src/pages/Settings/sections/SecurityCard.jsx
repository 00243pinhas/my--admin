export default function SecurityCard() {
  return (
    <div className="card">
      <div className="card-header">
        <strong>Security & Access</strong>
      </div>

      <div className="card-body small">
        <ul className="list-unstyled mb-0">
          <li>Authentication: OTP-based</li>
          <li>Admin Access: Restricted</li>
          <li>Role-Based Access Control: Enabled</li>
          <li>Password Login: Disabled</li>
        </ul>
      </div>
    </div>
  );
}
