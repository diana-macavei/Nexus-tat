import React, { useEffect, useState } from "react";
import "../styles/Docs.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Home } from "lucide-react";

const DocsPage = () => {
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
    <div className="sysdocs-full-container">
      {/* Navbar */}
      <div className="docs-navbar">
        <img src={logo} alt="Nexus Logo" className="docs-navbar-logo" />
        <Home
          className="back-icon"
          onClick={() => navigate("/userpage")}
          title="Back to Dashboard"
        />
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

        {/* Middle Viewer */}
        <div className="docs-middle-viewer">
          {selectedDoc ? (
            <>
              <h2 className="docs-doc-title">{selectedDoc.title}</h2>
              <div className="docs-doc-content">
                {selectedDoc.file_url && /\.(jpeg|jpg|png|gif)$/i.test(selectedDoc.file_url) ? (
                  <img
                    src={selectedDoc.file_url}
                    alt={selectedDoc.title}
                    style={{ maxWidth: "100%", height: "auto" }}
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
            <p className="docs-doc-title">No document selected</p>
          )}
        </div>

        {/* Right Document List */}
        <div className="docs-right-docs">
          <p className="docs-right-title">Important documents to have at a click distance</p>
          {documents.map((doc, index) => (
            <p
              key={index}
              className={`docs-doc-link ${selectedDoc?.id === doc.id ? "active" : ""}`}
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
