import React, {useState} from "react";
import "../styles/Login.css";
import logo from "../assets/nexus.webp"
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();

      fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);

            const decoded = jwtDecode(data.token);
            const role = decoded.role;

            // ✅ Route based on role
            if (role === "user") navigate("/userpage");
            else if (role === "sysadmin") navigate("/syspage");
            else if (role === "groupleader") navigate("/glpage");
            else navigate("/user"); // default fallback
          } else {
            alert("Login failed.");
          }
        })
        .catch((err) => {
          console.error("Login error:", err);
          alert("Something went wrong.");
        });
    };


    return (
        <div className="login-container">
            <img src={logo} alt="Nexus Logo" className="logo"/>
            <h2>Welcome to Nexus</h2>
            <p className="subtitle">Log in to continue</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Continue</button>
            </form>

            <div className="separator">
                <span></span> OR <span></span>
            </div>

            <p className="signup-text">
                Don't have an account? <a href="/registerdata">Sign up</a>
            </p>

        </div>
    );

};

export default Login;