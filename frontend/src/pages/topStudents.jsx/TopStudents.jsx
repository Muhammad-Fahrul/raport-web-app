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
    <div className="students-container">
      <ul className="students-wrapper">
        <h2>Top Students</h2>
        <div className="students-wrapper-items">
          {isSuccess &&
            (topStudents.length < 1 ? (
              <h1>belum ada siswa</h1>
            ) : (
              topStudents.map((student, i) => (
                <Link
                  key={student._id}
                  to={`/me/students/raports/${student._id}/${student.username}`}
                >
                  <li className="cardCollection">
                    <div className="cardCollectionimg rank">
                      <span>{i + 1}</span>
                    </div>
                    <div className="cardCollectiontextBox">
                      <p className="cardCollectionp">{student.username}</p>
                      <div className="cardCollectiontextContent">
                        <p className="cardCollectionh">{student.total}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))
            ))}
        </div>
      </ul>
      {isLoading && <Loader />}
    </div>
  );
};

export default TopStudents;
