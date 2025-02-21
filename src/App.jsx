import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayer from "./Shared/AuthLayer.jsx";
import Login from "./Auth/Login/Login.jsx";
import Register from "./Auth/Register/Register.jsx";
import Verfiy from "./Auth/Verfiy/Verfiy.jsx";
import Reset from "./Auth/Reset/Reset.jsx";
import Forget from "./Auth/Forget/Forget.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import MasterLayer from "./Shared/MasterLayer.jsx";
import NotFound from "./Shared/NotFound.jsx";
import ReciepesList from "./Recipes/ReciepesList/ReciepesList.jsx";
import ReciepeData from "./Recipes/RecipeData/RecipeData.jsx";
import CategoryData from "./Categories/CategoryData/CategoryData.jsx";
import CategoriesList from "./Categories/CategoriesList/CategoriesList.jsx";
import UsersList from "./Users/UsersList.jsx";
import { ToastContainer } from "react-toastify";

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
    path: "/dashboard",
    element: <MasterLayer />,
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
function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
