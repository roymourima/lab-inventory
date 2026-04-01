import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Projects() {
  const userRole = "admin";

  // 🔥 USE GLOBAL STATE
  const { projects, setProjects } = useContext(AppContext);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editId, setEditId] = useState(null);

  // ADD / UPDATE
  const addProject = () => {
    if (!name || !startDate || !endDate) return;

    if (editId) {
      // UPDATE
      setProjects(
        projects.map((p) =>
          p.id === editId ? { ...p, name, startDate, endDate } : p
        )
      );
      setEditId(null);
    } else {
      // ADD
      const newProject = {
        id: Date.now(),
        name,
        startDate,
        endDate,
      };
      setProjects([...projects, newProject]);
    }

    setName("");
    setStartDate("");
    setEndDate("");
  };

  // DELETE
  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // EDIT
  const editProject = (p) => {
    setName(p.name);
    setStartDate(p.startDate);
    setEndDate(p.endDate);
    setEditId(p.id);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{marginTop: 0}}>Research Projects</h2>
          <p style={{color: "#888"}}>Track your initiatives</p>
        </div>
        <img src="/Folder.png" alt="Projects" style={styles.headerImg} />
      </div>

      {/* FORM */}
      {userRole === "admin" && (
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
          />

          <button onClick={addProject} style={styles.addBtn}>
            {editId ? "Update Project" : "Add Project"}
          </button>
        </div>
      )}

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            {userRole === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="5">No projects added yet</td>
            </tr>
          ) : (
            projects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.startDate}</td>
                <td>{p.endDate}</td>

                {userRole === "admin" && (
                  <td>
                    <button
                      onClick={() => editProject(p)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProject(p.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "1000px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  headerImg: { height: "120px", objectFit: "contain" },
  form: {
    margin: "20px 0",
    display: "flex",
    gap: "10px",
    background: "transparent",
    padding: "15px",
    borderRadius: "8px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    flex: 1,
  },
  addBtn: {
    background: "#674F2D",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
  },
  editBtn: {
    marginRight: "5px",
    background: "orange",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
    textAlign: "center",
  },
};

export default Projects;