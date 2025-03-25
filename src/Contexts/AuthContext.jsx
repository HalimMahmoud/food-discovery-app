import { createContext, useEffect, useState } from "react";
import { privateApiInstance } from "../services/api/apiInstance";
import { users_endpoints } from "../services/api/apiConfig";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const useLocalStorage = (key) => {
  const [value, setValue] = useState(localStorage.getItem(key) || null);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setValue(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  const setStoredValue = (newValue) => {
    localStorage.setItem(key, newValue);
    setValue(newValue); // Update state for same-tab updates
  };

  return [value, setStoredValue];
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const response = await privateApiInstance.get(users_endpoints.GET_USER, {
        "access-control-allow-origin": "*",
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.group?.name === "SuperAdmin";
  return (
    <AuthContext.Provider
      value={{
        setToken,
        setUser,
        token,
        user,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
