// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJUjMQYiwGtp0d6q6I80VJ6wxN_0BOki8",
  authDomain: "careercanvas-f826a.firebaseapp.com",
  projectId: "careercanvas-f826a",
  storageBucket: "careercanvas-f826a.appspot.com",
  messagingSenderId: "136881852032",
  appId: "1:136881852032:web:03270a02566446a7ca2065",
  measurementId: "G-693QS0Y22N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export auth and provider
export { auth, GoogleAuthProvider, firestore };