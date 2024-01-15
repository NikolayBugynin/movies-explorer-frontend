import React, { createContext, useContext, useCallback } from "react";
import { LOCAL_STORAGE_KEY } from "../utils/constants";

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    token: null,
  });

  const setToken = useCallback((newToken) => {
    setUser((prevUser) => {
      if (prevUser != null) {
        return { ...prevUser, token: newToken };
      } else {
        return null;
      }
    });

    if (newToken) {
      localStorage.setItem(LOCAL_STORAGE_KEY, newToken);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser должен использоваться внутри UserProvider");
  }
  return context;
};
