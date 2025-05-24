import React, { useEffect, useState } from "react";
import "../styles/Polls.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Home } from "lucide-react";

const PollsPage = () => {
  const [polls, setPolls] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [showAll, setShowAll] = useState(false);
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
      .catch((err) => console.error("❌ Failed to load user group:", err));
  }, []);

  useEffect(() => {
    if (!groupId) return;

    const fetchPolls = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/polls?type=hub");
        const rawPolls = await res.json();

        const filteredPolls = rawPolls
          .filter((poll) => poll.group_id === null || poll.group_id === groupId)
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        const today = new Date();
        const pollsWithSelections = filteredPolls.map((poll, index) => {
          const deadlineDate = new Date(poll.deadline);
          const isToday = deadlineDate.toDateString() === today.toDateString();
          const isExpired = deadlineDate < today;
          const diff = (deadlineDate - today) / (1000 * 60 * 60 * 24);

          return {
            no: index + 1,
            type: poll.type,
            date: deadlineDate.toLocaleDateString("en-GB"),
            deadline: deadlineDate,
            isToday,
            isExpired,
            status: isExpired ? "Expired" : "Open",
            urgency: diff < 0 ? "expired" : diff <= 3 ? "soon" : "ok",
            question: poll.question,
            options: poll.options.map((o) => o.option_text),
            selected: new Array(poll.options.length).fill(false),
            isAnonymous: poll.is_anonymous,
            allowMultiple: poll.allow_multiple,
          };
        });

        setPolls(pollsWithSelections);
      } catch (err) {
        console.error("❌ Failed to fetch polls:", err);
      }
    };

    fetchPolls();
  }, [groupId]);

  const handleCheckboxChange = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    if (!updatedPolls[pollIndex].allowMultiple) {
      updatedPolls[pollIndex].selected = updatedPolls[pollIndex].selected.map(() => false);
    }
    updatedPolls[pollIndex].selected[optionIndex] =
      !updatedPolls[pollIndex].selected[optionIndex];
    setPolls(updatedPolls);
  };

  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const due = new Date(deadline);
    const diff = (due - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "red";
    if (diff <= 3) return "orange";
    return "green";
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
          <div className="polls-poll-header-bar">
            <span>No</span>
            <span>Type</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {(showAll ? polls : polls.slice(0, 3)).map((poll, index) => (
            <div
              key={index}
              className={`polls-poll-container ${poll.status === "Expired" ? "highlight-done" : ""}`}
            >
              <div className="polls-poll-top">
                <span className="polls-poll-number">{`0${poll.no}.`}</span>
                <span className="polls-poll-type">{poll.type}</span>
                <span className="polls-poll-date" style={{ color: getDeadlineColor(poll.deadline) }}>
                  {poll.date}
                </span>
                <span className={`polls-poll-status ${poll.status === "Expired" ? "not-done" : "done"}`}>
                  {poll.status}
                </span>
              </div>

              <div className="polls-poll-body">
                <p>{poll.question}</p>
                <div className="polls-tags">
                  {poll.isAnonymous && <span className="polls-tag">🕶 Anonymous</span>}
                  {poll.allowMultiple && <span className="polls-tag">➕ Multi-Select</span>}
                  {poll.isToday && <span className="polls-tag urgent">⚠️ Closes Today</span>}
                </div>
                <div className="polls-poll-options">
                  {poll.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="checkbox"
                        checked={poll.selected[optionIndex]}
                        onChange={() => handleCheckboxChange(index, optionIndex)}
                        disabled={poll.status === "Expired"}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {polls.length > 3 && (
            <button
              className="polls-show-toggle"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollsPage;
