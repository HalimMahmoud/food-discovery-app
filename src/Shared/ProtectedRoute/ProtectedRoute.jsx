import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  return localStorage.getItem("token") || user ? children : <Navigate to="/" />;
}
