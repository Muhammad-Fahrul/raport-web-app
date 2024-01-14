import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { useGetTopStudentsQuery } from "../../../slices/usersApiSlice";
import Error from "../../../components/error/Error";

const QuranRank = () => {
  const {
    data: topStudents,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetTopStudentsQuery();

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    console.log(topStudents);
    content = topStudents
      .filter((item) => item.isQuran)
      .map((student, i) => (
        <Link
          key={student._id}
          to={`/me/students/raports/${student._id}/${student.username}`}
        >
          <li className="wrapper-card">
            <div className="card-img rank">
              <span>{i + 1}</span>
            </div>
            <div className="card-text-box">
              <p className="">
                {student.fullname || (
                  <strike>
                    <i>{"no name"}</i>
                  </strike>
                )}
              </p>
              <p className="">{student.total || 0}</p>
            </div>
          </li>
        </Link>
      ));
  } else if (isError) {
    content = <Error message={error.data?.message} />;
  }
  return <>{content}</>;
};

export default QuranRank;
