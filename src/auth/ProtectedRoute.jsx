// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isLoggedIn, loading, isAuthorized } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (!isAuthorized(requiredRoles)) return <div>Access denied</div>;

  return children;
}
