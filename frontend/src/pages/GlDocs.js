import React, { useEffect, useState } from "react";
import "../styles/GlDocs.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Home } from "lucide-react";

const GlDocsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
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

    const fetchDocs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/documents?type=hub");
        const data = await res.json();

        const filtered = data.filter(
          (doc) => doc.group_id === null || doc.group_id === groupId
        );

        setDocuments(filtered);
        if (filtered.length > 0) setSelectedDoc(filtered[0]);
      } catch (err) {
        console.error("❌ Failed to fetch documents:", err);
      }
    };

    fetchDocs();
  }, [groupId]);

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

        {/* Middle Viewer */}
        <div className="gldocs-middle-viewer">
          {selectedDoc ? (
            <>
              <h2 className="gldocs-doc-title">{selectedDoc.title}</h2>
              <div className="gldocs-doc-content">
                {selectedDoc.file_url && /\.(jpeg|jpg|png|gif)$/i.test(selectedDoc.file_url) ? (
                  <img
                    src={selectedDoc.file_url}
                    alt={selectedDoc.title}
                    style={{ maxWidth: "100%", height: "auto" }}
                    onError={() => alert("❌ Could not load image.")}
                  />
                ) : selectedDoc.file_url && selectedDoc.file_url.endsWith(".pdf") ? (
                  <iframe
                    src={selectedDoc.file_url}
                    title={selectedDoc.title}
                    style={{
                      width: "100%",
                      height: "80vh",
                      border: "none",
                      borderRadius: "8px"
                    }}
                  />
                ) : (
                  <p>
                    📎 This file cannot be previewed.
                    <br />
                    <a
                      href={selectedDoc.file_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#8a4ddf", fontWeight: "500" }}
                    >
                      Click here to download
                    </a>
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="gldocs-doc-title">No document selected</p>
          )}
        </div>

        {/* Right Document List */}
        <div className="gldocs-right-docs">
          <p className="gldocs-right-title">Important documents to have at a click distance</p>
          {documents.map((doc, index) => (
            <p
              key={index}
              className={`gldocs-doc-link ${selectedDoc?.id === doc.id ? "active" : ""}`}
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
