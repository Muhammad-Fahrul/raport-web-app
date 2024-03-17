import { Link } from 'react-router-dom';
import './navbar.css';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useScroll from '../../hooks/useScroll';

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const { username } = useAuth();
  const height = useScroll();
  return (
    <div className={`container-navbar ${height >= 10 ? 'shadow' : ''}`}>
      <div className="wrapper">
        <div className="left">
          <Link to="/">
            <h1>
              R<span style={{ fontSize: '1rem' }}>aport</span>
            </h1>
          </Link>
        </div>
        <div className="right">
          {token && (
            <div className="nav-btns">
              <Link to={`/${username}`}>
                <span className="profile">{username[0]}</span>
              </Link>
              {/* <Link to="/students">
                <span href="#" className="tab">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                    />
                  </svg>
                </span>
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
