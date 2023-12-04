// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, serverTimestamp , query, where, orderBy, limit, onSnapshot  } from "firebase/firestore";
import { 
  getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, GoogleAuthProvider, 
  onAuthStateChanged, signInWithPopup, signOut 
} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDg175AidURF6LpgHYZS3J8SQPVhn8dORc",
  authDomain: "senior-project-41ab5.firebaseapp.com",
  databaseURL: "https://senior-project-41ab5-default-rtdb.firebaseio.com/",
  projectId: "senior-project-41ab5",
  storageBucket: "senior-project-41ab5.appspot.com",
  messagingSenderId: "98340510353",
  appId: "1:98340510353:web:19e8dbed8353b10275bd30",
  measurementId: "G-11LW7159TZ"
}; 


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
  collection,
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot 
}
