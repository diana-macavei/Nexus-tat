import React, { useState } from "react";
import "../styles/RegisterQuestion.css";
import logo from "../assets/nexus.webp";

const RegisterQuestion = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);
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
