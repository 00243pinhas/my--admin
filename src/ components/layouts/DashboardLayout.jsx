import Sidebar from "../Sidebar";
import "./DashboardLayout.css";
import Dashboard from "../../pages/DashboardSections/Dashboard";

export default function DashboardLayout() {
  return (


    <body>
      <div class="sidenav">
        <Sidebar />
      </div>

      <div class="main p-4">
        <Dashboard />
      </div>

    </body>

  );
}



