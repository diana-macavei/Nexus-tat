import React, { useState } from "react";
import "../styles/Info.css";
import logo from "../assets/nexus.webp";

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

const InfoPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);

  return (
    <div className="sysinfo-full-container">
      {/* Navbar */}
      <div className="sysinfo-navbar">
        <img src={logo} alt="Nexus Logo" className="sysinfo-navbar-logo" />
        <div className="sysinfo-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="sysinfo-content-section">
        {/* Left Buttons */}
        <div className="sysinfo-left-buttons">
          <button className="sysinfo-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="sysinfo-button active" style={{ color: "#8a4ddf" }}>Key Information</button>
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

export default InfoPage;
