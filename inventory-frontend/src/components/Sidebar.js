import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

import {
  FiHome,
  FiBox,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiUser,
  FiAlertTriangle,
  FiClock,
  FiShoppingCart,
  FiLogOut,
  FiMenu
} from "react-icons/fi";

function Sidebar() {
  const { user, setUser } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      ...styles.sidebar,
      width: collapsed ? "80px" : "240px"
    }}>

      {/* TOP */}
      <div>

        {/* LOGO + TOGGLE */}
        <div style={styles.topBar}>
          {!collapsed && <h2 style={styles.logo}><span style={{background:"#E4D5B4", color:"#674F2D", padding:"4px", borderRadius:"6px", marginRight:"8px", display:"inline-flex", alignItems:"center", justifyContent:"center"}}><FiBox size={18}/></span>LabFlow</h2>}

          <button style={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
            <FiMenu />
          </button>
        </div>

        {/* MENU */}
        <ul style={styles.menu}>

          <SidebarItem to="/dashboard" icon={<FiHome />} label="Dashboard" active={isActive("/dashboard")} collapsed={collapsed} />

          {user?.role === "admin" && (
            <>
              <SidebarItem to="/inventory" icon={<FiBox />} label="Inventory" active={isActive("/inventory")} collapsed={collapsed} />
              <SidebarItem to="/projects" icon={<FiBarChart2 />} label="Projects" active={isActive("/projects")} collapsed={collapsed} />
              <SidebarItem to="/reports" icon={<FiFileText />} label="Reports" active={isActive("/reports")} collapsed={collapsed} />
              <SidebarItem to="/settings" icon={<FiSettings />} label="Settings" active={isActive("/settings")} collapsed={collapsed} />
            </>
          )}

          {user?.role === "student" && (
            <>
              <SidebarItem to="/request" icon={<FiShoppingCart />} label="Request" active={isActive("/request")} collapsed={collapsed} />
              <SidebarItem to="/history" icon={<FiClock />} label="History" active={isActive("/history")} collapsed={collapsed} />
              <SidebarItem to="/report-issue" icon={<FiAlertTriangle />} label="Report Issue" active={isActive("/report-issue")} collapsed={collapsed} />
              <SidebarItem to="/profile" icon={<FiUser />} label="Profile" active={isActive("/profile")} collapsed={collapsed} />
            </>
          )}

        </ul>
      </div>

      {/* BOTTOM */}
      <div>

        {/* USER */}
        <div style={styles.userBox}>
          <div style={styles.avatar}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          {!collapsed && (
            <div>
              <p style={styles.name}>{user?.email}</p>
              <small style={styles.role}>{user?.role}</small>
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <button style={styles.logout} onClick={handleLogout}>
          <FiLogOut />
          {!collapsed && <span style={{ marginLeft: "8px" }}>Logout</span>}
        </button>

      </div>

    </div>
  );
}

/* 🔥 ITEM */
function SidebarItem({ to, icon, label, active, collapsed }) {
  return (
    <li style={{ position: "relative" }}>
      <Link
        to={to}
        style={{
          ...styles.link,
          ...(active ? styles.activeLink : {}),
          justifyContent: collapsed ? "center" : "flex-start"
        }}
      >
        <span style={styles.icon}>{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Link>
    </li>
  );
}

const styles = {
sidebar: {
  height: "100vh",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.3s ease",
  background: "transparent",
  borderRight: "1px solid rgba(0,0,0,0.05)",
},

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  toggle: {
    border: "none",
    background: "rgba(0,0,0,0.05)",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  logo: {
    color: "#674F2D",
    display: "flex",
    alignItems: "center",
    margin: 0,
    fontSize: "20px",
    fontWeight: "800"
  },

  menu: {
    listStyle: "none",
    padding: 0,
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    margin: "6px 0",
    textDecoration: "none",
    color: "#9D825D",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    fontSize: "14px",
    fontWeight: "500"
  },

  activeLink: {
    background: "#D2B48C",
    color: "#F5F5DC",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(210, 180, 140, 0.3)",
  },

  icon: {
    fontSize: "18px",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderTop: "1px solid #eaeaea",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#E4D5B4",
    color: "#674F2D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  name: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold",
  },

  role: {
    fontSize: "12px",
    color: "#555",
  },

  logout: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "rgba(239,68,68,0.8)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Sidebar;