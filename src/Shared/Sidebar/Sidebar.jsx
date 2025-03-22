import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../assets/3.png";
import { useState } from "react";
import { toast } from "react-toastify";
import ChangePassword from "../../Auth/ChangePassword/ChangePassword";

import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export default function SideBar() {
  const { logout, isAdmin } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();

    toast.success("Logged out successfully");
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
          className="sidebar-logo"
          onClick={toggleCollapse}
          component={<Link to="" />}
        >
          <img
            src={logo}
            className="position-absolute top-50 start-50 translate-middle"
          />
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<Link to="" />}
          active={location.pathname === "/dashboard"} // Ensure this matches the path
        >
          Home
        </MenuItem>
        {isAdmin && (
          <MenuItem
            icon={<i className="fa fa-users"></i>}
            component={<Link to="users" />}
            active={location.pathname === "/dashboard/users"} // Ensure this matches the path
          >
            Users
          </MenuItem>
        )}
        <MenuItem
          icon={<i className="fa fa-bell-concierge"></i>}
          component={<Link to="recipes" />}
          active={location.pathname === "/dashboard/recipes"} // Ensure this matches the path
        >
          Recipes
        </MenuItem>

        {isAdmin && (
          <MenuItem
            icon={<i className="fa fa-list"></i>}
            component={<Link to="categories" />}
            active={location.pathname === "/dashboard/categories"} // Ensure this matches the path
          >
            Categories
          </MenuItem>
        )}

        {!isAdmin && (
          <MenuItem
            icon={<i className="fa fa-heart"></i>}
            component={<Link to="favorites" />}
            active={location.pathname === "/dashboard/favorites"} // Ensure this matches the path
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
