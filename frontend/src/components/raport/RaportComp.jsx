import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useDelRaportMutation } from "../../slices/mentorApiSlice";
import Loader from "../loader/Loader";
const RaportComp = ({ raport }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [delRaport, { isLoading }] = useDelRaportMutation();

  const handleDelete = (e, id) => {
    e.preventDefault();
    const del = async () => {
      if (confirm("anda yakin ingin menghapusnya?")) {
        try {
          await delRaport({ id });
          alert(`${id} berhasil dihapus`);
        } catch (err) {
          console.error(err);
          alert(`${id} gagal dihapus`);
        }
      }
    };
    del();
  };
  const columns = [
    {
      field: "title",
      headerName: "Surah",
      width: 100,
      sortable: false,
    },
    {
      field: "chapter",
      headerName: "Chapter",
      width: 75,
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
      field: "page",
      headerName: "Page",
      width: 60,
      sortable: false,
      align: "center",
      headerAlign: "center",
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
  return (
    <>
      <DataGrid
        rows={raport}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        disableColumnMenu
      />
      {isLoading && <Loader />}
    </>
  );
};

export default RaportComp;
