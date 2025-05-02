import React, {useEffect, useState} from "react";
import "../styles/RegisterData.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";


const RegisterData = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    groupId: "",
  });

  const navigate = useNavigate();
  const [groups, setGroups] = useState([]); // ✅ NEW state for groups

  useEffect(() => {
    // ✅ Fetch groups from backend
    fetch("http://localhost:5000/api/groups")
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error("Failed to fetch groups:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          groupId: formData.groupId,

        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token); // ✅ store token
            navigate("/registerquestion"); // ✅ go to next step
          } else {
            alert("Registration failed.");
          }
        })
        .catch((err) => {
          console.error("Registration error:", err);
          alert("Something went wrong.");
        });
    };


  return (
    <div className="register-container">
      <img src={logo} alt="Nexus Logo" className="logo" />
      <h2>Register here</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
        />

        {/* Select group dynamically */}
        <select name="groupId" value={formData.groupId} onChange={handleChange} required>
          <option value="">Select your group</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <button type="submit">Continue</button>
      </form>

      <div className="separator">
        <span></span> OR <span></span>
      </div>

      <p className="login-text">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default RegisterData;
