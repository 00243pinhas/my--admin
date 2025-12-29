import Sidebar from "../Sidebar";

import Dashboard from "../../pages/Dashboard";

export default function DashboardLayout() {
  return (
    <div className="d-flex">
    
      <Sidebar />
   
      <main className="flex-grow-1 bg-light min-vh-100">
        <Dashboard />
      </main>
    </div>
  );
}