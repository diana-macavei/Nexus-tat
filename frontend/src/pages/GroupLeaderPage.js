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
  Pencil,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NOTIFS_PER_PAGE = 5;

const GroupLeaderPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [semigroupName, setSemigroupName] = useState("Semigroup name");
  const [sysAdminName, setSysAdminName] = useState("");
  const [secretary, setSecretary] = useState("Secretary name and phone no.");
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
        setName(data.name);
        setGroupName(`Group ${data.group_name}`);
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
    <div className="gl-full-container">
      <div className="gl-navbar">
        <div className="navbar-left">
          <img src={logo} alt="Nexus Logo" className="gl-navbar-logo" />
        </div>
        <div className="gl-nav-links">
          <span>My account</span>
        </div>
      </div>

      <div className="gl-content-section">
        <div className="gl-left-content">
          <div className="gl-profile-card-row">
            <div className="gl-profile-card">
              <User className="gl-profile-icon" />
            </div>
            <div className="gl-user-info">
              <p className="gl-profile-name"><span style={{ fontWeight: 500 }}>Name:</span> {name}</p>
              <p className="gl-profile-group"><span style={{ fontWeight: 500 }}>Group Name:</span> {groupName}</p>
              <p className="gl-profile-group"><span style={{ fontWeight: 500 }}>Semigroup Name:</span> {semigroupName}</p>
            </div>
          </div>
          <h2 className="gl-section-header">Manage your group</h2>
          <div className="gl-manage-group-columns">
            <div className="gl-manage-group-col">
              <div className="gl-card" onClick={() => navigate("/")}>
                <div className="gl-card-header"><Users className="icon" /><p className="title">Group info</p></div>
                <p className="gl-description">Explore detailed information about your group members</p>
              </div>
              <div className="gl-card" onClick={() => navigate("/")}>
                <div className="gl-card-header"><FileText className="icon" /><p className="title">Essential data</p></div>
                <p className="gl-description">See information about the ongoing forms and polls.</p>
              </div>
              <div className="gl-card" onClick={() => navigate("/glcreate")}>
                <div className="gl-card-header"><Pencil className="icon" /><p className="title">Manage and create</p></div>
                <p className="gl-description">Create and add key information forms, polls, deadlines to assign your group.</p>
              </div>
            </div>
            <div className="gl-manage-group-col">
              <div className="gl-card" onClick={() => navigate("/glinfo")}>
                <div className="gl-card-header"><Info className="icon" /><p className="title">Key Information</p></div>
                <p className="gl-description">Updates, announcements, and group activity details in one place.</p>
              </div>
              <div className="gl-card" onClick={() => navigate("/gldocs")}>
                <div className="gl-card-header"><FileText className="icon" /><p className="title">Essential Documents</p></div>
                <p className="gl-description">Download important files shared within your group.</p>
              </div>
              <div className="gl-card" onClick={() => navigate("/glforms")}>
                <div className="gl-card-header"><List className="icon" /><p className="title">Forms</p></div>
                <p className="gl-description">Fill out and manage forms assigned to your group.</p>
              </div>
              <div className="gl-card" onClick={() => navigate("/glpolls")}>
                <div className="gl-card-header"><List className="icon" /><p className="title">Polls</p></div>
                <p className="gl-description">Participate in polls and help your group make decisions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="gl-right-content">
          <div className="gl-profile-info-box">
            <p>{sysAdminName}</p>
            <p>Semigroup coordinator name</p>
            <p>{secretary}</p>
          </div>
          <div className="gl-notifications">
            <p className="gl-section-title">Notifications</p>
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
                  <div key={notif.id} className="gl-notification-item">
                    <Icon className="icon" />
                    <span>
                      {notif.message} <span className="gl-notif-time">({getTimeAgo(notif.created_at)})</span>
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {totalPages > 1 && (
            <div className="gl-pagination-controls">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}

          <div className="gl-timeline">
            {loadingDeadlines ? (
              <div className="timeline-loading">
                <p className="gl-timeline-title">Timeline</p>
                <p style={{ marginTop: "1rem", color: "#999" }}>Loading deadlines...</p>
              </div>
            ) : deadlines.length === 0 ? (
              <div className="gl-timeline-empty">
                <p className="gl-timeline-title">Timeline</p>
                <p style={{ marginTop: "1rem", color: "#999" }}>
                  ✅ No upcoming deadlines. You're all caught up!
                </p>
              </div>
            ) : (
              <>
                <div className="gl-timeline-primary">
                  <p><strong>Now:</strong> {`${deadlines[0].type}: ${deadlines[0].title}`}</p>
                  <p><strong>Due:</strong> {new Date(deadlines[0].due_date).toLocaleDateString("en-GB")}</p>
                  <p><strong>Time remaining:</strong> {(() => {
                    const now = new Date();
                    const due = new Date(deadlines[0].due_date);
                    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
                    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
                  })()}</p>
                </div>

                <div className="gl-timeline-body">
                  <p className="gl-timeline-title">Timeline</p>
                  <p>All due @ 11:59 PM</p>
                  {deadlines.map((d, index) => {
                    const dateObj = new Date(d.due_date);
                    const day = dateObj.toLocaleDateString("en-GB", { weekday: "short" });
                    const dayNum = dateObj.getDate();
                    const action = d.type.toLowerCase() === "poll" ? "Participate in poll" : "Upload a form";
                    return (
                      <div className="gl-timeline-event" key={index}>
                        <Calendar className="gl-timeline-icon" />
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
  );
};

export default GroupLeaderPage;
