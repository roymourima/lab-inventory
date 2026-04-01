import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function RequestAdmin() {
  const { requests, setRequests, items, setItems } = useContext(AppContext);

  const updateStatus = (id, status) => {
    const request = requests.find((r) => r.id === id);

    // 🔥 ONLY WHEN APPROVED
    if (status === "Approved") {
      const updatedItems = items.map((item) => {
        if (item.name === request.item) {
          // ❗ prevent negative stock
          const newQty = item.quantity - request.quantity;

          return {
            ...item,
            quantity: newQty >= 0 ? newQty : 0,
          };
        }
        return item;
      });

      setItems(updatedItems);
    }

    // UPDATE REQUEST STATUS
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Manage Requests</h3>

      {requests.length === 0 ? (
        <p>No requests</p>
      ) : (
        requests.map((r) => (
          <div key={r.id} style={styles.box}>
            <p>
              <b>{r.item}</b> - {r.quantity} ({r.status})
            </p>

            <button
              onClick={() => updateStatus(r.id, "Approved")}
              style={styles.approve}
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(r.id, "Rejected")}
              style={styles.reject}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  box: {
    background: "white",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  approve: {
    background: "green",
    color: "white",
    border: "none",
    padding: "8px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  reject: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default RequestAdmin;