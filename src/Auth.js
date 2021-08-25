import React, { useState } from "react";
import { authReducer } from "./authReducers";

const initialState = {
  token:localStorage.getItem("auth")||"",
  currentUser:null
}


export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};