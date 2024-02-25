import './register.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';

const Register = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username);
  }, [username]);

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = (e) => {
    e.preventDefault();
    const getCred = async () => {
      try {
        const res = await register({
          username,
          phoneNumber,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    };
    getCred();
  };

  return (
    <div className="wrapper">
      <div className="flip-card__front register">
        <div className="title">Sign Up</div>
        <form className="flip-card__form" onSubmit={submitHandler}>
          <input
            className="flip-card__input"
            name="username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="flip-card__input"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={(e) => setphoneNumber(e.target.value)}
            type="text"
          />
          <input
            className="flip-card__input"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button className="flip-card__btn">Lets go!</button>
        </form>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Register;
