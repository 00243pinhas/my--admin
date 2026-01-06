import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

import { fetchAllUsers } from "../../api/usersApi";
import UsersFilters from "./sections/UsersFilters";

export default function UsersPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    role: "",
  });

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchAllUsers(token);
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);


// console.log("USERS RAW:", users.map(u => ({
//   accountStatus: u.accountStatus,
//   role: u.role?.role,
// })));
// console.log("FILTERS:", filters);



 
 const visibleUsers = useMemo(() => {
  let items = [...users];

 
  // SEARCH
  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    items = items.filter(
      (u) =>
        u.email?.toLowerCase().includes(q) ||
        u.id?.toLowerCase().includes(q)

    );

  }

  if (filters.status) {
    items = items.filter(
      (u) => u.accountStatus === filters.status
    );

  }

  if (filters.role) {

   console.log(filters.role)

    items = items.filter(
      (u) =>
        (u.role || "").toLowerCase() ===
        filters.role.toLowerCase()
    );
 
  }


  return items;
}, [users, filters]);


  if (loading) {
    return <div className="p-4">Loading users…</div>;
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Users</h4>
        <span className="text-muted small">
          Total: {users.length}
        </span>
      </div>

      <UsersFilters value={filters} onChange={setFilters} />

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="fw-medium">{u.name}</div>
                    <div className="fw-medium">{u.email}</div>
                    <div className="text-muted small">{u.id}</div>
                  </td>

                  <td>
                    <span className="badge bg-secondary">
                      {u.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        u.accountStatus === "active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {u.accountStatus}
                    </span>
                  </td>

                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        navigate(`/dashboard/users/${u.id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {visibleUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-muted py-4"
                  >
                    No users match the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
