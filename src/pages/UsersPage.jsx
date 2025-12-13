// src/pages/UsersPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import {
  fetchAllUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../api/usersApi";

import {
  USER_ROLE_OPTIONS,
  USER_ACCOUNT_STATUS_OPTIONS,
} from "../constants/userEnums";

export default function UsersPage() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    loadUsers();
  }, [token]);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAllUsers(token);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(userId, role) {
    try {
      await updateUserRole(token, userId, role);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role } : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  }

  async function handleStatusChange(userId, status) {
    try {
      await updateUserStatus(token, userId, status);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, account_status: status } : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  }

  async function handleDelete(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(token, userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  }

  if (!token) return <div>Admin access required</div>;
  if (loading) return <div>Loading users…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Users Management</h1>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email / Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                {u.first_name} {u.last_name}
              </td>

              <td>{u.email || u.phone_number}</td>

              {/* ROLE */}
              <td>
                <select
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u.id, e.target.value)
                  }
                >
                  {USER_ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </td>

              {/* STATUS */}
              <td>
                <select
                  value={u.account_status}
                  onChange={(e) =>
                    handleStatusChange(u.id, e.target.value)
                  }
                >
                  {USER_ACCOUNT_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                {u.created_at
                  ? new Date(u.created_at).toLocaleString()
                  : "-"}
              </td>

              <td>
                <button
                  style={{ color: "red" }}
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={6}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
