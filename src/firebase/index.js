// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  createUserWithPhoneNumberAndPassword,
  onAuthStateChanged,

} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMJQqUE6mQQyz83JVCaCSbeUwRd4d0czI",
  authDomain: "next-d0e5f.firebaseapp.com",
  projectId: "next-d0e5f",
  storageBucket: "next-d0e5f.appspot.com",
  messagingSenderId: "383279800539",
  appId: "1:383279800539:web:69177aca8e6c0f4a322cfe",
  measurementId: "G-0RFNW7GWLM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let user,errorCode,errorMessage;
export const login=(email, password)=>{
  const responce = signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
     user = userCredential.user;
     console.log(user)
    // ...
  })
  .catch((error) => {
     errorCode = error.code;
     errorMessage = error.message;
     console.log(errorCode,"pl",errorMessage)
  });
}
export const sigupwithemail=(email, password)=>{
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

//const analytics = getAnalytics(app);
