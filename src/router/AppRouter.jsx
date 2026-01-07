import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import ListingsPage from "../pages/ListingsPage";
// import UsersPage from "../pages/UsersPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import ListingFilesPage from "../pages/ListingFilesPage";
// import UserListingsPage from "../pages/UserListingsPage";
// import ListingDetailsPage from "../pages/ListingDetailsPage";
import DashboardLayout from "../ components/layouts/DashboardLayout";
import ListingsFeed from "../pages/listingFeeds/ListingsFeed";
import ListingDetailsPage from "../pages/listingDetails/ListingDetailsPage"
import UsersPage from "../pages/users/UsersPage";
import UserDetailsPage from "../pages/users/UserDetailsPage";
import LanguagesPage from "../pages/languages/LanguagesPage";
import SubscriptionsPage from "../pages/Subscriptions/SubscriptionsPage";
import SubscriptionDetailsPage from "../pages/Subscriptions/SubscriptionDetailsPage";
import PlansPage from "../pages/plans/PlansPage";

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

  
        </Route>


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

        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/users/:userId"
          element={
            <ProtectedRoute>
              <UserDetailsPage />
            </ProtectedRoute>
          }
        />


        <Route
        path="/dashboard/listings/:listingId"
        element={
          <ProtectedRoute>
            <ListingDetailsPage />
          </ProtectedRoute>
        }
        />



        <Route
          path="/dashboard/languages"
          element={<LanguagesPage />}
        />

         <Route
          path="/dashboard/subscriptions" 
          element={<SubscriptionsPage />} />

        <Route
          path="/dashboard/subscriptions/:subscriptionId"
          element={<SubscriptionDetailsPage />}
        />

        <Route
          path="/dashboard/plans"
          element={<PlansPage />}
        />

        
      </Routes>


    </BrowserRouter>
  );
}
