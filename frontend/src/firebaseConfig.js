// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8FTA2fqg9bqufU3FrHzvvmarYxfsjnXI",
  authDomain: "buddy-e0c54.firebaseapp.com",
  projectId: "buddy-e0c54",
  storageBucket: "buddy-e0c54.appspot.com",
  messagingSenderId: "96374254709",
  appId: "1:96374254709:web:efefdc7ac2234c51f91c3c",
  measurementId: "G-5MLRX19NT6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Firebase Auth and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
