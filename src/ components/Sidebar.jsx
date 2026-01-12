// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  Speedometer,
  ListUl,
  People,
  CreditCard,
  Diagram3,
  Layers,
  Diagram2,
  Translate,
  ShieldLock,
  Folder,
  Gear,
  BoxArrowRight,
  PersonPlus
} from "react-bootstrap-icons";


import "./sidebar.css";


export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
          
        <div className="mb-1">
        <h1 className="h4 fw-semibold mb-1 p-2">Admin Dashboard</h1>
        {/* <p className="text-muted mb-0">
          System overview and operational control
        </p> */}
      </div> 
      </div>

      <div className="sidebar-inner">
        <SidebarSection title="Core">
          <SidebarItem to="/dashboard" icon={<Speedometer />} label="Dashboard" />
          <SidebarItem to="/dashboard/listings" icon={<ListUl />} label="Listings" />
          <SidebarItem to="/dashboard/users" icon={<People />} label="Users" />
        </SidebarSection>

        <SidebarSection title="Management">
          <SidebarItem to="/dashboard/subscriptions" icon={<CreditCard />} label="Subscriptions" />
          <SidebarItem  to="/dashboard/plans" icon={<Diagram3 />} label="Plans" />
        </SidebarSection>

        <SidebarSection title="Configuration">
          <SidebarItem to="/dashboard/listing-types" icon={<Layers />} label="Listing Types" />
          <SidebarItem to="/dashboard/users/seed" icon={<PersonPlus />} label="Seed-User" />
          <SidebarItem to="/dashboard/categories" icon={<Diagram2 />} label="Categories" />
          <SidebarItem to="/dashboard/languages" icon={<Translate />} label="Languages" />
          <SidebarItem to="/dashboard/roles" icon={<ShieldLock />} label="Roles" />
        </SidebarSection>

        <SidebarSection title="System">
          <SidebarItem to="/dashboard/files" icon={<Folder />} label="Files" />
          <SidebarItem to="/dashboard/settings" icon={<Gear />} label="Settings" />
          <SidebarItem to="/logout" icon={<BoxArrowRight />} label="Logout" />
        </SidebarSection>
      </div>
    </aside>
  );
}



function SidebarSection({ title, children }) {
  return (
    <div className="sidebar-section">
      <div className="sidebar-title">{title}</div>
      {children}
    </div>
  );
}

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar-item ${isActive ? "active" : ""}`
      }
    >
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-label">{label}</span>
    </NavLink>
  );
}
