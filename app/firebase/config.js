// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "careercanvas-f826a.firebaseapp.com",
  projectId: "careercanvas-f826a",
  storageBucket: "careercanvas-f826a.appspot.com",
  messagingSenderId: "136881852032",
  appId: "1:136881852032:web:03270a02566446a7ca2065",
  measurementId: "G-693QS0Y22N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export { auth, firestore, googleProvider };
