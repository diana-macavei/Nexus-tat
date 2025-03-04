import React from "react";
import "../styles/GroupLeaderPage.css";
import logo from "../assets/nexus.webp";
import { Calendar, FileText, Info, List, User, BarChart, Clipboard, Pencil, Users } from "lucide-react";

const GroupLeaderPage = () => {
  return (
    <div className="gl-full-container">
      {/* Navbar */}
      <div className="gl-navbar">
        <div className="gl-navbar-left">
          <img src={logo} alt="Nexus Logo" className="gl-navbar-logo" />
        </div>
        <div className="gl-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="gl-profile-section">
        <div className="gl-profile-container">
          <div className="gl-profile-card">
            <User className="gl-profile-icon" />
          </div>
          <div className="gl-user-info">
            <p className="gl-profile-name">Name</p>
            <p className="gl-profile-group">Group name</p>
            <p className="gl-profile-group">Semigroup name</p>
          </div>
        </div>
        <div className="gl-profile-info-box">
          <p> Sys admin name</p>
          <p>Semigroup coordinator name</p>
          <p>Secretary name and phone no.</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="gl-content-section">
        {/* Left Side - Administration Section */}
        <div className="gl-left-content">
          <h2 className="gl-section-header">Administration</h2>
          <div className="gl-card-grid">
            {/* Group Info */}
            <div className="gl-card">
              <div className="gl-card-header">
                <Users className="gl-icon" />
                <p className="gl-title">Group info</p>
              </div>
              <p className="gl-description">Explore detailed information about your group members.</p>
            </div>
            {/* Key Information */}
            <div className="gl-card">
              <div className="gl-card-header">
                <Info className="gl-icon" />
                <p className="gl-title">Key Information</p>
              </div>
              <p className="gl-description">Updates, announcements, and details about your group’s activities in one place.</p>
            </div>
            {/* Essential Data */}
            <div className="gl-card">
              <div className="gl-card-header">
                <FileText className="gl-icon" />
                <p className="gl-title">Essential data</p>
              </div>
              <p className="gl-description">See information about the ongoing forms and polls.</p>
            </div>
            {/* Essential Documents */}
            <div className="gl-card">
              <div className="gl-card-header">
                <FileText className="gl-icon" />
                <p className="gl-title">Essential Documents</p>
              </div>
              <p className="gl-description">View and download important files shared within your group.</p>
            </div>
            {/* Manage and Create */}
            <div className="gl-card">
              <div className="gl-card-header">
                <Pencil className="gl-icon" />
                <p className="gl-title">Manage and create</p>
              </div>
              <p className="gl-description">Create and add key information forms, polls, deadlines to assign your group for better organization.</p>
            </div>
            {/* Forms */}
            <div className="gl-card">
              <div className="gl-card-header">
                <List className="gl-icon" />
                <p className="gl-title">Forms</p>
              </div>
              <p className="gl-description">Quickly fill out, submit, and manage forms assigned to you by your group.</p>
            </div>
            {/* Polls */}
            <div className="gl-card">
              <div className="gl-card-header">
                <List className="gl-icon" />
                <p className="gl-title">Polls</p>
              </div>
              <p className="gl-description">Participate in polls and provide your input to help your group make informed decisions.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Notifications and Timeline */}
        <div className="gl-right-content">
          <div className="gl-notifications">
            <p className="gl-section-title">Notifications</p>
            <div className="gl-notification-item">
              <BarChart className="gl-icon" /> GroupLeader added a new poll!
            </div>
            <div className="gl-notification-item">
              <Clipboard className="gl-icon" /> SysAdmin added a new form!
            </div>
            <div className="gl-notification-item">
              <List className="gl-icon" /> Information added!
            </div>
          </div>

          <div className="gl-timeline">
            {/* Purple Header Section */}
            <div className="gl-timeline-header">
              <p>Now:</p>
              <p>Due:</p>
              <p>Time remaining:</p>
            </div>

            {/* Timeline Content */}
            <div className="gl-timeline-body">
              <p className="gl-timeline-title">Timeline</p>
              <p>All due @ 11:59 PM</p>

              <div className="gl-timeline-event">
                <Calendar className="gl-timeline-icon" />
                <strong>Fri 13</strong> - Upload a form
              </div>

              <div className="gl-timeline-event">
                <Calendar className="gl-timeline-icon" />
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
