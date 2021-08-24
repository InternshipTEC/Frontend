import app from '../../base'
import 'firebase/storage'

export const SET_NAME = 'SET_NAME'; 
export const SET_FAKULTAS = 'SET_FAKULTAS';
export const SET_IDLINE = 'SET_IDLINE'; 
export const SET_MEDIA_PEMBAYARAN = 'SET_MEDIA_PEMBAYARAN';
export const SET_METODE_PEMBAYARAN = 'SET_METODE_PEMBAYARAN';
export const SET_JUMLAH_ORANG_DIWAKILKAN = 'SET_JUMLAH_ORANG_DIWAKILKAN';
export const SET_PEMBAYAR = 'SET_PEMBAYAR';
export const SET_EMAIL_YANG_DIWAKILKAN = 'SET_EMAIL_YANG_DIWAKILKAN';
export const SET_NO_REKENING = 'SET_NO_REKENING';
export const SET_NAMA_PEMILIK_REKENING = 'SET_NAMA_PEMILIK_REKENING';
export const SET_FILE = 'SET_FILE'
export const SUBMIT = 'SUBMIT';

const setNama = (nama, state) => ({...state, nama})
const setFakultas = (fakultas, state) => ({...state, fakultas})
const setIdLine = (idLine, state) => ({...state, idLine})
const setMediaPembayaran = (mediaPembayaran, state) => ({...state, mediaPembayaran})
const setMetodePembayaran = (metodePembayaran, state) => ({...state, metodePembayaran})
const setJumlahOrangDiwakilkan = (jumlahOrangDiwakilkan, state) => ({...state,jumlahOrangDiwakilkan})
const setPembayar = (pembayar, state) => ({...state, pembayar})
const setEmailYangDiwakilkan = (emailYangDiwakilkan, state) => ({...state, emailYangDiwakilkan})
const setNoRekening = (noRekening, state) => ({...state, noRekening})
const setNamaPemilikRekening = (namaPemilikRekening, state) => ({...state, namaPemilikRekening})
const setFile = (file, state) => ({...state, file})
const submit = async (_,state) => {
  const storage = app.storage()
  const storageRef = storage.ref()
  const res = await fetch(state.file)
  const blob = await res.blob()

  await storageRef.child("nana.jpg").put(blob)

  return state
}

export const formReducer = (state, action) => {
  switch (action.type) {
    case SET_NAME:
      return setNama(action.payload, state);
    case SET_FAKULTAS:
      return setFakultas(action.payload, state);
    case SET_IDLINE:
      return setIdLine(action.payload, state);
    case SET_MEDIA_PEMBAYARAN:
      return setMediaPembayaran(action.payload, state);
    case SET_METODE_PEMBAYARAN:
      return setMetodePembayaran(action.payload, state);
    case SET_JUMLAH_ORANG_DIWAKILKAN:
      return setJumlahOrangDiwakilkan(action.payload, state);
    case SET_PEMBAYAR:
      return setPembayar(action.payload, state);
    case SET_EMAIL_YANG_DIWAKILKAN:
      return setEmailYangDiwakilkan(action.payload, state);
    case SET_NO_REKENING:
      return setNoRekening(action.payload,state);
    case SET_NAMA_PEMILIK_REKENING:
      return setNamaPemilikRekening(action.payload,state);
    case SET_FILE:
      return setFile(action.payload, state);
    case SUBMIT:
      return submit(action, state);
    default:
      return state;
  }
};