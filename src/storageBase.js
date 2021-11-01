import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'

const storageApp = firebase.initializeApp({
  apiKey: "AIzaSyC8dxIZBw9O8UdQiHP7PPEvO8cAVer98d8",
  authDomain: "linktree-trial.firebaseapp.com",
  databaseURL: "https://linktree-trial.firebaseio.com",
  projectId: "linktree-trial",
  storageBucket: "linktree-trial.appspot.com",
  messagingSenderId: "298244301515",
  appId: "1:298244301515:web:5f836bffd95ae13c2bb14e"
})

export default storageApp;
