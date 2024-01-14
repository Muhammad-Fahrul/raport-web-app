import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "../../../slices/mentorApiSlice";
import Loader from "../../../components/loader/Loader";

const QuranStudents = () => {
  const {
    data: students,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetStudentsQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = students
      .filter((item) => item.isQuran)
      .map((student) => (
        <Link
          key={student._id}
          to={`/me/students/raports/${student._id}/${student.username}`}
        >
          <li className="wrapper-card">
            <div className="card-img"></div>
            <div className="card-text-box">
              <p className="card-title">
                {student.nickname ? student.nickname : student.username}
              </p>
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
      ));
  } else if (isError) {
    content = <h1>{error?.data.message}</h1>;
  }

  return <>{content}</>;
};

export default QuranStudents;
