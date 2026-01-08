import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import { fetchRoles } from "../../../api/rolesApi";
import RolesTable from "../sections/RolesTable";

export default function RolesPage() {
  const { token } = useAuth();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchRoles(token);
        setRoles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load roles", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Roles</h4>
        <span className="badge bg-secondary">
          System-defined
        </span>
      </div>

      <div className="alert alert-light small mb-3">
        Roles are predefined by the system and cannot be created, edited,
        or deleted. They are used to control access levels across the platform.
      </div>

      <RolesTable roles={roles} loading={loading} />
    </div>
  );
}
