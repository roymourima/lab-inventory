import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {

  // 🔥 USER (LOGIN)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // 🔥 ITEMS
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Microscope", quantity: 5 },
      { id: 2, name: "Test Tubes", quantity: 20 },
    ];
  });

  // 🔥 PROJECTS
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Robotics Arm",
        startDate: "2026-03-01",
        endDate: "2026-03-20",
      },
    ];
  });

  // 🔥 REQUESTS
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("requests");
    return saved ? JSON.parse(saved) : [];
  });
  // issue 
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem("issues");
    return saved ? JSON.parse(saved) : [];
  });
  // DARK MODE 
    const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
  return saved ? JSON.parse(saved) : false;
  });

  // 💾 SAVE USER
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // 💾 SAVE ITEMS
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // 💾 SAVE PROJECTS
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // 💾 SAVE REQUESTS
  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);
  
  // save issue 
  useEffect(() => {
  localStorage.setItem("issues", JSON.stringify(issues));
  }, [issues]);

  // save dark mode
  useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,

        items,
        setItems,

        projects,
        setProjects,

        requests,
        setRequests,

        issues,
        setIssues,

        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;