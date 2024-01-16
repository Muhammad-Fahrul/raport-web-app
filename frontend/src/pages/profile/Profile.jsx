import { useDispatch, useSelector } from "react-redux";
import "./profile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import Loader from "../../components/loader/Loader";
import ButtonIcon from "../../components/button/ButtonIcon";
import Error from "../../components/error/Error";
import Button from "../../components/button/Button";
const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const logoutHandler = () => {
    const removeCred = async () => {
      try {
        await logoutApiCall().unwrap();
        navigate("/login");
        dispatch(logout());
      } catch (err) {
        console.error(err);
      }
    };
    removeCred();
  };

  if (userInfo) {
    if (userInfo._id !== userId) {
      return <Error message="resource is not found" />;
    }
  }

  return (
    <div className="container-profile">
      <div className="profile-detail">
        <div className="profile-detail-item">
          <svg viewBox="0 0 128 128">
            <circle r="60" fill="transparent" cy="64" cx="64"></circle>
            <circle r="48" fill="transparent" cy="64" cx="64"></circle>
            <path
              fill="#191919"
              d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z"
            ></path>
            <path
              opacity="1"
              fill="#191919"
              d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z"
            ></path>
            <circle r="7" fill="#fbc0aa" cy="65" cx="89"></circle>
            <path
              fill="#4bc190"
              d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z"
            ></path>
            <path
              opacity=".3"
              fill="#356cb6"
              d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z"
            ></path>
            <path
              opacity=".3"
              fill="#356cb6"
              d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z"
            ></path>
            <path
              fill="#fff"
              d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z"
            ></path>
            <path
              strokeWidth="14"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="#fbc0aa"
              fill="none"
              d="m64 88.75v9.75"
            ></path>
            <circle r="7" fill="#fbc0aa" cy="65" cx="39"></circle>
            <path
              fill="#ffd8ca"
              d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z"
            ></path>
            <path
              fill="#191919"
              d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z"
            ></path>
            <path
              style={{
                fill: "none",
                strokeLinecap: "round",
                stroke: "#fff",
                strokeMiterlimit: 10,
                strokeWidth: 2,
                opacity: 0.1,
              }}
              d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5"
            ></path>
            <path
              style={{
                fill: "none",
                strokeLinecap: "round",
                stroke: "#fff",
                strokeMiterlimit: 10,
                strokeWidth: 2,
                opacity: 0.1,
              }}
              d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3"
            ></path>
            <circle r="3" fill="#515570" cy="62.28" cx="76"></circle>
            <circle r="3" fill="#515570" cy="62.28" cx="52"></circle>
            <ellipse
              ry="2.98"
              rx="4.58"
              opacity="0.1"
              fill="#f85565"
              cy="69.67"
              cx="50.42"
            ></ellipse>
            <ellipse
              ry="2.98"
              rx="4.58"
              opacity="0.1"
              fill="#f85565"
              cy="69.67"
              cx="77.58"
            ></ellipse>
            <g strokeLinejoin="round" strokeLinecap="round" fill="none">
              <path strokeWidth="4" stroke="#fbc0aa" d="m64 67v4"></path>
              <path
                strokeWidth="2"
                stroke="#515570"
                opacity="0.2"
                d="m55 56h-9.25"
              ></path>
              <path
                strokeWidth="2"
                stroke="#515570"
                opacity="0.2"
                d="m82 56h-9.25"
              ></path>
            </g>
            <path
              opacity="0.4"
              fill="#f85565"
              d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z"
            ></path>
            <path
              fill="#f85565"
              d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z"
            ></path>
          </svg>
        </div>
        <div className="profile-detail-item">
          <div className="detail-text">
            <h1> Profile</h1>
            <Link to="/me/update">
              <div className="edit-profile-btn">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                  <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
              </div>
            </Link>
          </div>
          <p>
            {userInfo
              ? userInfo.isMentor
                ? "Mustami"
                : userInfo.isQuran
                ? "Al-Qur'an"
                : "IQRO"
              : ""}
          </p>
          <p>{userInfo?.fullname}</p>
          <p>{userInfo?.phoneNumber}</p>
          {userInfo &&
            (userInfo.isMentor ? (
              <Button url="/me/students" text="Students" />
            ) : (
              <Button
                url={`/me/students/raports/${userId}/${userInfo.username}`}
                text="Raport"
              />
            ))}
        </div>
      </div>
      <div onClick={logoutHandler}>
        <ButtonIcon text={"Logout"}>
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </ButtonIcon>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Profile;
