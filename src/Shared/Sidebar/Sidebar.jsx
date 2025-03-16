import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../assets/3.png";
import { useState } from "react";
import { toast } from "react-toastify";
import ChangePassword from "../../Auth/ChangePassword/ChangePassword";
// eslint-disable-next-line react/prop-types
export default function SideBar({ removeLoginData }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  // const location = useLocation();
  // console.log(location.pathname);
  const handleLogout = () => {
    localStorage.removeItem("token");
    removeLoginData();

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
        <MenuItem
          icon={<i className="fa fa-users"></i>}
          component={<Link to="users" />}
        >
          Users
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-bell-concierge"></i>}
          component={<Link to="recipes" />}
        >
          Recipes
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-list"></i>}
          component={<Link to="categories" />}
        >
          Categories
        </MenuItem>
        {/* <MenuItem icon={<i className="fa fa-unlock"></i>}>
          Change Passowrd
        </MenuItem> */}
        <ChangePassword />
        <MenuItem
          onClick={handleLogout}
          icon={<i className="fa fa-right-from-bracket"></i>}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
