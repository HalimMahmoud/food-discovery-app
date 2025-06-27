import { createContext, useEffect, useState } from "react";
import { privateApiInstance } from "../services/api/apiInstance";
import { users_endpoints } from "../services/api/apiConfig";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

import React, { useMemo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function useLocalStorage() {
  const setValue = (newValue) => {
    window.localStorage.setItem("token", newValue);
    window.dispatchEvent(
      new StorageEvent("storage", { key: "token", newValue })
    );
  };

  const getSnapshot = () => localStorage.getItem("token");

  const subscribe = (listener) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  };

  const store = React.useSyncExternalStore(subscribe, getSnapshot);

  const value = useMemo(() => store, [store]);
  const removeValue = () => {
    window.localStorage.removeItem("token");
  };

  return [value, setValue, removeValue];
}

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await privateApiInstance.get(users_endpoints.GET_USER);

      setUser(response.data);
    } catch (error) {
      console.log("❌ Error fetching user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If there's a valid token and user data hasn't been fetched yet, fetch user data
    if (token) {
      if (!user) {
        getUserData();
      } else {
        setLoading(false); // Don't fetch again if user is already set
      }
    } else {
      setLoading(false); // Set loading to false if no token is present
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);
  const logout = () => {
    removeToken();
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
      {loading ? <div>Loading</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
