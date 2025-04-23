import React, { useState } from "react";
import "../styles/SysPolls.css";
import logo from "../assets/nexus.webp";
import {Home} from "lucide-react";
import {useNavigate} from "react-router-dom";

const pollEntries = [
  {
    no: 1,
    type: "Group",
    date: "03-03-2025",
    status: "Done",
    question: "Question",
    options: ["Option 1", "Option 2", "Option 3"],
    selected: [true, true, false],
  },
  {
    no: 2,
   type: "Hub",
    date: "12-01-2025",
    status: "Not Done",
    question: "Question",
    options: ["Option 1", "Option 2", "Option 3"],
    selected: [false, false, false],
  },
];

const SysPollsPage = () => {
  const [polls, setPolls] = useState(pollEntries);
  const navigate = useNavigate();

  const handleCheckboxChange = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].selected[optionIndex] =
      !updatedPolls[pollIndex].selected[optionIndex];
    setPolls(updatedPolls);
  };

  return (
    <div className="syspolls-full-container">
      {/* Navbar */}
      <div className="syspolls-navbar">
        <img src={logo} alt="Nexus Logo" className="syspolls-navbar-logo" />
        <Home
            className="back-icon"
            onClick={() => navigate("/syspage")}
            title="Back to Dashboard"
        />
        <div className="syspolls-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Content */}
      <div className="syspolls-content-section">
        {/* Left Buttons */}
        <div className="syspolls-left-buttons">
          <button className="syspolls-button" style={{ color: "black" }}>Hub info</button>
          <button className="syspolls-button" style={{ color: "black" }}>Essential data</button>
          <button className="syspolls-button" style={{ color: "black" }}>Manage and create</button>
          <button className="syspolls-button" style={{ color: "black" }}>Key Information</button>
          <button className="syspolls-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="syspolls-button" style={{ color: "black" }}>Forms</button>
          <button className="syspolls-button active" style={{ color: "#8a4ddf" }}>Polls</button>
        </div>

        {/* Polls Section */}
        <div className="syspolls-polls-section">
          <h2 className="syspolls-title">Ongoing polls</h2>

            {/* Header Bar */}
          <div className="syspolls-poll-header-bar">
            <span>No</span>
            <span>Type</span>
            <span>Date</span>
            <span>Status</span>
          </div>


          {polls.map((poll, index) => (
          <div key={index} className="syspolls-poll-container">
          <div className="syspolls-poll-top">
              <span className="syspolls-poll-number">{`0${poll.no}.`}</span>
              <span className="syspolls-poll-type">{poll.type}</span>
              <span className="syspolls-poll-date">{poll.date}</span>
              <span className={`syspolls-poll-status ${poll.status === "Done" ? "done" : "not-done"}`}>
              {poll.status}
              </span>
          </div>

              <div className="syspolls-poll-body">
              <p>{poll.question}</p>
                  <div className="syspolls-poll-options">
                      {poll.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                        <input
                          type="checkbox"
                          checked={poll.selected[optionIndex]}
                          onChange={() => handleCheckboxChange(index, optionIndex)}
                        />
                        {option}
                        </label>
                      ))}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SysPollsPage;
