import "./login.css";
import { useState } from "react";
import FormSign from "./components/FormSign.jsx";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="wrapper-login">
      <label className="switch">
        <input
          type="checkbox"
          className="toggle"
          checked={isChecked}
          onChange={handleToggleChange}
        />
        <span className="slider"></span>
        <span className="card-side"></span>
      </label>
      <div className={`flip-card__inner ${isChecked ? "flipped" : ""}`}>
        <FormSign title="As a Mentor" type="mentor" />
        <FormSign title="As a Student" type="student" />
      </div>
    </div>
  );
};

export default Login;
