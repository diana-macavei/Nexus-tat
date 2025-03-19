import React, { useState } from "react";
import "../styles/SysCreate.css";
import logo from "../assets/nexus.webp";
import linkIcon from "../assets/icons/link.png";
import dragIcon from "../assets/icons/stack.png";
import plusIcon from "../assets/icons/plus.png";
import minusIcon from "../assets/icons/minus.png";

const SysCreatePage = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2"]);

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = () => {
    if (options.length > 1) {
      setOptions(options.slice(0, -1));
    }
  };

  return (
    <div className="syscreate-full-container">
      {/* Navbar */}
      <div className="syscreate-navbar">
        <img src={logo} alt="Nexus Logo" className="syscreate-navbar-logo" />
        <div className="syscreate-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Content */}
      <div className="syscreate-content-section">
        {/* Left Buttons */}
        <div className="syscreate-left-buttons">
          <button className="syscreate-button" style={{ color: "black" }}>Hub info</button>
          <button className="syscreate-button" style={{ color: "black" }}>Essential data</button>
          <button className="syscreate-button active" style={{ color: "#8a4ddf" }} >Manage and create</button>
          <button className="syscreate-button" style={{ color: "black" }}>Key Information</button>
          <button className="syscreate-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="syscreate-button" style={{ color: "black" }}>Forms</button>
          <button className="syscreate-button" style={{ color: "black" }}>Polls</button>
        </div>


        {/* Main Section */}
        <div className="syscreate-main-section">
          {/* Upload Sections */}
          <div className="syscreate-action">
            <span className="syscreate-action-title">Upload a form</span>
            <div className="syscreate-input-container">
              <input className="syscreate-input" type="text" />
              <img src={linkIcon} alt="Upload Icon" className="syscreate-input-icon" />
            </div>
          </div>

          <div className="syscreate-action">
            <span className="syscreate-action-title">Upload a document</span>
            <div className="syscreate-input-container">
              <input className="syscreate-input" type="text" />
              <img src={linkIcon} alt="Upload Icon" className="syscreate-input-icon" />
            </div>
          </div>

          <div className="syscreate-action">
            <span className="syscreate-action-title">Add key information</span>
            <input className="syscreate-input" type="text" />
          </div>

          {/* Poll Section */}
          <div className="syscreate-poll-container">
            <span className="syscreate-poll-title">Create a poll</span>

            <input
              className="syscreate-question-input"
              placeholder="Ask a question"
            />

            <div className="syscreate-options">
              {options.map((opt, index) => (
                <div key={index} className="syscreate-option-item">
                  <input
                    type="text"
                    value={opt}
                    className="syscreate-option-input"
                    readOnly
                  />
                  <img src={dragIcon} alt="Drag Icon" className="syscreate-drag-icon" />
                </div>
              ))}
            </div>

            {/* Plus and Minus Controls */}
            <div className="syscreate-option-controls">
              <button onClick={addOption}>
                <img src={plusIcon} alt="Add Option" />
              </button>
              <button onClick={removeOption}>
                <img src={minusIcon} alt="Remove Option" />
              </button>
            </div>

            <hr className="syscreate-divider" />

            <p className="syscreate-poll-subtitle">Set a deadline</p>
            <div className="syscreate-deadline-container">
              <input
                className="syscreate-deadline-input"
                type="datetime-local"
                required
              />
            </div>

            <div className="syscreate-switches">
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

export default SysCreatePage;
