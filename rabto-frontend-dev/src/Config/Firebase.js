// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS9anRJMIvx-yychuynp23DErtHYDxD4g",
  authDomain: "rabto-1d141.firebaseapp.com",
  projectId: "rabto-1d141",
  storageBucket: "rabto-1d141.appspot.com",
  messagingSenderId: "478273431301",
  appId: "1:478273431301:web:741d7c44c124981d39796c",
  measurementId: "G-S2468VEV66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

// Export the initialized Firebase app and analytics
export { app, analytics, db };
