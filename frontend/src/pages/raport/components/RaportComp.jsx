import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useDelRaportMutation } from "../../../slices/mentorApiSlice";
import Loader from "../../../components/loader/Loader";
import "./raportComp.css";
import { useState } from "react";
import RaportModal from "./RaportModal";

const RaportComp = ({ raport }) => {
  const [display, setDisplay] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [raportModal, setRaportModal] = useState({});

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
      sortable: false,
    },
    {
      field: "chapter",
      headerName: "Chapter",
      width: 80,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "verse",
      headerName: "Verse",
      width: 60,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "status",
      width: 70,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status ? (
              <span className="raport-status">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 50"
                  style={{ enableBackground: "new 0 0 50 50" }}
                  xmlSpace="preserve"
                >
                  <circle style={{ fill: "#25AE88" }} cx="25" cy="25" r="25" />
                  <polyline
                    style={{
                      fill: "none",
                      stroke: "#FFFFFF",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 10,
                    }}
                    points="38,15 22,33 12,25"
                  />
                  {/* Additional groups or elements can be added here */}
                </svg>
              </span>
            ) : (
              <span className="raport-status">
                <svg
                  viewBox="0 0 42 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.492188"
                    width="42"
                    height="42"
                    rx="21"
                    fill="#ed1d40"
                    id="id_104"
                  />
                  <path
                    d="M27.8571 29.4922C27.5143 29.4922 27.2857 29.3779 27.0571 29.1493L21 23.0922L14.9429 29.1493C14.4857 29.6065 13.8 29.6065 13.3429 29.1493C12.8857 28.6922 12.8857 28.0065 13.3429 27.5493L19.4 21.4922L13.3429 15.435C12.8857 14.9779 12.8857 14.2922 13.3429 13.835C13.8 13.3779 14.4857 13.3779 14.9429 13.835L21 19.8922L27.0571 13.835C27.5143 13.3779 28.2 13.3779 28.6571 13.835C29.1143 14.2922 29.1143 14.9779 28.6571 15.435L22.6 21.4922L28.6571 27.5493C29.1143 28.0065 29.1143 28.6922 28.6571 29.1493C28.4286 29.3779 28.2 29.4922 27.8571 29.4922Z"
                    fill="white"
                    id="id_105"
                  />
                </svg>
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: "note",
      headerName: "Note",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div
              className="button-note"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setRaportModal(params.row);
                setDisplay(true);
              }}
            >
              {params.row.note.split("").slice(0, 6).join("") + "..."}
            </div>
          </>
        );
      },
    },
  ];

  if (userInfo && userInfo.isMentor) {
    columns.push({
      field: "action",
      headerName: "Del",
      width: 10,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            <button
              key={params.row._id}
              className="raport-del-btn"
              onClick={(e) => handleDelete(e, params.row._id)}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
              </svg>
            </button>
          </div>
        );
      },
    });
  }

  const [delRaport, { isLoading }] = useDelRaportMutation();

  const handleDelete = (e, raportId) => {
    e.preventDefault();
    const del = async () => {
      if (confirm("anda yakin ingin menghapusnya?")) {
        try {
          await delRaport({ raportId });
          alert(`${raportId} berhasil dihapus`);
        } catch (err) {
          console.error(err);
          alert(`${raportId} gagal dihapus`);
        }
      }
    };
    del();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ minHeight: "200px" }}>
      <DataGrid
        autoHeight
        rows={raport}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        disableColumnMenu
      />
      {display && <RaportModal raport={raportModal} setDisplay={setDisplay} />}
    </div>
  );
};

export default RaportComp;
