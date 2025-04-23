import React from "react";
import "../styles/SysAdminPage.css";
import logo from "../assets/nexus.webp";
import { Calendar, FileText, Info, List, User, BarChart, Clipboard, Pencil, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";


const GroupLeaderPage = () => {
  const navigate = useNavigate();
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
        </div>
      </div>

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
