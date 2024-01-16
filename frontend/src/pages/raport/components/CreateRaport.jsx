import { useParams } from "react-router-dom";
import { useCreateRaportMutation } from "../../../slices/mentorApiSlice";
import Loader from "../../../components/loader/Loader";
import "./createRaport.css";
import { useState, useEffect } from "react";

const CreateRaport = ({ lastRaport, setDisplay }) => {
  const { studentId } = useParams();
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setTitle(lastRaport.title);
    setChapter(lastRaport.chapter);
  }, [lastRaport, lastRaport.title, lastRaport.chapter]);

  const [createRaport, { isLoading, isError, error }] =
    useCreateRaportMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createRaport({
        title,
        chapter,
        verse,
        note,
        status,
        studentId,
      }).unwrap();
      alert(`${res.title} berhasil ditambahkan`);
      setDisplay(false);
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="student-new-container raport-form">
      <form className="student-new-card create-raport" onSubmit={handleSubmit}>
        <span
          className="close-create-students"
          onClick={() => setDisplay(false)}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </span>
        <div style={{ textAlign: "center" }}>
          <h3>New</h3>

          <p style={{ opacity: isError ? 1 : 0, color: "red" }}>
            {error?.data?.message || "internal server error"}
          </p>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required="required"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>Surah</span>
        </div>
        <div className="inputBox">
          <input
            type="number"
            required="required"
            min={0}
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
          <span>Chapter</span>
        </div>

        <div className="inputBox">
          <input
            type="number"
            required="required"
            min={0}
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
          />
          <span>Verse</span>
        </div>

        <div className="inputBox">
          <input
            type="text"
            required="required"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <span>Note</span>
        </div>

        <div className="input-grade">
          <label htmlFor="status">Mengulang?</label>
          <input
            id="status"
            type="checkbox"
            checked={!status}
            onChange={() => {
              setStatus(!status);
            }}
          />
        </div>

        <button className="enter">Add</button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default CreateRaport;
