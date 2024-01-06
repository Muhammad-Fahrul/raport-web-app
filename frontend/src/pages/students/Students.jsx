import { Link } from "react-router-dom";
import "./students.css";
import { useGetStudentsQuery } from "../../slices/mentorApiSlice.js";
import Loader from "../../components/loader/Loader.jsx";
import Error from "../../components/error/Error.jsx";

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
    <div className="students-container">
      <ul className="students-wrapper">
        <h2>My students</h2>
        <div className="students-wrapper-items">
          {isSuccess &&
            (myStudents.length < 1 ? (
              <h1>belum ada siswa</h1>
            ) : (
              myStudents.map((student) => (
                <Link
                  key={student._id}
                  to={`/me/students/raports/${student._id}/${student.username}`}
                >
                  <li className="cardCollection">
                    <div className="cardCollectionimg"></div>
                    <div className="cardCollectiontextBox">
                      <p className="cardCollectionp">{student.username}</p>
                      <div className="cardCollectiontextContent">
                        {student.raport && (
                          <>
                            <p className="cardCollectionh">
                              {student.raport.title}
                            </p>
                            <p className="cardCollectionh">
                              {student.raport.verse}
                            </p>
                          </>
                        )}
                      </div>
                      <div></div>
                    </div>
                  </li>
                </Link>
              ))
            ))}
        </div>
      </ul>
      <Link to="/me/students/new">
        <button className="Btn new-students-btn">
          <div className="sign">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
              />
            </svg>
          </div>
          <div className="text">New</div>
        </button>
      </Link>
      {isLoading && <Loader />}
    </div>
  );
};

export default Students;
