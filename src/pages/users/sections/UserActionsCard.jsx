import { useAuth } from "../../../auth/useAuth";
import { updateUserStatus, updateUserRole,deleteUser } from "../../../api/usersApi";
import ConfirmModal from "../../../ components/ConfirmModal";
import { useState } from "react";

import Toast from "../../../ components/Toast";


export default function UserActionsCard({ user, onChange }) {
  const { token } = useAuth();

async function setStatus(status) {
  try {
    await updateUserStatus(token, user.id, status);
    showToast("User status updated");
    onChange();
  } catch (err) {
    console.error(err);
    showToast("Failed to update user status", "error");
  }
}


  const [deleting, setDeleting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3000);
  }


    async function setRole(role) {
      try {
        await updateUserRole(token, user.id, role);
        showToast("User role updated");
        onChange();
      } catch (err) {
        console.error(err);
        showToast("Failed to update user role", "error");
      }
    }


    async function confirmDelete() {
    try {
      setDeleteLoading(true);

      await deleteUser(token, user.id);

      showToast("User deleted successfully");

      window.location.href = "/dashboard/users";
    } catch (err) {
      console.error(err);
      showToast("Failed to delete user", "error");
    } finally {
      setDeleteLoading(false);
      setDeleting(false);
    }
  }

  


  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Admin Actions</strong>
      </div>

      <div className="card-body d-flex flex-column gap-3">

     
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

    
          <div>
            <label className="form-label small">Role</label>

            <select
                className="form-select"
                value={user.role?.role || ""}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="regular_user">Regular User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
            </select>

            <div className="text-muted small mt-1">
              Changing role takes effect immediately.
            </div>
          </div>

     
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
        message={`Are you sure you want to permanently delete "${user.title}"? This action cannot be undone.`}
        confirmLabel="Delete user"
        confirmVariant="danger"
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(false)}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((t) => ({ ...t, show: false }))
        }
      />


    </div>
  );
}
