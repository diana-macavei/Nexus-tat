import React, { useEffect, useState } from "react";
import "../styles/SysInfo.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Home } from "lucide-react";

const SysInfoPage = () => {
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

        console.log("✅ Fetched keyinfo data:", data); // ← ADD THIS LINE

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
    <div className="sysinfo-full-container">
      {/* Navbar */}
      <div className="sysinfo-navbar">
        <img src={logo} alt="Nexus Logo" className="sysinfo-navbar-logo" />
        <Home
          className="back-icon"
          onClick={() => navigate("/syspage")}
          title="Back to Dashboard"
        />
        <div className="sysinfo-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="sysinfo-content-section">
        {/* Left Buttons */}
        <div className="sysinfo-left-buttons">
          <button className="sysinfo-button" style={{ color: "black" }}>Hub info</button>
          <button className="sysinfo-button" style={{ color: "black" }}>Essential data</button>
          <button className="sysinfo-button" style={{ color: "black" }}>Manage and create</button>
          <button className="sysinfo-button active" style={{ color: "#8a4ddf" }}>Key Information</button>
          <button className="sysdocs-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="sysinfo-button" style={{ color: "black" }}>Forms</button>
          <button className="sysinfo-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Middle Viewer */}
        <div className="sysinfo-middle-viewer">
          {selectedDoc ? (
            <>
              <h2 className="sysinfo-doc-title">{selectedDoc.title}</h2>
              <div className="sysinfo-doc-content">
                <p>{selectedDoc.content}</p>
              </div>
            </>
          ) : (
            <p className="sysinfo-doc-title">No information selected</p>
          )}
        </div>

        {/* Right Section */}
        <div className="sysinfo-right-section">
          <div className="sysinfo-right-header">
            <div className="sysinfo-right-text">
              <span>Important</span>
            </div>
            <div className="sysinfo-right-divider"></div>
            <div className="sysinfo-right-highlight">
              <span>data</span>
              <span>information</span>
              <span>articles</span>
            </div>
            <div className="sysinfo-right-right-text">
              <span>to be</span>
              <span>aware of</span>
            </div>
          </div>

          {/* KeyInfo Titles */}
          {keyInfos.map((info, index) => (
              <p
                key={index}
                className={`sysinfo-doc-link ${selectedDoc?.id === info.id ? "active" : ""}`}
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

export default SysInfoPage;
