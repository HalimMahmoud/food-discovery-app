import { Navigate } from "react-router-dom";
import { useLoginData } from "../../Hooks/useLoginData";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const { loginData } = useLoginData();

  return localStorage.getItem("token") || loginData ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
