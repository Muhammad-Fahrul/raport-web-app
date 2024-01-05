import { useParams } from "react-router-dom";
import { useGetRaportQuery } from "../../slices/usersApiSlice.js";
import Loader from "../../components/loader/Loader.jsx";

import "./raport.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RaportForm from "../../components/raportForm/RaportForm.jsx";
import Error from "../../components/error/Error.jsx";
import RaportComp from "../../components/raport/RaportComp.jsx";

const Raport = () => {
  const [studentRaport, setStudentRaport] = useState([]);
  const { studentId, studentName } = useParams();
  const [display, setDisplay] = useState(false);
  const {
    data: raport,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetRaportQuery(studentId);

  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (isSuccess) {
      setStudentRaport(raport);
    }
  }, [isSuccess, raport]);

  return (
    <div className="students-container">
      {userInfo && userInfo.isMentor && (
        <button
          className="Btn new-students-btn"
          onClick={() => setDisplay(true)}
        >
          <div className="sign">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
              />
            </svg>
          </div>
          <div className="text">New</div>
        </button>
      )}
      <ul className="students-wrapper">
        <h2>Achivement ({studentName})</h2>
        <div className="students-wrapper-items">
          {isSuccess ? (
            studentRaport.length < 1 ? (
              <h1>Belum ada pencapaian</h1>
            ) : (
              <RaportComp raport={studentRaport} />
            )
          ) : (
            isError && <p>{error?.data?.message || "internal server error"}</p>
          )}
        </div>
      </ul>
      {isLoading && <Loader />}
      {display && <RaportForm setDisplay={setDisplay} />}
    </div>
  );
};

export default Raport;
