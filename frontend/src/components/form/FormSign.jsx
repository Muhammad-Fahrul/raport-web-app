import "./formSign.css";
const FormSign = ({ type, setPhoneNumber, setPassword, handleSubmit }) => {
  return (
    <form className="flip-card__form" action="">
      <input
        className="flip-card__input"
        name="phoneNumber"
        placeholder="Number"
        type="phoneNumber"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        className="flip-card__input"
        name="password"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="flip-card__btn" onClick={(e) => handleSubmit(e, type)}>
        Lets go!
      </button>
    </form>
  );
};

export default FormSign;
