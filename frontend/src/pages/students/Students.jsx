import { Link } from "react-router-dom";
import "./students.css";
import { useGetStudentsQuery } from "../../slices/mentorApiSlice.js";
import Loader from "../../components/loader/Loader.jsx";
import Error from "../../components/error/Error.jsx";
import ButtonIcon from "../../components/button/ButtonIcon.jsx";

const Students = () => {
  const {
    data: myStudents,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetStudentsQuery();

  if (isError) {
    return <Error message={error.data?.message} />;
  }

  return (
    <div className="container-students">
      <h1>My students</h1>
      <ul className="container-card">
        {isSuccess &&
          (myStudents.length < 1 ? (
            <h2>belum ada siswa</h2>
          ) : (
            myStudents.map((student) => (
              <Link
                key={student._id}
                to={`/me/students/raports/${student._id}/${
                  student.username.split(" ")[0]
                }`}
              >
                <li className="wrapper-card">
                  <div className="card-img"></div>
                  <div className="card-text-box">
                    <p className="card-title">{student.username}</p>
                    <div className="card-text-content">
                      {student.raport && (
                        <>
                          <p className="card-detail">{student.raport.title}</p>
                          <p className="card-detail">{student.raport.verse}</p>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              </Link>
            ))
          ))}
      </ul>
      <Link to="/me/students/new">
        <ButtonIcon text={"NEW"}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.391 7.361.707-3.535a3 3 0 0 1 .82-1.533L7.929 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h4.259a2.975 2.975 0 0 1-.15-1.639ZM8.05 17.95a1 1 0 0 1-.981-1.2l.708-3.536a1 1 0 0 1 .274-.511l6.363-6.364a3.007 3.007 0 0 1 4.243 0 3.007 3.007 0 0 1 0 4.243l-6.365 6.363a1 1 0 0 1-.511.274l-3.536.708a1.07 1.07 0 0 1-.195.023Z" />
          </svg>
        </ButtonIcon>
      </Link>
      {isLoading && <Loader />}
    </div>
  );
};

export default Students;
