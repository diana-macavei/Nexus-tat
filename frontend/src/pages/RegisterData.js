import React, { useState } from "react";
import "../styles/RegisterData.css";
import logo from "../assets/nexus.webp";

const RegisterData = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", formData);
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
