import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoAyVQoQCEqVBJ6123xZc_tv3Z67D6nGc",
  authDomain: "tradepro-e6c81.firebaseapp.com",
  projectId: "tradepro-e6c81",
  storageBucket: "tradepro-e6c81.firebasestorage.app",
  messagingSenderId: "452559534598",
  appId: "1:452559534598:web:f014b715e7a7774c742187",
  measurementId: "G-MYNRY5TR13"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);