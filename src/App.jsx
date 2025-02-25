import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayer from "./Shared/AuthLayer/AuthLayer.jsx";
import Login from "./Auth/Login/Login.jsx";
import Register from "./Auth/Register/Register.jsx";
import Verfiy from "./Auth/Verfiy/Verfiy.jsx";
import Reset from "./Auth/Reset/Reset.jsx";
import Forget from "./Auth/Forget/Forget.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import MasterLayer from "./Shared/MasterLayout/MasterLayer.jsx";
import NotFound from "./Shared/NotFound/NotFound.jsx";
import ReciepesList from "./Recipes/ReciepesList/ReciepesList.jsx";
import ReciepeData from "./Recipes/RecipeData/RecipeData.jsx";
import CategoryData from "./Categories/CategoryData/CategoryData.jsx";
import CategoriesList from "./Categories/CategoriesList/CategoriesList.jsx";
import UsersList from "./Users/UsersList.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  const [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    setLoginData(decodedToken);
  };

  const removeLoginData = () => {
    setLoginData(null);
  };

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayer loginData={loginData} />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login saveLoginData={saveLoginData} />,
        },
        {
          path: "login",
          element: <Login saveLoginData={saveLoginData} />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "verfiy",
          element: <Verfiy />,
        },
        {
          path: "reset",
          element: <Reset />,
        },
        {
          path: "forget",
          element: <Forget />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayer
            loginData={loginData}
            removeLoginData={removeLoginData}
          />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <ReciepesList />,
        },
        {
          path: "recipe-data",
          element: <ReciepeData />,
        },
        {
          path: "categories",
          element: <CategoriesList />,
        },
        {
          path: "category-data",
          element: <CategoryData />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
