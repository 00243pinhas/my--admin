// src/pages/Dashboard/dashboard.routes.js
export const DASHBOARD_ROUTES = {
  users: "/dashboard/users",
  listings: "/dashboard/listings",
  pendingListings: "/dashboard/listings?status=pending",
  incompleteListings: "/dashboard/listings?incomplete=true",
  subscriptions: "/dashboard/subscriptions",
  flaggedUsers: "/dashboard/users?status=flagged",
};
