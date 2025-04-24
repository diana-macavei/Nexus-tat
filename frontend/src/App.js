import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Login from "./pages/Login";
import RegisterData from "./pages/RegisterData";
import RegisterQuestion from "./pages/RegisterQuestion";
import UserPage from "./pages/UserPage";
import GroupLeaderPage from "./pages/GroupLeaderPage";
import SysAdminPage from "./pages/SysAdminPage";
import AccountPage from "./pages/AccountPage";
import SysDocs from "./pages/SysDocs";
import Docs from "./pages/Docs";
import SysInfo from "./pages/SysInfo";
import Info from "./pages/Info";
import SysForms from "./pages/SysForms";
import Forms from "./pages/Forms";
import SysPolls from "./pages/SysPolls";
import Polls from "./pages/Polls";
import SysCreate from "./pages/SysCreate";
import GlCreate from "./pages/GlCreate";
import GlInfo from "./pages/GlInfo";
import GlForms from "./pages/GlForms";
import GlPolls from "./pages/GlPolls";
import GlDocs from "./pages/GlDocs";
import Unauthorized from "./pages/Unauthorized";

// Components
import LogoutButton from "./components/LogoutButton";
import ProtectedRoute from "./components/ProtectedRoute";

function InnerApp() {
  const location = useLocation();

  const showLogout = ["/userpage", "/glpage", "/syspage"].includes(location.pathname);

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      <ToastContainer />

      {/* Logout button only on allowed pages */}
      {showLogout && (
        <div style={{
          position: "absolute",
          top: "1rem",
          right: "1.5rem",
          zIndex: 1000
        }}>
          <LogoutButton />
        </div>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/registerdata" element={<RegisterData />} />
        <Route path="/registerquestion" element={<RegisterQuestion />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/userpage"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/glpage"
          element={
            <ProtectedRoute allowedRoles={["groupleader", "sysadmin"]}>
              <GroupLeaderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gldocs"
          element={
            <ProtectedRoute allowedRoles={["groupleader", "sysadmin"]}>
              <GlDocs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/glinfo"
          element={
            <ProtectedRoute allowedRoles={["groupleader", "sysadmin"]}>
              <GlInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/glforms"
          element={
            <ProtectedRoute allowedRoles={["groupleader", "sysadmin"]}>
              <GlForms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/glpolls"
          element={
            <ProtectedRoute allowedRoles={["groupleader", "sysadmin"]}>
              <GlPolls />
            </ProtectedRoute>
          }
        />
        <Route
          path="/glcreate"
          element={
            <ProtectedRoute allowedRoles={["groupleader", "sysadmin"]}>
              <GlCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/syspage"
          element={
            <ProtectedRoute allowedRoles={["sysadmin"]}>
              <SysAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sysdocs"
          element={
            <ProtectedRoute allowedRoles={["sysadmin"]}>
              <SysDocs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sysinfo"
          element={
            <ProtectedRoute allowedRoles={["sysadmin"]}>
              <SysInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sysforms"
          element={
            <ProtectedRoute allowedRoles={["sysadmin"]}>
              <SysForms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/syspolls"
          element={
            <ProtectedRoute allowedRoles={["sysadmin"]}>
              <SysPolls />
            </ProtectedRoute>
          }
        />
        <Route
          path="/syscreate"
          element={
            <ProtectedRoute allowedRoles={["sysadmin"]}>
              <SysCreate />
            </ProtectedRoute>
          }
        />



        {/* Other shared routes */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/info" element={<Info />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/polls" element={<Polls />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}
