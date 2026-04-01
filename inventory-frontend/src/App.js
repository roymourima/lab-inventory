import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Projects from "./pages/Projects";
import Request from "./pages/Request";
import RequestAdmin from "./pages/RequestAdmin";

import History from "./pages/History";
import Profile from "./pages/Profile";
import ReportIssue from "./pages/ReportIssue";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import Layout from "./components/Layout";

function App() {
  const { user } = useContext(AppContext);

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* 🔐 PROTECTED ROUTES */}

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? <Layout><Dashboard /></Layout> : <Login />
          }
        />

        {/* INVENTORY (ADMIN ONLY) */}
        <Route
          path="/inventory"
          element={
            user?.role === "admin"
              ? <Layout><Inventory /></Layout>
              : <Login />
          }
        />

        {/* PROJECTS */}
        <Route
          path="/projects"
          element={
            user ? <Layout><Projects /></Layout> : <Login />
          }
        />

        {/* STUDENT REQUEST */}
        <Route
          path="/request"
          element={
            user?.role === "student"
              ? <Layout><Request /></Layout>
              : <Login />
          }
        />

        {/* ADMIN REQUEST MANAGEMENT */}
        <Route
          path="/manage-requests"
          element={
            user?.role === "admin"
              ? <Layout><RequestAdmin /></Layout>
              : <Login />
          }
        />

        {/* ✅ NEW STUDENT PAGES */}

        <Route
          path="/history"
          element={
            user?.role === "student"
              ? <Layout><History /></Layout>
              : <Login />
          }
        />

        <Route
          path="/report-issue"
          element={
            user?.role === "student"
              ? <Layout><ReportIssue /></Layout>
              : <Login />
          }
        />

        <Route
          path="/profile"
          element={
            user
              ? <Layout><Profile /></Layout>
              : <Login />
          }
        />

        {/* ✅ NEW ADMIN PAGES */}

        <Route
          path="/reports"
          element={
            user?.role === "admin"
              ? <Layout><Reports /></Layout>
              : <Login />
          }
        />

        <Route
          path="/settings"
          element={
            user?.role === "admin"
              ? <Layout><Settings /></Layout>
              : <Login />
          }
        />
       
      </Routes>
    </Router>
  );
}

export default App;