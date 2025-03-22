import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null
  );

  // const [token, setToken] = useState(null);

  const login = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        logout();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.userGroup === "SuperAdmin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
