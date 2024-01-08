import { Link } from "react-router-dom";
import Error from "../../components/error/Error.jsx";
import { useGetTopStudentsQuery } from "../../slices/usersApiSlice";
import Loader from "../../components/loader/Loader.jsx";

import "./topStudents.css";
const TopStudents = () => {
  const {
    data: topStudents,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetTopStudentsQuery();

  if (isError) {
    return <Error message={error.data?.message} />;
  }

  return (
    <div className="container-top-students">
      <h1>Top Students</h1>
      <ul className="container-card">
        {isSuccess &&
          (topStudents.length < 1 ? (
            <h1>belum ada siswa</h1>
          ) : (
            topStudents.map((student, i) => (
              <Link
                key={student._id}
                to={`/me/students/raports/${student._id}/${student.username}`}
              >
                <li className="wrapper-card">
                  <div className="card-img rank">
                    <span>{i + 1}</span>
                  </div>
                  <div className="card-text-box">
                    <p className="">{student.username}</p>
                    <p className="">{student.total || 0}</p>
                  </div>
                </li>
              </Link>
            ))
          ))}
      </ul>
      {isLoading && <Loader />}
    </div>
  );
};

export default TopStudents;
