import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setStudent } from "../../../slices/studentSlice";

const Students = ({ students }) => {
  const dispatch = useDispatch();

  const handleClick = (student) => {
    dispatch(setStudent(student));
  };

  let content = students.map((student) => (
    <Link
      key={student._id}
      to={`/me/students/raports/${student._id}/${student.username}`}
      onClick={() => handleClick(student)}
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

  return <>{content}</>;
};

export default Students;
