import "./home.css";
import { useSelector } from "react-redux";
import Button from "../../components/button/Button";
const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="container-home">
      <div className="wrapper-home">
        <div className="wrapper-home-item">
          <div>
            <h1>{userInfo ? "Welcome" : "Raport"}</h1>
            <p>
              {userInfo ? "Start " : "Easy way on "}
              {userInfo ? (
                <strong>Your Journey</strong>
              ) : (
                <strong>Marking Student Achievements</strong>
              )}
            </p>
          </div>
          <Button
            url={userInfo ? `/me/${userInfo?._id}` : "/login"}
            text={userInfo ? "Let's Go" : "Login"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
