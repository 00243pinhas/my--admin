import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/useAuth";
import { seedUser } from "../../../api/usersApi";
import Toast from "../../../ components/Toast";

export default function SeedUserPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    role: "regular_user",
    accountStatus: "active",
    password: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
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

  function updateField(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        email: form.email,
        role: form.role,
        accountStatus: form.accountStatus,
      };

      if (form.password) payload.password = form.password;
      if (form.phoneNumber) payload.phoneNumber = form.phoneNumber;

      const user = await seedUser(token, payload);

      showToast("User seeded successfully");
      setTimeout(() => {
        navigate(`/dashboard/users/${user.id}`);
      }, 800);
    } catch (err) {
      console.error(err);
      showToast(
        err?.message || "Failed to seed user",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Seed User (Admin)</h5>
          <small className="text-muted">
            Create a user without OTP verification
          </small>
        </div>

        <form onSubmit={onSubmit}>
          <div className="card-body row g-3">

            {/* EMAIL */}
            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input
                name="email"
                type="email"
                required
                className="form-control"
                value={form.email}
                onChange={updateField}
              />
            </div>

            {/* PHONE */}
            <div className="col-md-6">
              <label className="form-label">Phone (optional)</label>
              <input
                name="phoneNumber"
                className="form-control"
                value={form.phoneNumber}
                onChange={updateField}
              />
            </div>

            {/* ROLE */}
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={updateField}
              >
                <option value="regular_user">Regular User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* STATUS */}
            <div className="col-md-4">
              <label className="form-label">Account Status</label>
              <select
                name="accountStatus"
                className="form-select"
                value={form.accountStatus}
                onChange={updateField}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
                <option value="pending_verification">
                  Pending Verification
                </option>
              </select>
            </div>

            {/* PASSWORD */}
            <div className="col-md-4">
              <label className="form-label">
                Password (optional)
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={updateField}
              />
              <small className="text-muted">
                Leave empty to auto-generate
              </small>
            </div>

          </div>

          <div className="card-footer d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Seed User"}
            </button>
          </div>
        </form>
      </div>

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
