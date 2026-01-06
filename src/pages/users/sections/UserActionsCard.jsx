import { useAuth } from "../../../auth/useAuth";
import { updateUserStatus, updateUserRole } from "../../../api/usersApi";
import ConfirmModal from "../../../ components/ConfirmModal";
import { useState } from "react";

export default function UserActionsCard({ user, onChange }) {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState(false);

  async function setStatus(status) {
    await updateUserStatus(token, user.id, status);
    onChange();
  }

  async function setRole(roleCode) {
    await updateUserRole(token, user.id, roleCode);
    onChange();
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Admin Actions</strong>
      </div>

      <div className="card-body d-flex flex-column gap-3">

        {/* STATUS */}
        <div>
          <label className="form-label small">
            Account Status
          </label>

          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn btn-sm btn-success"
              disabled={user.status === "active"}
              onClick={() => setStatus("active")}
            >
              Activate
            </button>

            <button
              className="btn btn-sm btn-warning"
              disabled={user.status === "suspended"}
              onClick={() => setStatus("suspended")}
            >
              Suspend
            </button>

            <button
              className="btn btn-sm btn-danger"
              disabled={user.status === "banned"}
              onClick={() => setStatus("banned")}
            >
              Ban
            </button>
          </div>

          {user.status === "pending_verification" && (
            <div className="text-muted small mt-2">
              User has not completed verification yet.
            </div>
          )}
        </div>

        {/* ROLE */}
        <div>
          <label className="form-label small">Role</label>
          <select
            className="form-select"
            value={user.role?.code || ""}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="regular_user">Regular User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        {/* DELETE */}
        <div className="border-top pt-3">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setDeleting(true)}
          >
            Delete User
          </button>
        </div>
      </div>

      <ConfirmModal
        show={deleting}
        title="Delete user"
        message={`Are you sure you want to permanently delete "${user.email}"?`}
        confirmLabel="Delete user"
        confirmVariant="danger"
        onConfirm={() => {
          // You already have DELETE /users/{id}
          // We keep it simple for now
        }}
        onCancel={() => setDeleting(false)}
      />
    </div>
  );
}
