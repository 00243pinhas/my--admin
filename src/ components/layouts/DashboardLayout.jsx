import Sidebar from "../Sidebar";
import "./DashboardLayout.css";
import Dashboard from "../../pages/DashboardSections/Dashboard";

export default function DashboardLayout() {
  return (


    <body>
      
      <div className="sidenav">
        <Sidebar />
      </div>

      <div className="main p-4">
        <Dashboard />
      </div>

    </body>

  );
}



