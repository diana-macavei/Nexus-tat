import React, {useState} from "react";
import "../styles/Login.css";
import logo from "../assets/nexus.webp"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
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
                Don't have an account? <a href="/register">Sign in</a>
            </p>

        </div>
    );

};

export default Login;