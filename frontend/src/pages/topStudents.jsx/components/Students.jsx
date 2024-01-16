import { Link } from "react-router-dom";

const Students = ({ students }) => {
  let content = students.map((student, i) => (
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
          <p className="">{student.total}</p>
        </div>
      </li>
    </Link>
  ));

  return <>{content}</>;
};

export default Students;
