import './student.css';

import { useLocation, useNavigate } from 'react-router-dom';

import { useGetStudentsWithRaportsQuery } from '../../redux/studentApiSlice';

const Student = ({ studentId }) => {
  const navigate = useNavigate();

  const { student } = useGetStudentsWithRaportsQuery('studentList', {
    selectFromResult: ({ data }) => ({
      student: data?.entities[studentId],
    }),
  });

  const location = useLocation();

  const handleToRaport = () =>
    navigate(`/students/${student.username}/raports`, {
      state: { from: location },
    });

  let content = (
    <li className="container-student">
      <div className="top">
        <p
          className="description"
          onClick={() => navigate(`/students/${student.username}`)}
        >
          {student.username}
        </p>
        <div className="last-raport">
          {student?.raport.length > 0 ? (
            <>
              <p>{student.raport[student.raport.length - 1].chapter}</p>
              <p>{student.raport[student.raport.length - 1].verse}</p>
            </>
          ) : (
            <>
              <p>0</p>
              <p>0</p>
            </>
          )}
        </div>
      </div>
      <button className="raport-btn" title="raport" onClick={handleToRaport}>
        <b>R</b>
      </button>
    </li>
  );

  return <>{content}</>;
};

export default Student;
