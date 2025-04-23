import React, { useState } from "react";
import "../styles/GlInfo.css";
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

const GlInfoPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const navigate = useNavigate();

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
          <button className="gldocs-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="glinfo-button" style={{ color: "black" }}>Forms</button>
          <button className="glinfo-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Middle Viewer */}
        <div className="glinfo-middle-viewer">
          <h2 className="glinfo-doc-title">{selectedDoc.title}</h2>
          <div className="glinfo-doc-content">
            <img src={selectedDoc.src} alt={selectedDoc.title} />
          </div>
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
          {documents.map((doc, index) => (
            <p
              key={index}
              className="glinfo-doc-link"
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

export default GlInfoPage;
