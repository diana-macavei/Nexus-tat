import React, { useState } from "react";
import "../styles/Polls.css";
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

const PollsPage = () => {
  const [polls, setPolls] = useState(pollEntries);
  const navigate = useNavigate();

  const handleCheckboxChange = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].selected[optionIndex] =
      !updatedPolls[pollIndex].selected[optionIndex];
    setPolls(updatedPolls);
  };

  return (
    <div className="polls-full-container">
      {/* Navbar */}
      <div className="polls-navbar">
        <img src={logo} alt="Nexus Logo" className="polls-navbar-logo" />
        <Home
            className="back-icon"
            onClick={() => navigate("/userpage")}
            title="Back to Dashboard"
          />
        <div className="polls-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Content */}
      <div className="polls-content-section">
        {/* Left Buttons */}
        <div className="polls-left-buttons">
          <button className="polls-button" style={{ color: "black" }}>Key Information</button>
          <button className="polls-button" style={{ color: "black" }}>Essential Documents</button>
          <button className="polls-button" style={{ color: "black" }}>Forms</button>
          <button className="polls-button active" style={{ color: "#8a4ddf" }}>Polls</button>
        </div>

        {/* Polls Section */}
        <div className="polls-polls-section">
          <h2 className="polls-title">Ongoing polls</h2>

            {/* Header Bar */}
          <div className="polls-poll-header-bar">
            <span>No</span>
            <span>Type</span>
            <span>Date</span>
            <span>Status</span>
          </div>


          {polls.map((poll, index) => (
          <div key={index} className="polls-poll-container">
          <div className="polls-poll-top">
              <span className="polls-poll-number">{`0${poll.no}.`}</span>
              <span className="polls-poll-type">{poll.type}</span>
              <span className="polls-poll-date">{poll.date}</span>
              <span className={`polls-poll-status ${poll.status === "Done" ? "done" : "not-done"}`}>
              {poll.status}
              </span>
          </div>

              <div className="polls-poll-body">
              <p>{poll.question}</p>
                  <div className="polls-poll-options">
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

export default PollsPage;
