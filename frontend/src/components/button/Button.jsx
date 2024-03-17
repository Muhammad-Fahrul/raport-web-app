import { Link, useLocation } from 'react-router-dom';
import './button.css';
const Button = ({ url, text }) => {
  const location = useLocation();
  return (
    <div className="container-main-btn">
      <Link to={url} state={{ from: location }}>
        <button className="main-btn">
          {text}
          <div className="arrow">
            <div className="__arrow"></div>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Button;
