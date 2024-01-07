import "./createStudent.css";
import { useState } from "react";
import { useCreateStudentMutation } from "../../slices/mentorApiSlice.js";
import Loader from "../../components/loader/Loader.jsx";

const CreateStudent = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState(false);

  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const submitHandler = (e) => {
    e.preventDefault();
    const addStudent = async () => {
      try {
        const res = await createStudent({
          username,
          phoneNumber,
          password,
          isQuran: grade,
        }).unwrap();
        alert(`${res.username} berhasil ditambahkan`);
        setUsername("");
        setphoneNumber("");
        setPassword("");
        setGrade(false);
      } catch (err) {
        console.error(err?.data?.message || err.error);
        alert(`${username} gagal ditambahkan`);
      }
    };
    addStudent();
  };
  return (
    <div className="student-new-container">
      <form onSubmit={submitHandler} className="student-new-card">
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
            type="password"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </div>

        <div className="input-grade">
          <span>Al-Qur&#39;an</span>
          <input
            type="checkbox"
            onChange={() => {
              setGrade(!grade);
            }}
          />
        </div>

        <button className="enter">Enter</button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default CreateStudent;
