import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../assets/3.png";
import { useState } from "react";
import { toast } from "react-toastify";
import ChangePassword from "../../Auth/ChangePassword/ChangePassword";

import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
export default function SideBar() {
  const { logout, isAdmin } = useContext(AuthContext);

  console.log(isAdmin);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  // const location = useLocation();
  // console.log(location.pathname);
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();

    toast.success("Logged out successfully", {
      theme: "light",
    });
    navigate("/login");
  };
  return (
    <Sidebar className="h-100" collapsed={collapsed}>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem
          className="m-2 sidebar-logo"
          onClick={toggleCollapse}
          icon={<img src={logo} className="" />}
          component={<Link to="" />}
        />
        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<Link to="" />}
        >
          Home
        </MenuItem>
        {isAdmin && (
          <MenuItem
            icon={<i className="fa fa-users"></i>}
            component={<Link to="users" />}
          >
            Users
          </MenuItem>
        )}
        <MenuItem
          icon={<i className="fa fa-bell-concierge"></i>}
          component={<Link to="recipes" />}
        >
          Recipes
        </MenuItem>

        {isAdmin && (
          <MenuItem
            icon={<i className="fa fa-list"></i>}
            component={<Link to="categories" />}
          >
            Categories
          </MenuItem>
        )}

        {!isAdmin && (
          <MenuItem
            icon={<i className="fa fa-heart"></i>}
            component={<Link to="favorites" />}
          >
            Favorites
          </MenuItem>
        )}

        <ChangePassword />
        <MenuItem
          onClick={handleLogout}
          icon={<i className="fa fa-right-from-bracket" />}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
