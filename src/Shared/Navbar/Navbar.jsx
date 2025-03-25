import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import userPic from "../../assets/Ellipse 234.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ChangePassword from "../../Auth/ChangePassword/ChangePassword";
import { imageURL } from "../../services/api/apiConfig";
import EditProfile from "../../Auth/EditProfile/EditProfile";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();

    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user?.imagePath ? imageURL + user?.imagePath : userPic}
                className="me-2 bg-success rounded-5"
                width="50px"
                height="50px"
                alt=""
              />

              <span className="me-2">{user?.userName}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <EditProfile />
              </li>
              <li>
                <ChangePassword />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
