import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBdTmzJoXDF8OLyJnJcgIRlYABQWeE8VVg",
    authDomain: "instagram-clone-4958e.firebaseapp.com",
    projectId: "instagram-clone-4958e",
    storageBucket: "instagram-clone-4958e.appspot.com",
    messagingSenderId: "327250060965",
    appId: "1:327250060965:web:2603a6e0ba73319efb8f4c",
    measurementId: "G-K512Z8SZQF",
};

// if (firebase.apps.length === 0) {
const app = initializeApp(firebaseConfig);
// }

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
