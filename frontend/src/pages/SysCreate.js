import React, { useState } from "react";
import "../styles/SysCreate.css";
import logo from "../assets/nexus.webp";
import linkIcon from "../assets/icons/link.png";
import dragIcon from "../assets/icons/stack.png";
import plusIcon from "../assets/icons/plus.png";
import minusIcon from "../assets/icons/minus.png";
import {Home} from "lucide-react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';



const SysCreatePage = () => {
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [keyInfoTitle, setKeyInfoTitle] = useState("");
  const [keyInfoContent, setKeyInfoContent] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollDeadline, setPollDeadline] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowMultiple, setAllowMultiple] = useState(false);



  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = () => {
    if (options.length > 1) {
      setOptions(options.slice(0, -1));
    }
  };

    const handleFormSubmit = async () => {
        if (!formTitle || !formUrl) {
          alert("Please enter both title and link.");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found. Please log in again.");
            return;
        }

        const decoded = jwtDecode(token);
        const userRole = decoded.role;
        const userId = decoded.userId;
        const groupId = decoded.group_id || null;



        console.log("👀 Detected user role:", userRole);
        console.log("👀 Detected user id:", userId);

        const formType = userRole === "sysadmin" ? "Hub"
                       : userRole === "groupleader" ? "Group"
                       : null;

        if (!formType) {
          alert("Unrecognized user role. Cannot submit form.");
          return;
        }

        try {
          const response = await fetch("http://localhost:5000/api/forms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: formTitle,
              form_url: formUrl,
              type: formType,          // ✅ Dynamic value here
              deadline: formDeadline || null,
              created_by: userId,           // Replace with actual user id
              group_id: formType === "Group" ? 2 : null // Replace with real group id or null
            }),
          });

          if (response.ok) {
            alert("Form added!");
            setFormTitle("");
            setFormUrl("");
          } else {
            const data = await response.json();
            alert("Error: " + data.error);
          }
        } catch (err) {
          console.error("❌ Failed to submit form:", err.message);
          alert("Something went wrong.");
        }
      };

    const handleDocSubmit = async () => {
      if (!docTitle || !docUrl) {
        alert("Please fill in both title and link.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found.");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.userId; // match your backend token field

      try {
        const response = await fetch("http://localhost:5000/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: docTitle,
            file_url: docUrl,
            uploaded_by: userId,
            upload_date: new Date().toISOString()
          }),
        });

        if (response.ok) {
          alert("Document added!");
          setDocTitle("");
          setDocUrl("");
        } else {
          const data = await response.json();
          alert("Error: " + data.error);
        }
      } catch (err) {
        console.error("❌ Failed to upload doc:", err.message);
        alert("Something went wrong.");
      }
    };

    const handleKeyInfoSubmit = async () => {
      if (!keyInfoTitle || !keyInfoContent) {
        alert("Please fill in both title and content.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found.");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      const userRole= decoded.role;
      const groupId= decoded.group_id || null;

      try {
        const response = await fetch("http://localhost:5000/api/keyinfo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: keyInfoTitle,
            content: keyInfoContent,
            posted_by: userId,
            created_at: new Date().toISOString(),
            type: userRole === "sysadmin" ? "Hub" : "Group",
            group_id: groupId // pass null for sysadmin
          }),
        });

        if (response.ok) {
          alert("Key information posted!");
          setKeyInfoTitle("");
          setKeyInfoContent("");
        } else {
          const data = await response.json();
          alert("Error: " + data.error);
        }
      } catch (err) {
        console.error("❌ Failed to post key info:", err.message);
        alert("Something went wrong.");
      }
    };

    const handleOptionChange = (index, value) => {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      setOptions(updatedOptions);
    };


  const handlePollSubmit = async () => {
    if (!pollQuestion || options.length < 2) {
      alert("Please add a question and at least two options.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found.");
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    const userRole = decoded.role;

    const type = userRole === "sysadmin" ? "Hub" : "Group";

    try {
      const response = await fetch("http://localhost:5000/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: pollQuestion,
          options,
          deadline: pollDeadline,
          is_anonymous: isAnonymous,
          allow_multiple: allowMultiple,
          created_by: userId,
          type
        })
      });

      if (response.ok) {
        alert("Poll submitted!");
        setPollQuestion("");
        setPollDeadline("");
        setOptions(["", ""]);
        setIsAnonymous(false);
        setAllowMultiple(false);
      } else {
        const data = await response.json();
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Poll submission error:", err.message);
      alert("Something went wrong.");
    }
  };




  return (
    <div className="syscreate-full-container">
      {/* Navbar */}
      <div className="syscreate-navbar">
        <img src={logo} alt="Nexus Logo" className="syscreate-navbar-logo" />
        <Home
            className="back-icon"
            onClick={() => navigate("/syspage")}
            title="Back to Dashboard"
        />
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
            {/* FORM SECTION - styled like poll section */}
            <div className="syscreate-poll-container">
              <span className="syscreate-poll-title">Upload a form</span>

              {/* Title input */}
              <input
                className="syscreate-question-input"
                placeholder="Title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />

              {/* Link input */}
              <div className="syscreate-options">
                <div className="syscreate-option-item" style={{ width: "100%" }}>
                  <input
                    type="text"
                    className="syscreate-option-input"
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
                    className="syscreate-drag-icon"
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






         <div className="syscreate-poll-container">
            <span className="syscreate-poll-title">Upload a document</span>

            <input
              className="syscreate-question-input"
              placeholder="Title"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
            />

            <div className="syscreate-options">
              <div className="syscreate-option-item" style={{ width: "100%" }}>
                <input
                  type="text"
                  className="syscreate-option-input"
                  placeholder="Information"
                  value={docUrl}
                  onChange={(e) => setDocUrl(e.target.value)}
                />
                <img
                  src={linkIcon}
                  alt="Upload Icon"
                  className="syscreate-drag-icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleDocSubmit}
                />
              </div>
            </div>
          </div>

                    {/* KeyInfo Section */}


          <div className="syscreate-poll-container">
            <span className="syscreate-poll-title">Add key information</span>

            <input
              className="syscreate-question-input"
              placeholder="Title"
              value={keyInfoTitle}
              onChange={(e) => setKeyInfoTitle(e.target.value)}
            />

            <div className="syscreate-options">
              <div className="syscreate-option-item" style={{ width: "100%" }}>
                <input
                  type="text"
                  className="syscreate-option-input"
                  placeholder="Information"
                  value={keyInfoContent}
                  onChange={(e) => setKeyInfoContent(e.target.value)}
                />
                <img
                  src={linkIcon}
                  alt="Submit"
                  className="syscreate-drag-icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleKeyInfoSubmit}
                />
              </div>
            </div>
          </div>



           {/* POLL SECTION */}
          <div className="syscreate-poll-container">
            <span className="syscreate-poll-title">Create a poll</span>
            <input
              className="syscreate-question-input"
              placeholder="Ask a question"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
            />
            <div className="syscreate-options">
              {options.map((opt, index) => (
                <div key={index} className="syscreate-option-item">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="syscreate-option-input"
                  />
                  <img src={dragIcon} alt="Drag Icon" className="syscreate-drag-icon" />
                </div>
              ))}
            </div>
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
                value={pollDeadline}
                onChange={(e) => setPollDeadline(e.target.value)}
              />
            </div>
            <div className="syscreate-switches">
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
            <button className="syscreate-submit-button" onClick={handlePollSubmit}>
              Submit Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SysCreatePage;
