import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  selectStudentById,
  useDeleteStudentMutation,
} from '../../redux/studentApiSlice';

const Student = ({ studentId }) => {
  const navigate = useNavigate();
  const student = useSelector((state) => selectStudentById(state, studentId));

  const [deleteStudent, { isLoading, isSuccess, isError }] =
    useDeleteStudentMutation();

  const handleDelete = async () => {
    confirm(`are you sure to delete ${student.username}`) &&
      (await deleteStudent({ id: student.id }));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/students');
    }
  }, [isSuccess, navigate]);

  let content = (
    <li className="wrapper-card">
      <div className="card-img" style={{ width: '55px' }}></div>
      <div className="card-text-box">
        <p className="card-title">{student.username}</p>
      </div>
      <button
        onClick={handleDelete}
        style={{
          color: 'black',
          padding: '.5em 1em',
          borderRadius: '10px',
          outline: 'none',
          border: 'none',
        }}
      >
        Delete
      </button>
    </li>
  );

  return <>{content}</>;
};

export default Student;
