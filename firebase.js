// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "careerswipe-4894d.firebaseapp.com",
  projectId: "careerswipe-4894d",
  storageBucket: "careerswipe-4894d.appspot.com",
  messagingSenderId: "471845702620",
  appId: "1:471845702620:web:183a01d4249678f2b71d19",
  measurementId: "G-ND5HGLQQ53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}