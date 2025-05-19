import React, { useState } from "react";
import "../styles/GlCreate.css";
import logo from "../assets/nexus.webp";
import linkIcon from "../assets/icons/link.png";
import dragIcon from "../assets/icons/stack.png";
import plusIcon from "../assets/icons/plus.png";
import minusIcon from "../assets/icons/minus.png";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const GlCreatePage = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [keyInfoTitle, setKeyInfoTitle] = useState("");
  const [keyInfoContent, setKeyInfoContent] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollDeadline, setPollDeadline] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowMultiple, setAllowMultiple] = useState(false);

  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = () => {
    if (options.length > 1) {
      setOptions(options.slice(0, -1));
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleFormSubmit = async () => {
    if (!formTitle || !formUrl) {
      alert("Please enter both title and link.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    // Fetch full user details to get group_id
    const userRes = await fetch(`http://localhost:5000/api/users/${userId}`);
    const userData = await userRes.json();
    const groupId = userData.group_id;

    try {
      const res = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          form_url: formUrl,
          type: "Group",
          deadline: formDeadline || null,
          created_by: userId,
          group_id: groupId
        })
      });
      if (res.ok) {
        alert("Form uploaded");
        setFormTitle("");
        setFormUrl("");
      } else {
        alert("Error uploading form");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const handleKeyInfoSubmit = async () => {
    if (!keyInfoTitle || !keyInfoContent) {
      alert("Please fill in title and content");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    try {
      // ✅ fetch the user from the backend to get group_id
      const userRes = await fetch(`http://localhost:5000/api/users/${userId}`);
      const userData = await userRes.json();
      console.log("✅ Full userData from backend:", userData);

      const groupId = userData.group_id;

      console.log("🔍 groupId fetched from API:", groupId);

      const res = await fetch("http://localhost:5000/api/keyinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: keyInfoTitle,
          content: keyInfoContent,
          posted_by: userId,
          created_at: new Date().toISOString(),
          type: "Group",

        }),
      });

      if (res.ok) {
        alert("Key info posted");
        setKeyInfoTitle("");
        setKeyInfoContent("");
      } else {
        alert("Error posting key info");
      }
    } catch (err) {
      console.error("❌ Error in handleKeyInfoSubmit:", err);
      alert("Server error");
    }
  };




  const handlePollSubmit = async () => {
    if (!pollQuestion || options.length < 2) {
      alert("Add question and at least two options");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    try {
      const res = await fetch("http://localhost:5000/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: pollQuestion,
          options,
          deadline: pollDeadline,
          is_anonymous: isAnonymous,
          allow_multiple: allowMultiple,
          created_by: userId,
          type: "Group"
        })
      });
      if (res.ok) {
        alert("Poll submitted");
        setPollQuestion("");
        setPollDeadline("");
        setOptions(["", ""]);
        setIsAnonymous(false);
        setAllowMultiple(false);
      } else {
        alert("Error creating poll");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="glcreate-full-container">
      <div className="glcreate-navbar">
        <img src={logo} alt="Nexus Logo" className="glcreate-navbar-logo" />
        <Home className="back-icon" onClick={() => navigate("/glpage")} title="Back to Dashboard" />
        <div className="glcreate-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      <div className="glcreate-content-section">
        <div className="glcreate-left-buttons">
          <button className="glcreate-button" style={{ color: "black" }}>Hub info</button>
          <button className="glcreate-button" style={{ color: "black" }}>Essential data</button>
          <button className="glcreate-button active" style={{ color: "#8a4ddf" }}>Manage and create</button>
          <button className="glcreate-button" style={{ color: "black" }}>Key Information</button>
          <button className="glcreate-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="glcreate-button" style={{ color: "black" }}>Forms</button>
          <button className="glcreate-button" style={{ color: "black" }}>Polls</button>
        </div>

        <div className="glcreate-main-section">
          <div className="glcreate-poll-container">
            <span className="glcreate-poll-title">Upload a form</span>
            {/* Title input */}
            <input
              className="glcreate-question-input"
              placeholder="Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            {/* Link input */}
            <div className="glcreate-options">
              <div className="glcreate-option-item" style={{ width: "100%" }}>
                <input
                  type="text"
                  className="glcreate-option-input"
                  placeholder="Information"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleFormSubmit();
                    }}
                  />
                <img
                  src={linkIcon}
                  alt="Upload Icon"
                  className="glcreate-drag-icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleFormSubmit}
                />
              </div>
            </div>

            <hr className="syscreate-divider" />

              {/* Deadline */}
              <p className="syscreate-poll-subtitle">Set a deadline</p>
              <div className="syscreate-deadline-container">
                <input
                  className="syscreate-deadline-input"
                  type="datetime-local"
                  value={formDeadline}
                  onChange={(e) => setFormDeadline(e.target.value)}
                />
              </div>

          </div>

          <div className="glcreate-poll-container">
            <span className="glcreate-poll-title">Add key information</span>
            <input
              className="glcreate-question-input"
              placeholder="Title"
              value={keyInfoTitle}
              onChange={(e) => setKeyInfoTitle(e.target.value)}
            />
            <div className="glcreate-options">
              <div className="glcreate-option-item" style={{ width: "100%" }}>
                <input
                  type="text"
                  className="glcreate-option-input"
                  placeholder="Information"
                  value={keyInfoContent}
                  onChange={(e) => setKeyInfoContent(e.target.value)}
                />
                <img
                  src={linkIcon}
                  alt="Submit"
                  className="glcreate-drag-icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleKeyInfoSubmit}
                />
              </div>
            </div>
          </div>

          <div className="glcreate-poll-container">
            <span className="glcreate-poll-title">Create a poll</span>
            <input
              className="glcreate-question-input"
              placeholder="Ask a question"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
            />
            <div className="glcreate-options">
              {options.map((opt, index) => (
                <div key={index} className="glcreate-option-item">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="glcreate-option-input"
                  />
                  <img src={dragIcon} alt="Drag Icon" className="glcreate-drag-icon" />
                </div>
              ))}
            </div>
            <div className="glcreate-option-controls">
              <button onClick={addOption}><img src={plusIcon} alt="Add Option" /></button>
              <button onClick={removeOption}><img src={minusIcon} alt="Remove Option" /></button>
            </div>
            <hr className="glcreate-divider" />
            <p className="glcreate-poll-subtitle">Set a deadline</p>
            <div className="glcreate-deadline-container">
              <input
                className="glcreate-deadline-input"
                type="datetime-local"
                value={pollDeadline}
                onChange={(e) => setPollDeadline(e.target.value)}
              />
            </div>
            <div className="glcreate-switches">
              <span>Anonymous votes</span>
              <label className="switch">
                <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
                <span className="slider"></span>
              </label>
              <span>Multiple answers</span>
              <label className="switch">
                <input type="checkbox" checked={allowMultiple} onChange={() => setAllowMultiple(!allowMultiple)} />
                <span className="slider"></span>
              </label>
            </div>
            <button className="glcreate-submit-button" onClick={handlePollSubmit}>
              Submit Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlCreatePage;
