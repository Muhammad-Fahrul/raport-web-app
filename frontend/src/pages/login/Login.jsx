import { useState } from "react";
import "./login.css"; // Make sure to import your CSS file
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader.jsx";
import FormSign from "../../components/form/FormSign.jsx";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumberM, setphoneNumberM] = useState("");
  const [passwordM, setPasswordM] = useState("");
  const [phoneNumberS, setphoneNumberS] = useState("");
  const [passwordS, setPasswordS] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const phoneNumber = type === "mentor" ? phoneNumberM : phoneNumberS;
    const password = type === "mentor" ? passwordM : passwordS;
    const isMentor = type === "mentor";
    const getCred = async () => {
      try {
        const res = await login({
          phoneNumber,
          password,
          isMentor,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    };
    getCred();
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            checked={isChecked}
            onChange={handleToggleChange}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className={`flip-card__inner ${isChecked ? "flipped" : ""}`}>
            <FormSign
              title="As a Mentor"
              type="mentor"
              setPhoneNumber={setphoneNumberM}
              setPassword={setPasswordM}
              handleSubmit={handleSubmit}
              isError={isError}
              error={error}
            />
            <FormSign
              title="As a Student"
              type="student"
              setPhoneNumber={setphoneNumberS}
              setPassword={setPasswordS}
              handleSubmit={handleSubmit}
              isError={isError}
              error={error}
            />
          </div>
        </label>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Login;
