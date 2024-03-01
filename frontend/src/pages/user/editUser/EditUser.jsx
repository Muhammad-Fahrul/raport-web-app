import './editUser.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../redux/userSlice';

const EditUser = () => {
  const user = useSelector((state) => selectCurrentUser(state));

  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  //   const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  useEffect(() => {
    setFullname(user?.fullname || '');
    setNickname(user?.nickname || '');
    setPhoneNumber(user?.phoneNumber || '');
  }, [user?.nickname, user?.phoneNumber, user?.fullname]);

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     if (password !== conPassword) {
  //       alert("Passwords does not match");
  //     } else {
  //       try {
  //         const res = await updateUser({
  //           _id: userInfo._id,
  //           fullname,
  //           nickname,
  //           phoneNumber,
  //           password,
  //         }).unwrap();
  //         dispacth(setCredentials(res));
  //         alert("Profile updated successfully");
  //         navigate(`/me/${userInfo._id}`);
  //       } catch (err) {
  //         alert(err?.data?.message || err.error);
  //       }
  //     }
  //   };

  return (
    <form className="form" autoComplete="off">
      <p className="title">Update Profile</p>
      {/* {isError && <h3>{error.data.message}</h3>} */}
      <div className="flex">
        <label>
          <input
            placeholder=""
            type="text"
            className="input"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <span>Fullname</span>
        </label>

        <label>
          <input
            placeholder=""
            type="text"
            className="input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <span>Nickname</span>
        </label>
      </div>

      <label>
        <input
          placeholder=""
          type="number"
          className="input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <span>Phone Number</span>
      </label>

      <label>
        <input
          placeholder=""
          type="text"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>Password</span>
      </label>

      <label>
        <input
          placeholder=""
          type="text"
          className="input"
          value={conPassword}
          onChange={(e) => setConPassword(e.target.value)}
        />
        <span>Confirm Password</span>
      </label>

      <button className="submit">Submit</button>
      {/* {isLoading && <Loader />} */}
    </form>
  );
};

export default EditUser;
