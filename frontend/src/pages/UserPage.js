import React, { useEffect, useState } from "react";
import "../styles/UserPage.css";
import logo from "../assets/nexus.webp";
import {
  Calendar,
  FileText,
  Info,
  List,
  User,
  BarChart,
  Clipboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NOTIFS_PER_PAGE = 5;

const UserPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [groupName, setGroupName] = useState("Group name");
  const [semigroupName, setSemigroupName] = useState("Semigroup name");
  const [secretary, setSecretary] = useState("Secretary name and phone no.");
  const [groupLeaderName, setGroupLeaderName] = useState("");
  const [sysAdminName, setSysAdminName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupId, setGroupId] = useState(null);
  const [deadlines, setDeadlines] = useState([]);
  const [loadingDeadlines, setLoadingDeadlines] = useState(true);

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);

    fetch(`http://localhost:5000/api/users/${decoded.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name);
        setGroupName(`Group ${data.group_name}`);
        setGroupLeaderName(data.group_leader_name);
        setSysAdminName(data.sysadmin_name);
        setGroupId(data.group_id);
      })
      .catch((err) => console.error("❌ Failed to load user info:", err));
  }, []);

  useEffect(() => {
    if (!groupId) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notifications/${groupId}`);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("❌ Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [groupId]);

  useEffect(() => {
    if (!groupId) return;

    const fetchDeadlines = async () => {
      setLoadingDeadlines(true);
      try {
        const res = await fetch(`http://localhost:5000/api/deadlines/${groupId}`);
        const data = await res.json();

        const now = new Date();
        const valid = data.filter(d => new Date(d.due_date) >= now);

        const sorted = [...valid].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        setDeadlines(sorted);
      } catch (err) {
        console.error("❌ Failed to fetch deadlines:", err);
      } finally {
        setLoadingDeadlines(false);
      }
    };


    fetchDeadlines();
  }, [groupId]);

  const totalPages = Math.ceil(notifications.length / NOTIFS_PER_PAGE);
  const paginatedNotifs = notifications.slice(
    (currentPage - 1) * NOTIFS_PER_PAGE,
    currentPage * NOTIFS_PER_PAGE
  );

  return (
    <div className="full-container">
      {/* Navbar */}
      <div className="navbar" style={{ position: 'relative' }}>
        <img src={logo} alt="Nexus Logo" className="navbar-logo" />
        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', marginLeft: '9rem' }}>My account</span>
      </div>

      <div className="main-wrapper">
        <div className="content-section">
          {/* Left */}
          <div className="left-content">
            <div className="profile-card-row">
              <div className="profile-card">
                <User className="profile-icon" />
              </div>
              <div className="user-info">
                <p className="gl-profile-name"><span style={{ fontWeight: 500 }}>Name:</span> {userName}</p>
                <p className="gl-profile-group"><span style={{ fontWeight: 500 }}>Group Name:</span> {groupName}</p>
                <p className="gl-profile-group"><span style={{ fontWeight: 500 }}>Semigroup Name:</span> {semigroupName}</p>
              </div>
            </div>

            <h2 className="section-header">Read, complete and submit</h2>
            <div className="card-grid">
              <div className="card" onClick={() => navigate("/info")}>
                <div className="card-header"><Info className="icon" /><p className="title">Key Information</p></div>
                <p className="description">Updates, announcements, and details about your group’s activities in one place.</p>
              </div>
              <div className="card" onClick={() => navigate("/docs")}>
                <div className="card-header"><FileText className="icon" /><p className="title">Essential Documents</p></div>
                <p className="description">View and download important files shared within your group.</p>
              </div>
              <div className="card" onClick={() => navigate("/forms")}>
                <div className="card-header"><List className="icon" /><p className="title">Forms</p></div>
                <p className="description">Quickly fill out, submit, and manage forms assigned to you by your group.</p>
              </div>
              <div className="card" onClick={() => navigate("/polls")}>
                <div className="card-header"><List className="icon" /><p className="title">Polls</p></div>
                <p className="description">Participate in polls and provide your input to help your group make informed decisions.</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="right-content">
            <div className="profile-info-box">
              <p>{groupLeaderName}</p>
              <p>{sysAdminName}</p>
              <p>Semigroup coordinator name</p>
              <p>{secretary}</p>
            </div>

            <div className="notifications">
              <p className="section-title">Notifications</p>
              {notifications.length === 0 ? (
                <p style={{ marginTop: "1rem" }}>No notifications yet.</p>
              ) : (
                paginatedNotifs.map((notif) => {
                  let Icon;
                  switch (notif.type) {
                    case "poll": Icon = BarChart; break;
                    case "form": Icon = Clipboard; break;
                    case "keyinfo": Icon = List; break;
                    case "document": Icon = FileText; break;
                    default: Icon = Info;
                  }

                  return (
                    <div key={notif.id} className="notification-item">
                      <Icon className="icon" />
                      <span>
                        {notif.message} <span className="notif-time">({getTimeAgo(notif.created_at)})</span>
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination-controls">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
              </div>
            )}

            {/* Timeline */}
            <div className="timeline">
              {loadingDeadlines ? (
                <div className="timeline-loading">
                  <p className="timeline-title">Timeline</p>
                  <p style={{ marginTop: "1rem", color: "#999" }}>Loading deadlines...</p>
                </div>
              ) : deadlines.length === 0 ? (
                <div className="timeline-empty">
                  <p className="timeline-title">Timeline</p>
                  <p style={{ marginTop: "1rem", color: "#999" }}>
                    ✅ No upcoming deadlines. You're all caught up!
                  </p>
                </div>
              ) : (
                <>
                  <div className="timeline-primary">
                    <p><strong>Now:</strong> {`${deadlines[0].type}: ${deadlines[0].title}`}</p>
                    <p><strong>Due:</strong> {new Date(deadlines[0].due_date).toLocaleDateString("en-GB")}</p>
                    <p><strong>Time remaining:</strong> {(() => {
                      const now = new Date();
                      const due = new Date(deadlines[0].due_date);
                      const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
                      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
                    })()}</p>
                  </div>

                  <div className="timeline-body">
                    <p className="timeline-title">Timeline</p>
                    <p>All due @ 11:59 PM</p>
                    {deadlines.map((d, index) => {
                      const dateObj = new Date(d.due_date);
                      const day = dateObj.toLocaleDateString("en-GB", { weekday: "short" });
                      const dayNum = dateObj.getDate();
                      const action = d.type.toLowerCase() === "poll" ? "Participate in poll" : "Upload a form";

                      return (
                        <div className="timeline-event" key={index}>
                          <Calendar className="timeline-icon" />
                          <strong>{day} {dayNum}</strong> – {action}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
