export default function UsersFilters({ value, onChange }) {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex gap-3 flex-wrap">

        <input
          type="text"
          className="form-control"
          placeholder="Search by email or ID"
          value={value.search}
          onChange={(e) =>
            onChange({ ...value, search: e.target.value })
          }
        />

        <select
          className="form-select"
          value={value.status}
          onChange={(e) =>
            onChange({ ...value, status: e.target.value })
          }
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="pending_verification">
            Pending verification
          </option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>

        <select
          className="form-select"
          value={value.role}
          onChange={(e) =>
            onChange({ ...value, role: e.target.value })
          }
        >
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="regular_user">Regular user</option>
        </select>

      </div>
    </div>
  );
}
