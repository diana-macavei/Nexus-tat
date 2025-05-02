import React, { useState } from "react";
import "../styles/SysAdminPage.css";
import logo from "../assets/nexus.webp";
import { Calendar, FileText, Info, List, User, BarChart, Clipboard, Pencil, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";


const GroupLeaderPage = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [groupLeaderEmail, setGroupLeaderEmail] = useState("");

  const handleCreateGroup = async () => {
    if (!newGroupName) {
      alert("Please enter a group name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newGroupName,
          groupLeaderEmail: groupLeaderEmail || null,
        }),
      });

      if (response.ok) {
        alert("Group created successfully!");
        setShowSettings(false);
        setNewGroupName("");
        setGroupLeaderEmail("");
      } else {
        const data = await response.json();
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err.message);
      alert("Something went wrong.");
    }
  };

  // Close modal on ESC key
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowSettings(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Click outside to close
  const handleOutsideClick = () => {
    setShowSettings(false);
  };


  return (
    <div className="sys-full-container">
      {/* Navbar */}
      <div className="sys-navbar">
        <div className="sys-navbar-left">
          <img src={logo} alt="Nexus Logo" className="sys-navbar-logo" />
        </div>
        <div className="sys-nav-links">
          <span>My account</span>
          <span>Messages</span>
          <span onClick={() => setShowSettings(true)}>Settings</span>
        </div>
      </div>

      {showSettings && (
        <div className="sys-settings-modal" onClick={handleOutsideClick}>
          <div className="sys-settings-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create a Group</h2>

            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Group Leader Email (optional)"
              value={groupLeaderEmail}
              onChange={(e) => setGroupLeaderEmail(e.target.value)}
            />

            <button onClick={handleCreateGroup}>Create Group</button>
            <button onClick={() => setShowSettings(false)}>Cancel</button>
          </div>
        </div>
      )}



      {/* Profile Section */}
      <div className="sys-profile-section">
        <div className="sys-profile-container">
          <div className="sys-profile-card">
            <User className="sys-profile-icon" />
          </div>
          <div className="sys-user-info">
            <p className="sys-profile-name">Name</p>
            <p className="sys-profile-group">Group name</p>
            <p className="sys-profile-group">Semigroup name</p>
          </div>
        </div>
        <div className="sys-profile-info-box">
          <p>Secretary name and phone no.</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="sys-content-section">
        {/* Left Side - Administration Section */}
        <div className="sys-left-content">
          <h2 className="sys-section-header">Administration</h2>
          <div className="sys-card-grid">
            {/* Group Info */}
            <div className="sys-card" onClick={() => navigate("/")}>
              <div className="sys-card-header">
                <Users className="sys-icon" />
                <p className="sys-title">Hub info</p>
              </div>
              <p className="sys-description">Explore detailed information about your group members.</p>
            </div>
            {/* Key Information */}
            <div className="sys-card" onClick={() => navigate("/sysinfo")}>
              <div className="sys-card-header">
                <Info className="sys-icon" />
                <p className="sys-title">Key Information</p>
              </div>
              <p className="sys-description">Updates, announcements, and details about your group’s activities in one place.</p>
            </div>
            {/* Essential Data */}
            <div className="sys-card" onClick={() => navigate("/")}>
              <div className="sys-card-header">
                <FileText className="sys-icon" />
                <p className="sys-title">Essential data</p>
              </div>
              <p className="sys-description">See information about the ongoing forms and polls.</p>
            </div>
            {/* Essential Documents */}
            <div className="sys-card" onClick={() => navigate("/sysdocs")}>
              <div className="sys-card-header">
                <FileText className="sys-icon" />
                <p className="sys-title">Essential Documents</p>
              </div>
              <p className="sys-description">View and download important files shared within your group.</p>
            </div>
            {/* Manage and Create */}
            <div className="sys-card" onClick={() => navigate("/syscreate")}>
              <div className="sys-card-header">
                <Pencil className="sys-icon" />
                <p className="sys-title">Manage and create</p>
              </div>
              <p className="sys-description">Create and add key information forms, polls, deadlines to assign your group for better organization.</p>
            </div>
            {/* Forms */}
            <div className="sys-card" onClick={() => navigate("/sysforms")}>
              <div className="sys-card-header">
                <List className="sys-icon" />
                <p className="sys-title">Forms</p>
              </div>
              <p className="sys-description">Quickly fill out, submit, and manage forms assigned to you by your group.</p>
            </div>
            {/* Polls */}
            <div className="sys-card" onClick={() => navigate("/syspolls")}>
              <div className="sys-card-header">
                <List className="sys-icon" />
                <p className="sys-title">Polls</p>
              </div>
              <p className="sys-description">Participate in polls and provide your input to help your group make informed decisions.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Notifications and Timeline */}
        <div className="sys-right-content">
          <div className="sys-notifications">
            <p className="sys-section-title">Notifications</p>
            <div className="sys-notification-item">
              <BarChart className="sys-icon" /> GroupLeader added a new poll!
            </div>
            <div className="sys-notification-item">
              <Clipboard className="sys-icon" /> SysAdmin added a new form!
            </div>
            <div className="sys-notification-item">
              <List className="sys-icon" /> Information added!
            </div>
          </div>

          <div className="sys-timeline">
            {/* Purple Header Section */}
            <div className="sys-timeline-header">
              <p>Now:</p>
              <p>Due:</p>
              <p>Time remaining:</p>
            </div>

            {/* Timeline Content */}
            <div className="sys-timeline-body">
              <p className="sys-timeline-title">Timeline</p>
              <p>All due @ 11:59 PM</p>

              <div className="sys-timeline-event">
                <Calendar className="sys-timeline-icon" />
                <strong>Fri 13</strong> - Upload a form
              </div>

              <div className="sys-timeline-event">
                <Calendar className="sys-timeline-icon" />
                <strong>Wed 18</strong> - Participate in poll
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default GroupLeaderPage;
