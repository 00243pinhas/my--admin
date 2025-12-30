import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import ListingsPage from "../pages/ListingsPage";
import UsersPage from "../pages/UsersPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import ListingFilesPage from "../pages/ListingFilesPage";
import UserListingsPage from "../pages/UserListingsPage";
import ListingDetailsPage from "../pages/ListingDetailsPage";
import DashboardLayout from "../ components/layouts/DashboardLayout";
import ListingsFeed from "../pages/listingFeeds/ListingsFeed";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

   
        <Route path="/" element={<Navigate to="/login" replace />} />

    
        <Route path="/login" element={<LoginPage />} />

        <Route path="dashboard/listings" element={<ListingsFeed/>} />
       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
      
          <Route index element={<Dashboard />} />

          <Route path="listings" element={<ListingsPage />} />

          <Route path="listings/:listingId" element={<ListingDetailsPage />} />

  
          <Route path="users" element={<UsersPage />} />
        </Route>

        <Route
          path="/users/:userId/listings"
          element={
            <ProtectedRoute>
              <UserListingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings/:listingId/files"
          element={
            <ProtectedRoute>
              <ListingFilesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/listings/:id/files"
          element={
            <ProtectedRoute>
              <ListingFilesPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
