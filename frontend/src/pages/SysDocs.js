import React, { useState } from "react";
import "../styles/SysDocs.css";
import logo from "../assets/nexus.webp";

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

const SysDocsPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);

  return (
    <div className="sysdocs-full-container">
      {/* Navbar */}
      <div className="sysdocs-navbar">
        <img src={logo} alt="Nexus Logo" className="sysdocs-navbar-logo" />
        <div className="sysdocs-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="sysdocs-content-section">
        {/* Left Buttons */}
        <div className="sysdocs-left-buttons">
          <button className="sysdocs-button" style={{ color: "black" }}>Hub info</button>
          <button className="sysdocs-button" style={{ color: "black" }}>Essential data</button>
          <button className="sysdocs-button" style={{ color: "black" }}>Manage and create</button>
          <button className="sysdocs-button active" style={{ color: "#8a4ddf" }}>Essential Documents</button>
          <button className="sysdocs-button" style={{ color: "black" }}>Key Information</button>
          <button className="sysdocs-button" style={{ color: "black" }}>Forms</button>
          <button className="sysdocs-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Middle Document Viewer */}
        <div className="sysdocs-middle-viewer">
          <h2 className="sysdocs-doc-title">{selectedDoc.title}</h2>
          <div className="sysdocs-doc-content">
            <img src={selectedDoc.src} alt={selectedDoc.title} />
          </div>
        </div>

        {/* Right Document List */}
        <div className="sysdocs-right-docs">
          <p className="sysdocs-right-title">Important documents to have at a click distance</p>
          {documents.map((doc, index) => (
            <p
              key={index}
              className="sysdocs-doc-link"
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

export default SysDocsPage;
