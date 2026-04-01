import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Request() {
  const { items, requests, setRequests } = useContext(AppContext);

  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const submitRequest = () => {
    if (!selectedItem || !quantity) return;

    const item = items.find((i) => i.name === selectedItem);

    // ❗ Prevent requesting more than stock
    if (Number(quantity) > item.quantity) {
      alert("Not enough stock available!");
      return;
    }

    const newRequest = {
      id: Date.now(),
      item: selectedItem,
      quantity: Number(quantity), // 🔥 FIXED
      status: "Pending",
    };

    setRequests([...requests, newRequest]);
    setSelectedItem("");
    setQuantity("");
  };

  return (
    <div style={styles.container}>
      <h3>Request Item</h3>

      {/* FORM */}
      <div style={styles.form}>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name} (Available: {item.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />

        <button onClick={submitRequest} style={styles.btn}>
          Send Request
        </button>
      </div>

      {/* REQUEST LIST */}
      <h4 style={{ marginTop: "20px" }}>Your Requests</h4>

      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        <div>
          {requests.map((r) => (
            <div key={r.id} style={styles.card}>
              <p><b>{r.item}</b></p>
              <p>Quantity: {r.quantity}</p>
              <p>
                Status:{" "}
                <span
                  style={{
                    color:
                      r.status === "Approved"
                        ? "green"
                        : r.status === "Rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {r.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "transparent",
  },

  form: {
    display: "flex",
    gap: "10px",
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "8px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: 1,
  },

  btn: {
    background: "#674F2D",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  card: {
    background: "white",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default Request;