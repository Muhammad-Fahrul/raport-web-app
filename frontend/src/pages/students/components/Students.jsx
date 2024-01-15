import { Link } from "react-router-dom";

const Students = ({ students }) => {
  let content = students.map((student) => (
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

  return <>{content}</>;
};

export default Students;
