import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";

export default function MasterLayer() {
  return (
    <div className="d-flex">
      <div className="w-25 bg-info">
        <Sidebar />
      </div>
      <div className="w-75 bg-warning">
        <Navbar />
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
