import { useLoaderData } from "react-router-dom";
import "./formSign.css";
const FormSign = ({
  title,
  type,
  setUsername,
  setPassword,
  handleSubmit,
  isError,
  error,
}) => {
  const message = useLoaderData();
  return (
    <div className={`flip-card__${type === "mentor" ? "front" : "back"}`}>
      <div className="title">
        <p>{title}</p>
        {message && <p className="error-login-alert">{message}</p>}
        {isError && (
          <p className="error-login-alert">
            {error?.data?.message || "Internal Server Error"}
          </p>
        )}
      </div>
      <form className="flip-card__form" action="">
        <input
          className="flip-card__input"
          name="phoneNumber"
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
        <button
          className="flip-card__btn"
          onClick={(e) => handleSubmit(e, type)}
        >
          Lets go!
        </button>
      </form>
    </div>
  );
};

export default FormSign;
