import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // 🔥 CREATE USER OBJECT
    const newUser = {
      email,
      role, // student or admin
    };

    setUser(newUser);

    // 🔥 REDIRECT BASED ON ROLE
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/request");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* LEFT IMAGE */}
      <div style={styles.left}></div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <div style={styles.box}>
          <h2 style={styles.title}>LabFlow Login</h2>

          {/* PORTAL SWITCH */}
          <div style={styles.switchWrapper}>
            <div style={styles.switch}>
              <button
                onClick={() => setRole("student")}
                style={role === "student" ? styles.activeBtn : styles.roleBtn}
              >
                Student
              </button>

              <button
                onClick={() => setRole("admin")}
                style={role === "admin" ? styles.activeBtn : styles.roleBtn}
              >
                Admin
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.btn} onClick={handleLogin}>
            Login
          </button>

          <p style={styles.linkText}>
            <Link to="/forgot" style={styles.link}>Forgot Password?</Link>
          </p>

          <p style={styles.linkText}>
            New user? <Link to="/register" style={styles.link}>Register</Link>
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
    backgroundImage: "url('/Secure-login.png')",
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
    marginBottom: "25px",
    marginTop: 0
  },
  switchWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  switch: {
    display: "flex",
    border: "1px solid #D2B48C",
    borderRadius: "20px",
    padding: "2px",
    width: "200px"
  },
  roleBtn: {
    flex: 1,
    padding: "8px 15px",
    border: "none",
    background: "transparent",
    color: "#9D825D",
    cursor: "pointer",
    borderRadius: "18px",
    fontSize: "13px"
  },
  activeBtn: {
    flex: 1,
    padding: "8px 15px",
    border: "none",
    background: "#9D825D",
    color: "white",
    cursor: "pointer",
    borderRadius: "18px",
    fontSize: "13px"
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

export default Login;