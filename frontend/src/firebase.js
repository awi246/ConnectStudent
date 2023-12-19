// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArr8yPzIMZtY-m_JeqQ4tlxyj6XfRlB-Y",
  authDomain: "connectstudent-91f7f.firebaseapp.com",
  projectId: "connectstudent-91f7f",
  storageBucket: "connectstudent-91f7f.appspot.com",
  messagingSenderId: "744181134604",
  appId: "1:744181134604:web:59242723859a2c92ea0529",
  measurementId: "G-F2Y7JX6VPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithEmailAndPassword };
