import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const useLoginData = () => {
  const [loginData, setLoginData] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });
  const saveLoginData = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setLoginData(decodedToken);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        removeLoginData();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const removeLoginData = () => {
    setLoginData(null);
    localStorage.removeItem("token");
  };
  return { saveLoginData, removeLoginData, loginData };
};
