import { useState } from "react";

function Settings() {
  const [labTime, setLabTime] = useState("9AM - 5PM");
  const [fine, setFine] = useState("No fine");

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{marginTop: 0}}>Settings</h2>
          <p style={{color: "#888"}}>Configure your lab rules</p>
        </div>
        <img src="/Setting.png" alt="Settings" style={styles.headerImg} />
      </div>

      <div style={styles.card}>
        <label>Lab Timing</label>
        <input
          value={labTime}
          onChange={(e) => setLabTime(e.target.value)}
          style={styles.input}
        />

        <label>Fine Policy</label>
        <input
          value={fine}
          onChange={(e) => setFine(e.target.value)}
          style={styles.input}
        />

        <button style={styles.btn}>Save Settings</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "800px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  headerImg: { height: "120px", objectFit: "contain" },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#674F2D",
    color: "white",
    border: "none",
  },
};

export default Settings;