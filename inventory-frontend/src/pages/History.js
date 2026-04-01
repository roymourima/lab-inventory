import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function History() {
  const { requests } = useContext(AppContext);

  const approved = requests.filter((r) => r.status === "Approved");

  return (
    <div style={styles.container}>
      <h2>Borrow History</h2>

      {approved.length === 0 ? (
        <p>No borrowed items yet</p>
      ) : (
        approved.map((r) => (
          <div key={r.id} style={styles.card}>
            <p><b>{r.item}</b></p>
            <p>Quantity: {r.quantity}</p>
            <p style={{ color: "green" }}>Approved</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  card: {
    background: "white",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default History;