import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiSearch, FiBell } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const { user, requests, issues } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleNewOrder = () => {
    if (!user) return navigate("/");

    if (user.role === "student") {
      navigate("/request");
    } else {
      navigate("/manage-requests");
    }
  };

  const pendingRequests = requests.filter(r => r.status === "Pending");
  const pendingIssues = issues.filter(i => i.status === "Pending");

  return (
    <div style={styles.nav}>
      <div style={styles.searchBox}>
        <FiSearch color="#999" size={18} />
        <input style={styles.searchInput} placeholder="Search" />
      </div>

      <div style={styles.right}>

        {/* 🔔 NOTIFICATION */}
        <div style={styles.bell} onClick={() => setOpen(!open)}>
          <div style={styles.bellIcon}><FiBell size={20} /></div>
          {(pendingRequests.length + pendingIssues.length) > 0 && (
            <span style={styles.badge}>
              {pendingRequests.length + pendingIssues.length}
            </span>
          )}

          {open && (
            <div style={styles.dropdown}>
              {pendingRequests.length === 0 && pendingIssues.length === 0 && (
                <p>No new notifications</p>
              )}

              {pendingRequests.map(r => (
                <p key={r.id}>📦 {r.item}</p>
              ))}

              {pendingIssues.map(i => (
                <p key={i.id}>⚠ {i.text}</p>
              ))}
            </div>
          )}
        </div>

        {/* NEW ORDER BUTTON */}
        <button style={styles.btn} onClick={handleNewOrder}>
          + New Order
        </button>

      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 30px",
    alignItems: "center",
    background: "transparent",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "white",
    padding: "10px 15px",
    borderRadius: "20px",
    width: "350px",
    gap: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#333",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  bell: {
    position: "relative",
    cursor: "pointer",
  },
  bellIcon: {
    background: "white",
    padding: "10px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#555",
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
  },
  badge: {
    position: "absolute",
    top: "-2px",
    right: "-2px",
    background: "#ef4444",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "bold",
    border: "2px solid white",
  },
  dropdown: {
    position: "absolute",
    top: "45px",
    right: "0",
    background: "white",
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    minWidth: "220px",
    zIndex: 10,
  },
  btn: {
    background: "#674F2D",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(103, 79, 45, 0.2)",
  },
};

export default Navbar;