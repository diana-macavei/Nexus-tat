import React, { useState } from "react";
import "../styles/Forms.css";
import logo from "../assets/nexus.webp";
import { FaRegFileAlt } from "react-icons/fa";

const formEntries = [
  { no: 1, type: "Group", name: "Form1", date: "03-03-2025", status: "Done" },
  { no: 2, type: "Group", name: "Form2", date: "12-01-2025", status: "Not Done" },
  { no: 3, type: "Hub", name: "Form3", date: "05-06-2025", status: "Done" },
];

const FormsPage = () => {
  const [popupForm, setPopupForm] = useState(null);

  return (
    <div className="forms-full-container">
      {/* Navbar */}
      <div className="forms-navbar">
        <img src={logo} alt="Nexus Logo" className="forms-navbar-logo" />
        <div className="forms-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Content */}
      <div className="forms-content-section">
        {/* Left Buttons */}
        <div className="forms-left-buttons">
          <button className="forms-button" style={{ color: "black" }}>Key Information</button>
          <button className="forms-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="forms-button active" style={{ color: "#8a4ddf" }}>Forms</button>
          <button className="forms-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Forms Table */}
        <div className="forms-forms-section">
          <h2 className="forms-title">Ongoing forms</h2>
          <table className="forms-table">
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
                      className="forms-icon"
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
        <div className="forms-popup">
          <div className="forms-popup-content">
            <button
              className="forms-popup-close"
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

export default FormsPage;
