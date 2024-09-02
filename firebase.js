// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signOut, GoogleAuthProvider  , sendPasswordResetEmail  , createUserWithEmailAndPassword, signInWithPopup ,  signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { updateDoc, getDoc, doc, deleteDoc, getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBsmzTbC-rnW1pq7gZZM6EdcxuJsie2nzY",
    authDomain: "authentication-with-6348f.firebaseapp.com",
    projectId: "authentication-with-6348f",
    storageBucket: "authentication-with-6348f.appspot.com",
    messagingSenderId: "599290225247",
    appId: "1:599290225247:web:608f894a0ed057d72ff1ea",
    measurementId: "G-HQHBGL81JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { updateDoc, getDoc, doc, deleteDoc, db, auth, collection , addDoc, getDocs, GoogleAuthProvider  , signOut, sendPasswordResetEmail  ,createUserWithEmailAndPassword, signInWithPopup ,  signInWithEmailAndPassword, onAuthStateChanged };
