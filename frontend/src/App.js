import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import RegisterData from "./pages/RegisterData";
import RegisterQuestion from "./pages/RegisterQuestion";
import UserPage from "./pages/UserPage";
import GroupLeaderPage from "./pages/GroupLeaderPage";
import SysAdminPage from "./pages/SysAdminPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registerdata" element={<RegisterData />} />
            <Route path="/registerquestion" element={<RegisterQuestion />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/glpage" element={<GroupLeaderPage />} />
            <Route path="/syspage" element={<SysAdminPage />} />
            <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
