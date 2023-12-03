// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, GoogleAuthProvider, 
  onAuthStateChanged, signInWithPopup, signOut 
} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export{
  db,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged, 
  signInWithPopup,
  signOut,
  getDocs,
  addDoc,
  serverTimestamp,
  collection
}