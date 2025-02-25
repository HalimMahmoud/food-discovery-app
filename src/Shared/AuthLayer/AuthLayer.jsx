import { Outlet, Navigate } from "react-router-dom";
import Logo from "../../assets/4 3.png";

// eslint-disable-next-line react/prop-types
export default function AuthLayer({ loginData }) {
  if (localStorage.getItem("token") || loginData) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="layout vh-100 ">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="container-fluid w-50 bg-white rounded col-md-5 px-5 py-3">
          <div className="d-flex flex-column align-items-center h-50 justify-content-between">
            <img className="w-50" src={Logo} alt="logo" />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
