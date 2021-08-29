import app from '../../base'
import 'firebase/storage'
import axios from 'axios';
import { BACKEND_URL } from '../../controller';

export const SET_NAME = 'SET_NAME'; 
export const SET_NIM = 'SET_NIM'; 
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
export const SET_SS = 'SET_SS'
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
const setNIM = (nim, state) => ({...state, nim})
const setSS = (SSfollow, state) => ({...state, SSfollow})
const submit = async (history,state) => {
  const {
    nama,
    fakultas,
    idLine,
    mediaPembayaran,
    metodePembayaran,
    noRekening,
    namaPemilikRekening,
    jumlahOrangDiwakilkan,
    pembayar,
    emailYangDiwakilkan,
    file,
    nim,
    SSfollow
  } = state


  const user = JSON.parse(localStorage.getItem("user"))

  var harga

  switch (parseInt(jumlahOrangDiwakilkan)) {
    case 0:
        harga = 50000
        break;
    case 1:
        harga = 90000
        break;
    case 2:
        harga = 120000
        break;
    case 3:
        harga = 160000
        break;
    case 4:
        harga = 200000
        break;
    default:
        break;
  }

  if(metodePembayaran === "Sendiri"){
      harga = 50000
  }
  if(nama && fakultas && idLine ){
    axios.put(`${BACKEND_URL}/users/${user.id}`, {
        name:nama,
        nim,
        fakultas
    },
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("auth")}`
      }      
    }).catch(err=>{alert(err.toString());return state})
    if(!!file){
      if(!SSfollow){
        alert("Bukti SS tidak terunggah")
      }
      const storage = app.storage()
      const storageRef = storage.ref()
      const imageRef = storageRef.child(state.file.name)
      await imageRef.put(state.file)
      const photoUrl = await imageRef.getDownloadURL()
      axios.post(`${BACKEND_URL}/transaction`,{
          metode:metodePembayaran,
          media:mediaPembayaran,
          nominal:harga,
          uniqueIdentifier:user.id,
          pemilikRekening:namaPemilikRekening,
          usersEmail:[...emailYangDiwakilkan,
            user.email
          ],
          noRekening,
          photoUrl,
        },
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("auth")}`
          }
        }
      )
      .then(res=>res.status)
      .then(status=>{
        if(status===200){
          alert("Successfully registered!")
        } else {
          alert("Error! cek kembali form atau kontak cp")
        }
      })
      .catch(err=>alert(err.toString()))
      axios.get(`${BACKEND_URL}/users/${user.id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("auth")}`
        }
      }).then((res)=>{
        localStorage.setItem("user",JSON.stringify(res.data.data))
	      history.push('/profile')
      }).catch(err=>alert(err.toString()))
    } else if (metodePembayaran === "Bersama" && !(pembayar === "Ya")) {
      axios.get(`${BACKEND_URL}/users/${user.id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("auth")}`
        }
      }).then((res)=>{
        localStorage.setItem("user",JSON.stringify(res.data.data))
	      alert("Successfully registered!")
	      history.push('/profile')
      }).catch(err=>alert(err.toString()))
    } else {
      alert("File tidak terunggah")
    }
  } else {
      alert("Data diri tidak lengkap!")
  }
  return state
}

export const formReducer = (state, action) => {
  switch (action.type) {
    case SET_NAME:
      return setNama(action.payload, state);
    case SET_SS:
      return setSS(action.payload, state);
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
    case SET_NIM:
      return setNIM(action.payload, state);
    case SUBMIT:
      return submit(action.payload, state);
    default:
      return state;
  }
};
