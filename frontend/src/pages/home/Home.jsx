import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";
const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="home-item bottom">
          {!userInfo ? (
            <>
              <div className="home-item top">
                <h1>Raport</h1>
                <p>Easy way to to mark your student daily achievment</p>
                <Link to="/login">
                  <button className="flip-card__btn">Login</button>
                </Link>
              </div>
            </>
          ) : userInfo.isMentor ? (
            <div className="second">
              <h2>Welcome</h2>
              <p>Start your student marking achievment</p>
              <Link to="/me/students">
                <button className="flip-card__btn">lets Go</button>
              </Link>
            </div>
          ) : (
            <h1>Welcome, see how far your achievments are</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
