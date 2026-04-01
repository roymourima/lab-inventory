import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function ReportIssue() {
  const { issues, setIssues, user } = useContext(AppContext);
  const [text, setText] = useState("");

  const submitIssue = () => {
    if (!text) return;

    const newIssue = {
      id: Date.now(),
      text,
      user: user?.email,
      status: "Pending",
    };

    const updatedIssues = [...issues, newIssue];

    setIssues(updatedIssues);

    // ✅ DEBUG (now correct place)
    console.log("Submitting Issue:", updatedIssues);

    setText("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{marginTop: 0}}>Report an Issue</h2>
          <p style={{color: "#888"}}>Let us know what went wrong</p>
        </div>
        <img src="/Something-went-wrong.png" alt="Report" style={styles.headerImg} />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe the issue..."
        style={styles.textarea}
      />

      <button onClick={submitIssue} style={styles.btn}>
        Submit
      </button>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "800px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  headerImg: { height: "120px", objectFit: "contain" },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#674F2D",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ReportIssue;