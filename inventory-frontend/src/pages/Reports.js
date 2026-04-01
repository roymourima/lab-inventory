import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Reports() {
  const { items, requests, issues, setIssues } = useContext(AppContext);

  // 📊 STATS
  const totalItems = items.length;
  const totalRequests = requests.length;
  const approved = requests.filter(r => r.status === "Approved").length;

  // 🔧 RESOLVE ISSUE
  const resolveIssue = (id) => {
    setIssues(
      issues.map((i) =>
        i.id === id ? { ...i, status: "Resolved" } : i
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2>Admin Reports & Issues</h2>

      {/* 📊 STATS */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h4>Total Items</h4>
          <h2>{totalItems}</h2>
        </div>

        <div style={styles.card}>
          <h4>Total Requests</h4>
          <h2>{totalRequests}</h2>
        </div>

        <div style={styles.card}>
          <h4>Approved Requests</h4>
          <h2>{approved}</h2>
        </div>
      </div>

      {/* 🚨 ISSUES */}
      <h3 style={{ marginTop: "30px" }}>Reported Issues</h3>

      {issues.length === 0 ? (
        <p>No issues reported</p>
      ) : (
        issues.map((i) => (
          <div key={i.id} style={styles.issueCard}>
            <p><b>{i.text}</b></p>
            <p>User: {i.user}</p>
            <p>Status: {i.status}</p>

            {i.status === "Pending" && (
              <button
                style={styles.resolveBtn}
                onClick={() => resolveIssue(i.id)}
              >
                Resolve
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },

  grid: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  issueCard: {
    background: "white",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "8px",
  },

  resolveBtn: {
    marginTop: "10px",
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Reports;