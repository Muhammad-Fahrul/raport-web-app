const Students = ({ students }) => {
  let content = students.map((student, i) => (
    <li className="wrapper-card" key={student._id}>
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
  ));

  return <>{content}</>;
};

export default Students;
