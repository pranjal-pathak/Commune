// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGU2Hp6TCRTetYUKTnl2dn3YWDZHJXgCc",
  authDomain: "vivo-social.firebaseapp.com",
  projectId: "vivo-social",
  storageBucket: "vivo-social.appspot.com",
  messagingSenderId: "964847056573",
  appId: "1:964847056573:web:58cb2b622a4bfa04a6e9d4",
  measurementId: "G-FCDZZSTCXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);