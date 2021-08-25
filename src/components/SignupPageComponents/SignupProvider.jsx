import React from "react";
import { formReducer, SET_EMAIL_YANG_DIWAKILKAN } from "./reducers";

const initialState = {
  nama:"",
  fakultas:"",
  idLine:"",
  mediaPembayaran:"",
  metodePembayaran:"",
  noRekening:"",
  namaPemilikRekening:"",
  jumlahOrangDiwakilkan:0,
  pembayar:false,
  emailYangDiwakilkan:[""],
  file:""
}

export const SignupContext = React.createContext();

export const SignupProvider = ({ children, whichForm, setWhichForm }) => {
  const [state,dispatch] = React.useReducer(formReducer,initialState)

  const handleChange = type => e => {
    if(type !== SET_EMAIL_YANG_DIWAKILKAN){
      dispatch({type,payload:e.target.value})
    } else {
      dispatch({type,payload:e})
    }
  }

  return (
    <SignupContext.Provider
      value={
        {
          ...state,
          whichForm,
          setWhichForm,
          handleChange
        }
      }
    >
     {children}
    </SignupContext.Provider>
  );
};