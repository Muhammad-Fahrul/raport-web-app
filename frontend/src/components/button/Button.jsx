import { Link } from "react-router-dom";
import "./button.css";
const Button = ({ url, text }) => {
  return (
    <div className="main-btn">
      <Link to={url}>
        <button>
          {text}
          <div className="wrapper-arrow">
            <div className="arrow"></div>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Button;
