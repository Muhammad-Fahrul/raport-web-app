import { useState, useRef, useEffect } from "react";
import "./raportModal.css";
import { useGetAudioRaportQuery } from "../../../slices/usersApiSlice";
import { useSelector } from "react-redux";

const RaportModal = ({ raport, setDisplay }) => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);
  const { student } = useSelector((state) => state.student);
  const { data, isSuccess, isLoading, isError } = useGetAudioRaportQuery(
    raport.chapter
  );

  useEffect(() => {
    const handleAudioEnded = () => {
      setPlay(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      // Membersihkan event listener saat komponen unmount
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [play]);

  useEffect(() => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [play]);

  let audio;
  if (isSuccess) {
    if (student.isQuran) {
      audio = data.data.ayat[raport.verse].audio["02"];
    } else {
      audio = null;
    }
  }
  return (
    <div
      className="container-raport-modal"
      onClick={(e) => {
        if (e.target.className === "container-raport-modal") {
          setDisplay(false);
        }
      }}
    >
      <div className="wrapper-raport-modal">
        <div className="">
          <h3>Detail</h3>
          <p className="raport-modal-status">
            {raport.status ? (
              <span className="success">Lulus</span>
            ) : (
              <span className="failed">Mengulang</span>
            )}
          </p>
          <p>{raport.note}</p>
        </div>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : isError ? (
          <h3>something went wrong</h3>
        ) : student.isQuran ? (
          <div className="audio-raport">
            <div className="loading" onClick={() => setPlay((prev) => !prev)}>
              {!play && (
                <span className="play">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 16"
                  >
                    <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                  </svg>
                </span>
              )}
              {play && (
                <>
                  <div className="load"></div>
                  <div className="load"></div>
                  <div className="load"></div>
                  <div className="load"></div>
                </>
              )}
            </div>
            <div>
              <audio ref={audioRef}>
                <source src={audio} type="audio/mpeg" />
              </audio>
              <span className="name">
                <p>
                  {raport.title} : {raport.verse}
                </p>
              </span>
            </div>
          </div>
        ) : (
          <h3>no audio</h3>
        )}
      </div>
    </div>
  );
};

export default RaportModal;
