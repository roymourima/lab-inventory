import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Profile() {
  const { user } = useContext(AppContext);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{marginTop: 0}}>My Profile</h2>
          <p style={{color: "#888"}}>Manage your account</p>
        </div>
        <img src="/Coder.png" alt="Profile" style={styles.headerImg} />
      </div>

      <div style={styles.card}>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Role:</b> {user?.role}</p>

        <button style={styles.btn}>Edit Profile (Coming Soon)</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "800px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  headerImg: { height: "140px", objectFit: "contain" },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#674F2D",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default Profile;