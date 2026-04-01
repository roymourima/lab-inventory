import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Reset when page loads
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.container}>
      
      {/* LEFT IMAGE */}
      <div style={styles.left}></div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <div style={styles.box}>
          <h2 style={styles.title}>Register Account</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.btn}>Sign Up</button>

          <p style={styles.linkText}>
            Already have an account? <Link to="/" style={styles.link}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  left: {
    flex: 1.2,
    backgroundColor: "#F5F5DC",
    backgroundImage: "url('/Welcome.png')",
    backgroundSize: "70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundBlendMode: "multiply",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F5F5DC",
  },
  box: {
    width: "360px",
    padding: "40px",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    color: "#222",
    fontWeight: "normal",
    marginBottom: "30px",
    marginTop: 0
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px"
  },
  label: {
    fontSize: "13px",
    color: "#333",
    fontWeight: "600",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "6px",
    border: "1px solid #D2B48C",
    boxSizing: "border-box",
    fontSize: "14px"
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#674F2D",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
    marginBottom: "20px"
  },
  linkText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#333",
    margin: "10px 0"
  },
  link: {
    color: "#9D825D",
    textDecoration: "none"
  }
};

export default Register;