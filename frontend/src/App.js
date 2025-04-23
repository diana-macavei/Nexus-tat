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
            <Route path="/sysdocs" element={<SysDocs />} />
            <Route path="/gldocs" element={<GlDocs />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/sysinfo" element={<SysInfo />} />
            <Route path="/glinfo" element={<GlInfo />} />
            <Route path="/info" element={<Info />} />
            <Route path="/sysforms" element={<SysForms />} />
            <Route path="/glforms" element={<GlForms />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/syspolls" element={<SysPolls />} />
            <Route path="/glpolls" element={<GlPolls />} />
            <Route path="/polls" element={<Polls />} />
            <Route path="/syscreate" element={<SysCreate />} />
            <Route path="/glcreate" element={<GlCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
