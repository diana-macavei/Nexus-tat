import React, { useState } from "react";
import "../styles/SysForms.css";
import logo from "../assets/nexus.webp";
import { FaRegFileAlt } from "react-icons/fa";
import {Home} from "lucide-react";
import {useNavigate} from "react-router-dom";

const formEntries = [
  { no: 1, type: "Group", name: "Form1", date: "03-03-2025", status: "Done" },
  { no: 2, type: "Group", name: "Form2", date: "12-01-2025", status: "Not Done" },
  { no: 3, type: "Hub", name: "Form3", date: "05-06-2025", status: "Done" },
];

const SysFormsPage = () => {
  const [popupForm, setPopupForm] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="sysforms-full-container">
      {/* Navbar */}
      <div className="sysforms-navbar">
        <img src={logo} alt="Nexus Logo" className="sysforms-navbar-logo" />
        <Home
            className="back-icon"
            onClick={() => navigate("/syspage")}
            title="Back to Dashboard"
        />
        <div className="sysforms-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Content */}
      <div className="sysforms-content-section">
        {/* Left Buttons */}
        <div className="sysforms-left-buttons">
          <button className="sysforms-button" style={{ color: "black" }}>Hub info</button>
          <button className="sysforms-button" style={{ color: "black" }}>Essential data</button>
          <button className="sysforms-button" style={{ color: "black" }}>Manage and create</button>
          <button className="sysforms-button" style={{ color: "black" }}>Key Information</button>
          <button className="sysforms-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="sysforms-button active" style={{ color: "#8a4ddf" }}>Forms</button>
          <button className="sysforms-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Forms Table */}
        <div className="sysforms-forms-section">
          <h2 className="sysforms-title">Ongoing forms</h2>
          <table className="sysforms-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Type</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Form</th>
              </tr>
            </thead>
            <tbody>
              {formEntries.map((form, index) => (
                <tr key={index}>
                  <td>{form.no}</td>
                  <td>{form.type}</td>
                  <td>{form.name}</td>
                  <td>{form.date}</td>
                  <td className={form.status === "Done" ? "done" : "not-done"}>
                    {form.status}
                  </td>
                  <td>
                    <FaRegFileAlt
                      className="sysforms-icon"
                      onClick={() => setPopupForm(form.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Form */}
      {popupForm && (
        <div className="sysforms-popup">
          <div className="sysforms-popup-content">
            <button
              className="sysforms-popup-close"
              onClick={() => setPopupForm(null)}
            >
              &times;
            </button>
            <h3>{popupForm} Form</h3>
            <p>Form content goes here...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SysFormsPage;
