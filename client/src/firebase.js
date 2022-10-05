import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDldXFRBFp9mcZtZIDQ6zgjXWFxBup4z8",
  authDomain: "login-auth-5de8a.firebaseapp.com",
  projectId: "login-auth-5de8a",
  storageBucket: "login-auth-5de8a.appspot.com",
  messagingSenderId: "747547123094",
  appId: "1:747547123094:web:ae86915c329e2d72ac91b7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
