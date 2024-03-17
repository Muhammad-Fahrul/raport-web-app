import './studentList.css';

import { Link } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon.jsx';
import Student from './components/Student.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import Error from '../../../components/error/Error.jsx';

import { useGetStudentsWithRaportsQuery } from '../redux/studentApiSlice.js';

const StudentList = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetStudentsWithRaportsQuery('studentList', {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  let tableContent;
  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { ids } = data;
    tableContent = ids?.length ? (
      ids.map((studentId) => <Student key={studentId} studentId={studentId} />)
    ) : (
      <h4>Belum ada siswa</h4>
    );
  } else if (isError) {
    return <Error message={error.data?.message} />;
  }
  return (
    <div className="container-students">
      <ul className="students" style={{ paddingBlock: '1em' }}>
        {tableContent}
      </ul>

      <Link to="/newstudent">
        <ButtonIcon text={'NEW'}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.391 7.361.707-3.535a3 3 0 0 1 .82-1.533L7.929 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h4.259a2.975 2.975 0 0 1-.15-1.639ZM8.05 17.95a1 1 0 0 1-.981-1.2l.708-3.536a1 1 0 0 1 .274-.511l6.363-6.364a3.007 3.007 0 0 1 4.243 0 3.007 3.007 0 0 1 0 4.243l-6.365 6.363a1 1 0 0 1-.511.274l-3.536.708a1.07 1.07 0 0 1-.195.023Z" />
          </svg>
        </ButtonIcon>
      </Link>
    </div>
  );
};

export default StudentList;
