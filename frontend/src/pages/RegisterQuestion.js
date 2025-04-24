import React, { useState } from "react";
import "../styles/RegisterQuestion.css";
import logo from "../assets/nexus.webp";
import { useNavigate } from "react-router-dom";

const RegisterQuestion = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      if (!selectedOption) {
        alert("Please select an option");
        return;
      }

      const token = localStorage.getItem("token");
          let role = "";
          if (selectedOption === "join-group") {
            role = "user";
          } else if (selectedOption === "create-group") {
            role = "sysadmin";
          } else {
            alert("Invalid option selected.");
            return;
          }

          fetch("http://localhost:5000/api/role", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ role }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Role saved:", data.message);

              // Redirect based on role
              if (role === "user") {
                navigate("/userpage");
              } else if (role === "sysadmin") {
                navigate("/syspage");
              }
            })
            .catch((err) => {
              console.error("Role save error:", err);
              alert("Couldn't save your role.");
            });
        };


  return (
    <div className="register-question-container">
      <img src={logo} alt="Nexus Logo" className="logo" />
      <h2>What is your next move?</h2>

      <form onSubmit={handleSubmit}>
        <label className="checkbox-label">
          <input
            type="radio"
            value="join-group"
            checked={selectedOption === "join-group"}
            onChange={handleOptionChange}
          />
          <span>I am joining a group</span>
        </label>

        <label className="checkbox-label">
          <input
            type="radio"
            value="create-group"
            checked={selectedOption === "create-group"}
            onChange={handleOptionChange}
          />
          <span>I am creating a group</span>
        </label>

        <label className="checkbox-label">
          <input
            type="radio"
            value="join-firm"
            checked={selectedOption === "join-firm"}
            onChange={handleOptionChange}
          />
          <span>I am joining a firm account</span>
        </label>

        <label className="checkbox-label">
          <input
            type="radio"
            value="create-firm"
            checked={selectedOption === "create-firm"}
            onChange={handleOptionChange}
          />
          <span>I am creating a firm account</span>
        </label>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default RegisterQuestion;
