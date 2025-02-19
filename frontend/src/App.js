import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import RegisterData from "./pages/RegisterData";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/registerdata" element={<RegisterData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
