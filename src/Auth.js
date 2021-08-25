import React, { useState } from "react";
export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("auth") || "");

  const checkUser = () => {
    setCurrentUser(localStorage.getItem("auth"))
  }

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        checkUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};