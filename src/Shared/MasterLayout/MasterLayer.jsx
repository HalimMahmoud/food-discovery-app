import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import SideBar from "../Sidebar/Sidebar";
import { useLoginData } from "../../Hooks/useLoginData";

// eslint-disable-next-line react/prop-types
export default function MasterLayer() {
  const { loginData, removeLoginData } = useLoginData();

  return (
    <div className="d-flex ms-layer">
      <div className="align-self-stretch bg-fix">
        <SideBar removeLoginData={removeLoginData} />
      </div>
      <div className="w-100 m-3 align-self-stretch">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
