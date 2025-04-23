import React, { useState } from "react";
import "../styles/GlCreate.css";
import logo from "../assets/nexus.webp";
import linkIcon from "../assets/icons/link.png";
import dragIcon from "../assets/icons/stack.png";
import plusIcon from "../assets/icons/plus.png";
import minusIcon from "../assets/icons/minus.png";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const GlCreatePage = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = () => {
    if (options.length > 1) {
      setOptions(options.slice(0, -1));
    }
  };

  return (
    <div className="glcreate-full-container">
      {/* Navbar */}
      <div className="glcreate-navbar">
        <img src={logo} alt="Nexus Logo" className="glcreate-navbar-logo" />
        <Home
            className="back-icon"
            onClick={() => navigate("/glpage")}
            title="Back to Dashboard"
        />
        <div className="glcreate-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Content */}
      <div className="glcreate-content-section">
        {/* Left Buttons */}
        <div className="glcreate-left-buttons">
          <button className="glcreate-button" style={{ color: "black" }}>Hub info</button>
          <button className="glcreate-button" style={{ color: "black" }}>Essential data</button>
          <button className="glcreate-button active" style={{ color: "#8a4ddf" }}>Manage and create</button>
          <button className="glcreate-button" style={{ color: "black" }}>Key Information</button>
          <button className="glcreate-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="glcreate-button" style={{ color: "black" }}>Forms</button>
          <button className="glcreate-button" style={{ color: "black" }}>Polls</button>
        </div>

        {/* Main Section */}
        <div className="glcreate-main-section">
          {/* Upload Form */}
          <div className="glcreate-action">
            <span className="glcreate-action-title">Upload a form</span>
            <div className="glcreate-input-container">
              <input className="glcreate-input" type="text" />
              <img src={linkIcon} alt="Upload Icon" className="glcreate-input-icon" />
            </div>
          </div>

          {/* Add Key Info */}
          <div className="glcreate-action">
            <span className="glcreate-action-title">Add key information</span>
            <input className="glcreate-input" type="text" />
          </div>

          {/* Poll Section */}
          <div className="glcreate-poll-container">
            <span className="glcreate-poll-title">Create a poll</span>

            <input
              className="glcreate-question-input"
              placeholder="Ask a question"
            />

            <div className="glcreate-options">
              {options.map((opt, index) => (
                <div key={index} className="glcreate-option-item">
                  <input
                    type="text"
                    value={opt}
                    className="glcreate-option-input"
                    readOnly
                  />
                  <img src={dragIcon} alt="Drag Icon" className="glcreate-drag-icon" />
                </div>
              ))}
            </div>

            {/* Plus & Minus */}
            <div className="glcreate-option-controls">
              <button onClick={addOption}>
                <img src={plusIcon} alt="Add Option" />
              </button>
              <button onClick={removeOption}>
                <img src={minusIcon} alt="Remove Option" />
              </button>
            </div>

            <hr className="glcreate-divider" />

            <p className="glcreate-poll-subtitle">Set a deadline</p>
            <div className="glcreate-deadline-container">
              <input
                className="glcreate-deadline-input"
                type="datetime-local"
                required
              />
            </div>

            <div className="glcreate-switches">
              <span>Anonymous votes</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <span>Multiple answers</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlCreatePage;
