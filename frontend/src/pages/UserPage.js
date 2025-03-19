import React from "react";
import "../styles/UserPage.css";
import logo from "../assets/nexus.webp"
import { Calendar, FileText, Info, List, User, BarChart, Clipboard } from "lucide-react";

const UserPage = () => {
  return (
    <div className="full-container">
      {/* Navbar with Logo */}
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Nexus Logo" className="navbar-logo" />
        </div>
        <div className="nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-card">
            <User className="profile-icon" />
          </div>
          <div className="user-info">
            <p className="profile-name">Name</p>
            <p className="profile-group">Group name</p>
            <p className="profile-group">Semigroup name</p>
          </div>
        </div>
        <div className="profile-info-box">
          <p> Group leader name</p>
          <p>Sys admin name</p>
          <p>Semigroup coordinator name</p>
          <p>Secretary name and phone no.</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="content-section">
        {/* Left Side - Key Info, Documents, Forms, Polls */}
        <div className="left-content">
          <h2 className="section-header">Read, complete and submit</h2>
          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <Info className="icon" />
                <p className="title">Key Information</p>
              </div>
              <p className="description">Updates, announcements, and details about your group’s activities in one place.</p>
            </div>
            <div className="card">
              <div className="card-header">
                <FileText className="icon" />
                <p className="title">Essential Documents</p>
              </div>
              <p className="description">View and download important files shared within your group.</p>
            </div>
            <div className="card">
              <div className="card-header">
                <List className="icon" />
                <p className="title">Forms</p>
              </div>
              <p className="description">Quickly fill out, submit, and manage forms assigned to you by your group.</p>
            </div>
            <div className="card">
              <div className="card-header">
                <List className="icon" />
                <p className="title">Polls</p>
              </div>
              <p className="description">Participate in polls and provide your input to help your group make informed decisions.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Notifications and Timeline */}
        <div className="right-content">
          <div className="notifications">
           <p className="section-title">Notifications</p>
            <div className="notification-item">
              <BarChart className="icon" /> GroupLeader added a new poll!
            </div>
            <div className="notification-item">
              <Clipboard className="icon" /> SysAdmin added a new form!
            </div>
            <div className="notification-item">
              <List className="icon" /> Information added!
            </div>
          </div>

          <div className="timeline">
            {/* Purple Header Section */}
            <div className="timeline-header">
              <p>Now:</p>
              <p>Due:</p>
              <p>Time remaining:</p>
            </div>

            {/* Timeline Content */}
            <div className="timeline-body">
              <p className="timeline-title">Timeline</p>
              <p>All due @ 11:59 PM</p>

              <div className="timeline-event">
                <Calendar className="timeline-icon" />
                <strong>Fri 13</strong> - Upload a form
              </div>

              <div className="timeline-event">
                <Calendar className="timeline-icon" />
                <strong>Wed 18</strong> - Participate in poll
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};

export default UserPage;
