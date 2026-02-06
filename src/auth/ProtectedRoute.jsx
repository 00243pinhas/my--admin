// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isLoggedIn, loading, isAuthorized } = useAuth();

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRoles.length > 0 &&
    typeof isAuthorized === "function" &&
    !isAuthorized(requiredRoles)
  ) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Access denied
        </div>
      </div>
    );
  }

  return children;
}
