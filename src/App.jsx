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
import ReciepeData from "./Recipes/RecipeData/RecipeData.jsx";
import CategoriesList from "./Categories/CategoriesList/CategoriesList.jsx";
import UsersList from "./Users/UserList/UsersList.jsx";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute.jsx";
import RecipesList from "./Recipes/RecipesList/RecipesList.jsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayer />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
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
        <ProtectedRoute>
          <MasterLayer />
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
          element: <RecipesList />,
        },
        {
          path: "recipes/new",
          element: <ReciepeData />,
        },
        {
          path: "recipes/:id/edit",
          element: <ReciepeData />,
        },
        {
          path: "categories",
          element: <CategoriesList />,
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
