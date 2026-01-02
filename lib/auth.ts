"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

// ---------- EMAIL + PASSWORD ----------

// Create new account
export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login existing user
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// ---------- GOOGLE ----------
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// ---------- LOGOUT ----------
export const logout = () => {
  return signOut(auth);
};

// ---------- LISTEN TO AUTH STATE (CURRENT USER) ----------
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};
