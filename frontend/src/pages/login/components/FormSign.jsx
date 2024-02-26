import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../slices/authApiSlice.js';
import { setCredentials } from '../../../slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import './formSign.css';
import { useEffect, useState } from 'react';
import Loader from '../../../components/loader/Loader.jsx';

const FormSign = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const getCred = async () => {
      try {
        const {
          data: { accessToken },
        } = await login({
          username,
          password,
        }).unwrap();
        dispatch(setCredentials({ accessToken }));
        console.log(accessToken);
        navigate('/newstudent');
      } catch (err) {
        console.log(err);
        if (!err) {
          setErrMsg('No Server Response');
        } else if (err.status === 400) {
          setErrMsg(err.data.message);
          console.log(errMsg);
        } else if (err.status === 401) {
          setErrMsg(err.data.message);
        } else {
          setErrMsg('Login Failed');
        }

        console.log(errMsg);
      }
    };
    getCred();
  };

  return (
    <>
      <div className="title">
        <p>Login</p>
        <p className={`${errMsg ? 'err-alert' : 'offscreen'}`}>{errMsg}</p>
      </div>
      <form className="__form">
        <input
          className="__input"
          name="username"
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="__input"
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="__btn" onClick={(e) => handleSubmit(e)}>
          Lets go!
        </button>
      </form>
      {isLoading && <Loader />}
    </>
  );
};

export default FormSign;
