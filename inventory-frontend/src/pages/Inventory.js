import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FiTrash2 } from "react-icons/fi";

function Inventory() {
  const { items, setItems } = useContext(AppContext);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItem = () => {
    if (!name || !quantity) return;

    const newItem = {
      id: Date.now(),
      name,
      quantity: parseInt(quantity),
    };

    setItems([...items, newItem]);
    setName("");
    setQuantity("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{marginTop: 0}}>Inventory Vault</h2>
          <p style={{color: "#888"}}>Manage all laboratory assets</p>
        </div>
        <img src="/cloud-storage.png" alt="Inventory" style={styles.headerImg} />
      </div>

      {/* FORM */}
      <div style={styles.form}>
        <input
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />

        <button onClick={addItem} style={styles.btn}>
          Add
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <span>{item.name} - {item.quantity}</span>
            <button onClick={() => removeItem(item.id)} style={styles.removeBtn}>
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px", maxWidth: "800px", margin: "0 auto",
    background: "transparent",
    minHeight: "100vh",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  headerImg: { height: "120px", objectFit: "contain" },

  form: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    flex: 1,
  },

  btn: {
    background: "#674F2D",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  card: {
    background: "white",
    padding: "12px 20px",
    borderRadius: "12px",
    marginTop: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  list: {
    marginTop: "15px"
  },
  removeBtn: {
    background: "transparent",
    color: "#ff4d4d",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center"
  }
};

export default Inventory;