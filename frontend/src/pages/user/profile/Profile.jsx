import './profile.css';
import profile from '../../../assets/icons/user.svg';
import logoutIcon from '../../../assets/icons/logout.svg';
import editIcon from '../../../assets/icons/settings.svg';

import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../components/loader/Loader';
import Button from '../../../components/button/Button';

import useAuth from '../../../hooks/useAuth';
import { useGetUserQuery } from '../redux/userApiSlice';
import { useLogoutMutation } from '../../auth/redux/authApiSlice';
import { selectCurrentUser, setUser } from '../redux/userSlice';
import { useDeleteStudentMutation } from '../../student/redux/studentApiSlice';

const Profile = () => {
  const { username } = useParams();

  const currentUser = useAuth();
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => selectCurrentUser(state));

  const { data, isSuccess, isLoading, isError, error } =
    useGetUserQuery(username);

  const [logout, { isLoading: isLoadingLogout, isError: isErrorLogout }] =
    useLogoutMutation();

  const [
    deleteStudent,
    { isLoading: isLoadingDelete, isError: isErrorDelete },
  ] = useDeleteStudentMutation();

  const logoutHandler = () => {
    const removeCred = async () => {
      try {
        await logout().unwrap();
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    };
    removeCred();
  };

  const deleteHandler = (id) => {
    const delStudent = async () => {
      try {
        await deleteStudent({ id });
        navigate('/students');
      } catch (error) {
        console.log(error);
      }
    };

    delStudent();
  };

  useEffect(() => {
    if (isSuccess) {
      dispacth(setUser(data));
    }
  }, [isSuccess, dispacth, data]);

  if (isLoading) {
    return <Loader />;
  } else if (isError || isErrorLogout || isErrorDelete) {
    return <h1>{error.data.message}</h1>;
  }

  const buttonComp =
    username === currentUser.username && user.role === 'mentor' ? (
      <Button url="/students" text="Students" />
    ) : currentUser.role === 'mentor' ? (
      <button
        className="delete"
        onClick={() => deleteHandler(user._id)}
        style={{ width: 'min-content', backgroundColor: 'red' }}
      >
        Delete
      </button>
    ) : username === currentUser.username && user.role === 'student' ? (
      <Button url={`/students/${user.username}/raports`} text="Raport" />
    ) : user.role === 'mentor' ? (
      <Button url="/students" text="Students" />
    ) : null;

  return (
    <>
      <div className="container-profile">
        <div className="profile">
          <img src={profile} alt="error" />
        </div>
        <div className="description">
          <div className="top">
            <h1>Profile</h1>
            {username === currentUser.username && (
              <div>
                <Link to={`/${currentUser.username}/edit`}>
                  <img title="edit" src={editIcon} alt="" />
                </Link>
                <span style={{ cursor: 'pointer' }} onClick={logoutHandler}>
                  <img title="logout" src={logoutIcon} alt="" />
                </span>
              </div>
            )}
          </div>
          <div className="bottom">
            <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {user.role}
            </p>
            <p>{user.username}</p>
            <p>{user.phone}</p>
            {buttonComp}
          </div>
        </div>
      </div>

      {isLoadingLogout && <Loader />}
      {isLoadingDelete && <Loader />}
    </>
  );
};

export default Profile;
