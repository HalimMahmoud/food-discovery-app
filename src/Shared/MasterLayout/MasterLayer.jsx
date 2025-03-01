import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import SideBar from "../Sidebar/Sidebar";

// eslint-disable-next-line react/prop-types
export default function MasterLayer({ loginData, removeLoginData }) {
  return (
    <div className="d-flex vh-100">
      <div className="">
        <SideBar removeLoginData={removeLoginData} />
      </div>
      <div className="w-100 m-2">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
