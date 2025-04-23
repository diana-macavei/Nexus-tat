import React, { useState } from "react";
import "../styles/GlDocs.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const documents = [
  {
    title: "Oferta Mate-Info(Evident)",
    src: "../assets/oferta.png", // Replace with actual image path
  },
  {
    title: "Draft contract Mate-Info(Evident)",
    src: "../assets/contract.png", // Replace with actual image path
  },
];

const GlDocsPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const navigate = useNavigate();

  return (
    <div className="gldocs-full-container">
      {/* Navbar */}
      <div className="gldocs-navbar">
        <img src={logo} alt="Nexus Logo" className="gldocs-navbar-logo" />
        <Home
            className="back-icon"
            onClick={() => navigate("/glpage")}
            title="Back to Dashboard"
        />
        <div className="gldocs-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="gldocs-content-section">
        {/* Left Buttons */}
        <div className="gldocs-left-buttons">
          <button className="gldocs-button" style={{ color: "black" }}>Group info</button>
          <button className="gldocs-button" style={{ color: "black" }}>Essential data</button>
          <button className="gldocs-button" style={{ color: "black" }}>Manage and create</button>
          <button className="gldocs-button" style={{ color: "black" }}>Key Information</button>
          <button className="gldocs-button active" style={{ color: "#8a4ddf" }}>Essential Documents</button>
          <button className="gldocs-button" style={{ color: "black" }}>Forms</button>
          <button className="gldocs-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Middle Document Viewer */}
        <div className="gldocs-middle-viewer">
          <h2 className="gldocs-doc-title">{selectedDoc.title}</h2>
          <div className="gldocs-doc-content">
            <img src={selectedDoc.src} alt={selectedDoc.title} />
          </div>
        </div>

        {/* Right Document List */}
        <div className="gldocs-right-docs">
          <p className="gldocs-right-title">Important documents to have at a click distance</p>
          {documents.map((doc, index) => (
            <p
              key={index}
              className="gldocs-doc-link"
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

export default GlDocsPage;
