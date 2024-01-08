import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";
import Button from "../../components/button/Button";
const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="container-home">
      <div className="wrapper-home">
        <div className="wrapper-home-item">
          {!userInfo ? (
            <>
              <div>
                <h1>Raport</h1>
                <p>Easy way to to mark your student daily achievment</p>
              </div>
              <Button url="/login" text="Login" />
            </>
          ) : userInfo.isMentor ? (
            <>
              <div>
                <h1>Welcome</h1>
                <p>
                  Start your <strong>Marking Student Achievement</strong>
                </p>
              </div>
              <Button url={`/me/students`} text="Let's Go" />
            </>
          ) : (
            <>
              <div>
                <h1>Welcome</h1>
                <p>
                  see how far your <strong>Achievement</strong> are
                </p>
              </div>
              <Button
                url={`/me/students/raports/${userInfo._id}/${userInfo.username}`}
                text="Let's Go"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
