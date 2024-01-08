import { useParams } from "react-router-dom";
import { useGetRaportQuery } from "../../slices/usersApiSlice.js";
import Loader from "../../components/loader/Loader.jsx";

import "./raport.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import RaportForm from "../../components/raportForm/RaportForm.jsx";
import Error from "../../components/error/Error.jsx";
import RaportComp from "../../components/raport/RaportComp.jsx";
import ButtonIcon from "../../components/button/ButtonIcon.jsx";

const Raport = () => {
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

  if (isError) {
    return <Error message={error.data?.message} />;
  }

  return (
    <div className="container-raport">
      {userInfo && userInfo.isMentor && !isError && (
        <div onClick={() => setDisplay(!display)}>
          <ButtonIcon text={"NEW"}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
            </svg>
          </ButtonIcon>
        </div>
      )}
      {!isError ? (
        <div className="username">
          <h1>Achivement </h1>
          <p>{studentName}</p>
        </div>
      ) : (
        <h1>{error?.data?.message || "internal server error"}</h1>
      )}
      <ul className="students-wrapper">
        <div className="students-wrapper-items">
          {isSuccess &&
            (raport.length < 1 ? (
              <h1>Belum ada pencapaian</h1>
            ) : (
              <RaportComp raport={raport} />
            ))}
        </div>
      </ul>

      {isLoading && <Loader />}
      {display && <RaportForm setDisplay={setDisplay} />}
    </div>
  );
};

export default Raport;
