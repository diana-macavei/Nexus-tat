import React, { useEffect, useState } from "react";
import "../styles/Forms.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Home } from "lucide-react";
import { FaRegFileAlt } from "react-icons/fa";

const FormsPage = () => {
  const [forms, setForms] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    fetch(`http://localhost:5000/api/users/${decoded.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupId(data.group_id);
      })
      .catch((err) => console.error("❌ Failed to load user:", err));
  }, []);

  useEffect(() => {
    if (!groupId) return;

    const fetchForms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/forms?type=hub");
        const data = await res.json();

        const filtered = data.filter(
          (form) => form.group_id === null || form.group_id === groupId
        );

        const enriched = filtered.map((form) => {
          const deadline = new Date(form.deadline);
          const today = new Date();
          const diff = (deadline - today) / (1000 * 60 * 60 * 24);
          return {
            ...form,
            status: deadline < today ? "Expired" : "Open",
            urgency: diff < 0 ? "expired" : diff <= 3 ? "soon" : "ok"
          };
        });

        const sorted = enriched.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );

        setForms(sorted);
      } catch (err) {
        console.error("❌ Failed to fetch forms:", err);
      }
    };

    fetchForms();
  }, [groupId]);

  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const due = new Date(deadline);
    const diff = (due - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "red";
    if (diff <= 3) return "orange";
    return "green";
  };

  return (
    <div className="forms-full-container">
      {/* Navbar */}
      <div className="forms-navbar">
        <img src={logo} alt="Nexus Logo" className="forms-navbar-logo" />
        <Home
          className="back-icon"
          onClick={() => navigate("/userpage")}
          title="Back to Dashboard"
        />
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
              {forms.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "#999" }}>
                    No forms available right now.
                  </td>
                </tr>
              ) : (
                forms.map((form, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{form.type}</td>
                    <td>{form.title}</td>
                    <td style={{ color: getDeadlineColor(form.deadline) }}>
                      {new Date(form.deadline).toLocaleDateString("en-GB")}
                    </td>
                    <td className={form.status === "Open" ? "done" : "not-done"}>
                      {form.status}
                    </td>
                    <td>
                      <a
                        href={form.form_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Form"
                      >
                        <FaRegFileAlt className="forms-icon" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormsPage;
