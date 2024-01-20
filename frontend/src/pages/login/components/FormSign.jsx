import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../slices/usersApiSlice.js";
import { setCredentials } from "../../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import "./formSign.css";
import { useEffect, useRef, useState } from "react";
import Loader from "../../../components/loader/Loader.jsx";
const FormSign = ({ title, type }) => {
  const messageAlert = useLoaderData();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isMentor = type === "mentor";
    const getCred = async () => {
      try {
        const res = await login({
          username,
          password,
          isMentor,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        console.log(err);
        if (!err) {
          setErrMsg("No Server Response");
        } else if (err.status === 400) {
          setErrMsg(err.data.message);
        } else if (err.status === 401) {
          setErrMsg(err.data.message);
        } else {
          setErrMsg("Login Failed");
        }
      }
    };
    getCred();
  };

  return (
    <>
      <div className={`flip-card__${type === "mentor" ? "front" : "back"}`}>
        <div className="title">
          <p>{title}</p>
          <p className={`${messageAlert ? "error-login-alert" : "offscreen"}`}>
            {messageAlert}
          </p>
          <p
            className={`${errMsg ? "error-login-alert" : "offscreen"}`}
            ref={errRef}
          >
            {errMsg}
          </p>
        </div>
        <form className="flip-card__form">
          <input
            className="flip-card__input"
            name="username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="flip-card__input"
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="flip-card__btn" onClick={(e) => handleSubmit(e)}>
            Lets go!
          </button>
        </form>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default FormSign;
