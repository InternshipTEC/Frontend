import React from "react";
import { formReducer, SET_EMAIL_YANG_DIWAKILKAN, SET_FILE, SET_SS, SUBMIT } from "./reducers";

const initialState = {
  nama:"",
  nim:"",
  fakultas:"",
  idLine:"",
  mediaPembayaran:"",
  metodePembayaran:"",
  noRekening:"",
  namaPemilikRekening:"",
  jumlahOrangDiwakilkan:0,
  pembayar:false,
  emailYangDiwakilkan:[""],
  file:null
}

export const SignupContext = React.createContext();

export const SignupProvider = ({ children, whichForm, setWhichForm }) => {
  const [state,dispatch] = React.useReducer(formReducer,initialState)

  const handleChange = type => e => {
    console.log(e)
    if(type === SET_EMAIL_YANG_DIWAKILKAN || type === SUBMIT){
      dispatch({type,payload:e})
    } else if (type===SET_FILE) {
      dispatch({type,payload:e.target.files[0]})
    } else if (type===SET_SS) {
      dispatch({type,payload:e.target.files[0]})
    } else {
      dispatch({type,payload:e.target.value})
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