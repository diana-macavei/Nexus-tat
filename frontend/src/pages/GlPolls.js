import React, { useState } from "react";
import "../styles/GlPolls.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

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

const GlPollsPage = () => {
  const [polls, setPolls] = useState(pollEntries);
  const navigate = useNavigate();

  const handleCheckboxChange = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].selected[optionIndex] =
      !updatedPolls[pollIndex].selected[optionIndex];
    setPolls(updatedPolls);
  };

  return (
    <div className="glpolls-full-container">
      {/* Navbar */}
      <div className="glpolls-navbar">
        <img src={logo} alt="Nexus Logo" className="glpolls-navbar-logo" />
        <Home
            className="back-icon"
            onClick={() => navigate("/glpage")}
            title="Back to Dashboard"
        />
        <div className="glpolls-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Content */}
      <div className="glpolls-content-section">
        {/* Left Buttons */}
        <div className="glpolls-left-buttons">
          <button className="glpolls-button" style={{ color: "black" }}>Group info</button>
          <button className="glpolls-button" style={{ color: "black" }}>Essential data</button>
          <button className="glpolls-button" style={{ color: "black" }}>Manage and create</button>
          <button className="glpolls-button" style={{ color: "black" }}>Key Information</button>
          <button className="glpolls-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="glpolls-button" style={{ color: "black" }}>Forms</button>
          <button className="glpolls-button active" style={{ color: "#8a4ddf" }}>Polls</button>
        </div>

        {/* Polls Section */}
        <div className="glpolls-polls-section">
          <h2 className="glpolls-title">Ongoing polls</h2>

            {/* Header Bar */}
          <div className="glpolls-poll-header-bar">
            <span>No</span>
            <span>Type</span>
            <span>Date</span>
            <span>Status</span>
          </div>


          {polls.map((poll, index) => (
          <div key={index} className="glpolls-poll-container">
          <div className="glpolls-poll-top">
              <span className="glpolls-poll-number">{`0${poll.no}.`}</span>
              <span className="glpolls-poll-type">{poll.type}</span>
              <span className="glpolls-poll-date">{poll.date}</span>
              <span className={`glpolls-poll-status ${poll.status === "Done" ? "done" : "not-done"}`}>
              {poll.status}
              </span>
          </div>

              <div className="glpolls-poll-body">
              <p>{poll.question}</p>
                  <div className="glpolls-poll-options">
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

export default GlPollsPage;
