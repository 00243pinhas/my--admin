// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import ListingsPage from "../pages/ListingsPage";
import UsersPage from "../pages/UsersPage";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

    
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

    
        <Route
          path="/dashboard/listings"
          element={
            <ProtectedRoute>
              <ListingsPage />
            </ProtectedRoute>
          }
        />

   
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}



