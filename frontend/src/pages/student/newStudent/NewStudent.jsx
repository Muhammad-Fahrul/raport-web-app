import './newStudent.css';

import { useEffect, useRef, useState } from 'react';

import Loader from '../../../components/loader/Loader.jsx';

import { useAddNewStudentMutation } from '../redux/studentApiSlice.js';

const NewStudent = () => {
  const [username, setUsername] = useState('');
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  const [addNewStudent, { isLoading, isError, error }] =
    useAddNewStudentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const addStudent = async () => {
      try {
        const res = await addNewStudent({
          username,
          phone,
          password,
        }).unwrap();
        alert(`${res.message}`);
        setUsername('');
        setphone('');
        setPassword('');
      } catch (err) {
        alert(`${username} gagal ditambahkan`);
      }
    };
    addStudent();
  };

  useEffect(() => {
    setErr(null);
  }, [username, password, phone]);

  useEffect(() => {
    if (isError) {
      setErr(error.data.message);
    }
  }, [isError, error]);

  return (
    <div className="student-new-container">
      <form onSubmit={handleSubmit} className="student-new-card create-student">
        <div className="singup">
          <h1 style={{ fontSize: '1em' }}>New Student</h1>
          {err && <p style={{ fontSize: '.4em', color: 'red' }}>{err}</p>}
        </div>
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
            value={phone}
            onChange={(e) => setphone(e.target.value)}
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
