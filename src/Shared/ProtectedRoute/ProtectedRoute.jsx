import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ loginData, children }) {
  return localStorage.getItem("token") || loginData ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
