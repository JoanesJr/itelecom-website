// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjdAbhOpfLefbsHarF0x7lDqqx7AE9w74",
  authDomain: "itelecom-website.firebaseapp.com",
  projectId: "itelecom-website",
  storageBucket: "itelecom-website.appspot.com",
  messagingSenderId: "864857810716",
  appId: "1:864857810716:web:4f2d7f36f882fb5b9cfcd9",
  measurementId: "G-VBHJPPZC0E",
};

// Initialize Firebase
// const appAdmin = initAdmin();
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const fileStorage = getStorage(app);
const auth = getAuth(app);

export const SignIn = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
};

export const SignOut = async () => {
  await signOut(auth);
};
