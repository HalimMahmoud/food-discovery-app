import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import SideBar from "../SideBar/SideBar";

export default function MasterLayer() {
  return (
    <div className="d-flex ms-layer">
      <div className="align-self-stretch bg-fix">
        <SideBar />
      </div>
      <div className="w-100 m-3 align-self-stretch">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
