import React, { useEffect, useState } from "react";
import "../styles/GlInfo.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Home } from "lucide-react";

const GlInfoPage = () => {
  const navigate = useNavigate();
  const [keyInfos, setKeyInfos] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    fetch(`http://localhost:5000/api/users/${decoded.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupId(data.group_id);
      })
      .catch((err) => console.error("❌ Failed to load user group:", err));
  }, []);

  useEffect(() => {
    if (!groupId) return;

    const fetchKeyInfos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/keyinfo?type=hub");
        const data = await res.json();

        const filtered = data.filter(
          (item) => item.group_id === null || item.group_id === groupId
        );

        setKeyInfos(filtered);
        if (filtered.length > 0) setSelectedDoc(filtered[0]);
      } catch (err) {
        console.error("❌ Failed to fetch key info:", err);
      }
    };

    fetchKeyInfos();
  }, [groupId]);

  return (
    <div className="glinfo-full-container">
      {/* Navbar */}
      <div className="glinfo-navbar">
        <img src={logo} alt="Nexus Logo" className="glinfo-navbar-logo" />
        <Home
          className="back-icon"
          onClick={() => navigate("/glpage")}
          title="Back to Dashboard"
        />
        <div className="glinfo-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="glinfo-content-section">
        {/* Left Buttons */}
        <div className="glinfo-left-buttons">
          <button className="glinfo-button" style={{ color: "black" }}>Group info</button>
          <button className="glinfo-button" style={{ color: "black" }}>Essential data</button>
          <button className="glinfo-button" style={{ color: "black" }}>Manage and create</button>
          <button className="glinfo-button active" style={{ color: "#8a4ddf" }}>Key Information</button>
          <button className="glinfo-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="glinfo-button" style={{ color: "black" }}>Forms</button>
          <button className="glinfo-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Middle Viewer */}
        <div className="glinfo-middle-viewer">
          {selectedDoc ? (
            <>
              <h2 className="glinfo-doc-title">{selectedDoc.title}</h2>
              <div className="glinfo-doc-content">
                <p>{selectedDoc.content}</p>
              </div>
            </>
          ) : (
            <p className="glinfo-doc-title">No information selected</p>
          )}
        </div>

        {/* Right Section */}
        <div className="glinfo-right-section">
          <div className="glinfo-right-header">
            <div className="glinfo-right-text">
              <span>Important</span>
            </div>
            <div className="glinfo-right-divider"></div>
            <div className="glinfo-right-highlight">
              <span>data</span>
              <span>information</span>
              <span>articles</span>
            </div>
            <div className="glinfo-right-right-text">
              <span>to be</span>
              <span>aware of</span>
            </div>
          </div>
          {keyInfos.map((info, index) => (
            <p
              key={index}
              className={`glinfo-doc-link ${selectedDoc?.id === info.id ? "active" : ""}`}
              onClick={() => setSelectedDoc(info)}
            >
              {info.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlInfoPage;
