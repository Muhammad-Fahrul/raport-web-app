import './newStudent.css';

import { useState } from 'react';

import Loader from '../../../components/loader/Loader.jsx';

import { useAddNewStudentMutation } from '../redux/studentApiSlice.js';

const NewStudent = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [addNewStudent, { isLoading }] = useAddNewStudentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const addStudent = async () => {
      try {
        const res = await addNewStudent({
          username,
          phoneNumber,
          password,
        }).unwrap();
        alert(`${res.message}`);
        setUsername('');
        setphoneNumber('');
        setPassword('');
      } catch (err) {
        console.error(err?.data?.message || err.error);
        alert(`${username} gagal ditambahkan`);
      }
    };
    addStudent();
  };
  return (
    <div className="student-new-container">
      <form onSubmit={handleSubmit} className="student-new-card create-student">
        <a className="singup">New Student</a>

        <div className="inputBox">
          <input
            type="text"
            required="required"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Username</span>
        </div>

        <div className="inputBox1">
          <input
            type="text"
            required="required"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <span>Number</span>
        </div>

        <div className="inputBox">
          <input
            type="text"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </div>

        <button className="enter">Enter</button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default NewStudent;
