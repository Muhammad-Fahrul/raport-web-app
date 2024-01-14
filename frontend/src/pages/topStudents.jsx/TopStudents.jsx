import "./topStudents.css";
import { useState } from "react";
import { useGetTopStudentsQuery } from "../../slices/usersApiSlice";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
import Students from "./components/Students";
const TopStudents = () => {
  const [display, setDisplay] = useState(true);

  const {
    data: topStudents,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetTopStudentsQuery();

  let displayedStudents;
  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    if (display) {
      displayedStudents = topStudents.filter((student) => student.isQuran);
    } else {
      displayedStudents = topStudents.filter((student) => !student.isQuran);
    }
  } else if (isError) {
    return <Error message={error.data?.message} />;
  }

  return (
    <div className="container-top-students">
      <h1>Top Students</h1>
      <div className="toggle-students-opt">
        <button
          className={display ? "active" : ""}
          onClick={() => setDisplay(true)}
        >
          Al-Quran
        </button>
        <button
          className={display ? "" : "active"}
          onClick={() => setDisplay(false)}
        >
          IQRO
        </button>
      </div>
      <ul className="container-card">
        <Students students={displayedStudents} />
      </ul>
    </div>
  );
};

export default TopStudents;
