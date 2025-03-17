import React from "react";
import "../styles/AccountPage.css";
import logo from "../assets/nexus.webp";
import { User, Pencil } from "lucide-react";

const UserAccPage = () => {
  return (
    <div className="acc-full-container">
      {/* Navbar */}
      <div className="acc-navbar">
        <div className="acc-navbar-left">
          <img src={logo} alt="Nexus Logo" className="acc-navbar-logo" />
        </div>
        <div className="acc-nav-links">
          <span>My account</span>
          <span>Messages</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="acc-profile-section">
        <div className="acc-profile-card">
          <User className="acc-profile-icon" />
        </div>

        {/* Editable Fields */}
        <div className="acc-form">
          <div className="acc-input-box">
            <input type="text" placeholder="Name" />
            <Pencil className="acc-edit-icon" />
          </div>
          <div className="acc-input-box">
            <input type="email" placeholder="Email" />
            <Pencil className="acc-edit-icon" />
          </div>
          <div className="acc-input-box">
            <input type="tel" placeholder="Phone" />
            <Pencil className="acc-edit-icon" />
          </div>
          <div className="acc-input-box">
            <input type="text" placeholder="Group name" />
          </div>
          <div className="acc-input-box acc-last">
            <input type="text" placeholder="Hub name" />
            <span className="acc-leave">LEAVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccPage;