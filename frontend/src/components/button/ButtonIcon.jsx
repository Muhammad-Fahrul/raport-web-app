import "./buttonIcon.css";
const ButtonIcon = ({ children, text }) => {
  return (
    <button className="Btn">
      <div className="sign">{children}</div>
      <div className="text">{text}</div>
    </button>
  );
};

export default ButtonIcon;
