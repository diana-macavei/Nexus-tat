import React, { useState } from "react";
import "../styles/Docs.css";
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

const DocsPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);

  return (
    <div className="sysdocs-full-container">
      {/* Navbar */}
      <div className="docs-navbar">
        <img src={logo} alt="Nexus Logo" className="docs-navbar-logo" />
        <div className="docs-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="docs-content-section">
        {/* Left Buttons */}
        <div className="docs-left-buttons">
          <button className="docs-button active" style={{ color: "#8a4ddf" }}>Essential Documents</button>
          <button className="docs-button" style={{ color: "black" }}>Key Information</button>
          <button className="docs-button" style={{ color: "black" }}>Forms</button>
          <button className="docs-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Middle Document Viewer */}
        <div className="docs-middle-viewer">
          <h2 className="docs-doc-title">{selectedDoc.title}</h2>
          <div className="docs-doc-content">
            <img src={selectedDoc.src} alt={selectedDoc.title} />
          </div>
        </div>

        {/* Right Document List */}
        <div className="docs-right-docs">
          <p className="docs-right-title">Important documents to have at a click distance</p>
          {documents.map((doc, index) => (
            <p
              key={index}
              className="docs-doc-link"
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

export default DocsPage;
