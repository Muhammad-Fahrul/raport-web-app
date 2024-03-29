import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navbar.css";

const Navbar = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-item left">
          <Link to="/">
            <h1>RAPORT</h1>
          </Link>
        </div>
        <div className="navbar-item right">
          <div className="navigation-card">
            <Link to="/rank">
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
            </Link>
            {userInfo && (
              <Link to={`/me/${userInfo._id}`}>
                <span href="#" className="tab">
                  <svg
                    width="104"
                    height="100"
                    viewBox="0 0 104 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="21.5"
                      y="3.5"
                      width="60"
                      height="60"
                      rx="30"
                      stroke="black"
                      strokeWidth="7"
                    ></rect>
                    <g clipPath="url(#clip0_41_27)">
                      <mask
                        id="mask0_41_27"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="61"
                        width="104"
                        height="52"
                      >
                        <path
                          d="M0 113C0 84.2812 23.4071 61 52.1259 61C80.706 61 104 84.4199 104 113H0Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0_41_27)">
                        <path
                          d="M-7 113C-7 80.4152 19.4152 54 52 54H52.2512C84.6973 54 111 80.3027 111 112.749H97C97 88.0347 76.9653 68 52.2512 68H52C27.1472 68 7 88.1472 7 113H-7ZM-7 113C-7 80.4152 19.4152 54 52 54V68C27.1472 68 7 88.1472 7 113H-7ZM52.2512 54C84.6973 54 111 80.3027 111 112.749V113H97V112.749C97 88.0347 76.9653 68 52.2512 68V54Z"
                          fill="black"
                        ></path>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_41_27">
                        <rect
                          width="104"
                          height="39"
                          fill="white"
                          transform="translate(0 61)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
