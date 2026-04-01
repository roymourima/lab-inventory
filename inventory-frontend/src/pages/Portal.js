import { useNavigate } from "react-router-dom";

function Portal() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "transparent"
    }}>
      <div style={{
        display: "flex",
        gap: "40px"
      }}>
        
        {/* Admin */}
        <div
          onClick={() => navigate("/login/admin")}
          style={{
            padding: "40px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
            borderRadius: "10px"
          }}
        >
          <h2>Admin Portal</h2>
        </div>

        {/* Student */}
        <div
          onClick={() => navigate("/login/student")}
          style={{
            padding: "40px",
            background: "#28a745",
            color: "white",
            cursor: "pointer",
            borderRadius: "10px"
          }}
        >
          <h2>Student Portal</h2>
        </div>

      </div>
    </div>
  );
}

export default Portal;