import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  return (
    <div style={{ paddingBottom: "1em" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
