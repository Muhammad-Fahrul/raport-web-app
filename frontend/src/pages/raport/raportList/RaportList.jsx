import './raportList.css';

import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { useGetStudentsWithRaportsQuery } from '../../student/redux/studentApiSlice';
import Raport from './components/Raport';
import { useEffect, useState } from 'react';

const RaportList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [screen, setScreen] = useState(false);
  const [detailRaport, setDetailRaport] = useState({});
  const { username } = useParams();

  const { student } = useGetStudentsWithRaportsQuery('studentList', {
    selectFromResult: ({ data }) => ({
      student: Object.values(data?.entities).find(
        (obj) => obj.username === username
      ),
    }),
  });

  const handleDetail = (id) => {
    const detailRaport = student.raport.find((item) => item._id === id);

    setDetailRaport(detailRaport);
  };

  useEffect(() => {
    setDetailRaport(student.raport[0]);
  }, [student.raport]);

  const previousPath = location.state && location.state.from.pathname;

  const content =
    student?.raport.length > 0
      ? student.raport.map((item) => (
          <Raport
            key={item._id}
            item={item}
            handleDetail={handleDetail}
            setScreen={setScreen}
          />
        ))
      : null;

  return (
    <div
      style={{
        textTransform: 'capitalize',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'black',
          color: 'white',
          paddingInline: '.5em',
        }}
      >
        <h1 style={{ fontSize: '1.3rem' }}>
          <span style={{ color: '#645bff', display: 'inline-block' }}>
            {student?.username || ''}
          </span>{' '}
          record
        </h1>
        <button
          onClick={() => navigate(previousPath)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '25px',
            height: '25px',
            borderRadius: '150px',
            backgroundColor: 'white',
            color: 'black',
            fontWeight: '900',
            border: 'none',
            fontSize: '1.2rem',
          }}
        >
          <p>&lt;</p>
        </button>
      </div>
      <table className="table-raport">
        <thead>
          <tr>
            <th>Chapter</th>
            <th>Verse</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
      {screen && (
        <div
          className="this"
          onClick={(e) => {
            if (e.target.className === 'this') {
              setScreen(false);
            }
          }}
          style={{
            position: 'fixed',
            inset: '0',
            backgroundColor: '#2c2c2c5a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '70%',
              height: '200px',
              backgroundColor: '#5351537d',
            }}
          >
            <p>chapter: {detailRaport.chapter}</p>
            <p>verse: {detailRaport.verse}</p>
            <p>status: {detailRaport.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaportList;
