export default function UserProfileCard({ user }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <strong>{user.email}</strong>
        <div className="text-muted small">ID: {user.id}</div>

        <div className="mt-2">
          <span className="badge bg-secondary me-2">
            {user.role?.name}
          </span>
          <span className="badge bg-success">
            {user.status}
          </span>
        </div>
      </div>
    </div>
  );
}
