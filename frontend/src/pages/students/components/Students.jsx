import { Link } from 'react-router-dom';

const Students = ({ students }) => {
  console.log(students)
  let content = students.map((student) => (
    <Link key={student._id} to={`/me/students/${student._id}/raports`}>
      <li className="wrapper-card">
        <div className="card-img"></div>
        <div className="card-text-box">
          <p className="card-title">{student.username}</p>
          <div className="card-text-content"></div>
        </div>
      </li>
    </Link>
  ));

  return <>{content}</>;
};

export default Students;
