import React, { useState } from "react";
import "../styles/SysInfo.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const documents = [
  {
    title: "Oferta Mate-Info(Evident)",
    src: "../assets/oferta.png",
  },
  {
    title: "Draft contract Mate-Info(Evident)",
    src: "../assets/contract.png",
  },
];

const SysInfoPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const navigate = useNavigate();

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
          <h2 className="sysinfo-doc-title">{selectedDoc.title}</h2>
          <div className="sysinfo-doc-content">
            <img src={selectedDoc.src} alt={selectedDoc.title} />
          </div>
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
          {documents.map((doc, index) => (
            <p
              key={index}
              className="sysinfo-doc-link"
              onClick={() => setSelectedDoc(doc)}
            >
              {doc.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SysInfoPage;
