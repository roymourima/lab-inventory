import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FiFolder, FiPackage, FiAlertTriangle } from "react-icons/fi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const { items, requests, projects } = useContext(AppContext);

  const totalItems = items.length;
  const totalProjects = projects.length;
  const lowStock = items.filter((i) => i.quantity < 5).length;

  const itemData = items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
  }));

  const recentActivity = requests.slice(-3).reverse();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard Overview</h2>

      {/* CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <div>
            <p style={styles.cardTitle}>Total Projects</p>
            <h1 style={styles.cardValue}>{totalProjects}</h1>
          </div>
          <div style={{...styles.iconWrapper, background: "#E4D5B4", color: "#674F2D"}}>
             <FiFolder size={24} />
          </div>
        </div>

        <div style={styles.card}>
          <div>
            <p style={styles.cardTitle}>Total Items</p>
            <h1 style={styles.cardValue}>{totalItems}</h1>
          </div>
          <div style={{...styles.iconWrapper, background: "#E4D5B4", color: "#674F2D"}}>
             <FiPackage size={24} />
          </div>
        </div>

        <div style={styles.card}>
          <div>
            <p style={styles.cardTitle}>Low Stock</p>
            <h1 style={{ ...styles.cardValue, color: "#ef4444" }}>{lowStock}</h1>
          </div>
          <div style={{...styles.iconWrapper, background: "#FEE2E2", color: "#ef4444"}}>
             <FiAlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div style={styles.grid}>

        {/* BAR CHART */}
        <div style={styles.chartBox}>
          <h3 style={styles.boxTitle}>Inventory Overview</h3>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={itemData} margin={{top: 20}}>
              <XAxis dataKey="name" stroke="#888" axisLine={false} tickLine={false} />
              <YAxis stroke="#888" axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '10px'}} />
              <Bar
                dataKey="quantity"
                fill="#9D825D"
                radius={[8, 8, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT ACTIVITY */}
        <div style={styles.recentBox}>
          <div style={styles.recentHeader}>
            <h3 style={styles.boxTitle}>Recent Activity</h3>
            <span style={styles.newBadge}>New</span>
          </div>

          <div style={styles.activityList}>
            {recentActivity.length === 0 ? (
              <div style={{textAlign: "center", padding: "20px"}}>
                <img src="/Nothing-here.png" alt="No Activity" style={{width: "100%", maxWidth: "150px", opacity: 0.8}} />
                <p style={{color:"#888", marginTop: "10px"}}>No recent activity</p>
              </div>
            ) : recentActivity.map((req, i) => (
              <div key={i} style={styles.activityItem}>
                <div>
                  <h4 style={styles.activityTitle}>{req.item} Request</h4>
                  <p style={styles.activitySub}>Recent</p>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  background: req.status === "Pending" ? "#FEF3C7" : req.status === "Approved" ? "#DCFCE7" : "#FEE2E2",
                  color: req.status === "Pending" ? "#D97706" : req.status === "Approved" ? "#16A34A" : "#DC2626"
                }}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "10px 30px",
    background: "transparent",
  },
  title: {
    marginBottom: "10px",
    marginTop: "0",
    color: "#222",
    fontSize: "20px"
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    background: "white",
    padding: "12px 20px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTitle: {
    margin: 0,
    color: "#666",
    fontSize: "14px",
    fontWeight: "500"
  },
  cardValue: {
    margin: "5px 0 0 0",
    fontSize: "32px",
    color: "#222"
  },
  iconWrapper: {
    padding: "12px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "15px",
    marginTop: "15px",
  },
  chartBox: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
  },
  recentBox: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
    display: "flex",
    flexDirection: "column"
  },
  boxTitle: {
    margin: 0,
    color: "#222",
    fontSize: "16px"
  },
  recentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  newBadge: {
    background: "transparent",
    color: "#9D825D",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer"
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  activityItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "8px",
    borderBottom: "1px solid #f1f1f1"
  },
  activityTitle: {
    margin: 0,
    color: "#333",
    fontSize: "14px",
    fontWeight: "600"
  },
  activitySub: {
    margin: "4px 0 0 0",
    color: "#888",
    fontSize: "12px"
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
  }
};

export default Dashboard;