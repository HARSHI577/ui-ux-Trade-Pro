"use client";

import { useEffect, useState } from "react";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logout,
  subscribeToAuthChanges,
} from "@/lib/auth";
import { sendPasswordResetEmail, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const handleForgotPassword = async () => {
    setError(null);
    setInfo(null);
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setInfo("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message || "Failed to send reset email. Please try again later."
      );
    } finally {
      setLoading(false);
    }
    console.log("Forgot password for:", email);
  };

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailSubmit = async () => {
    setError(null);
    setLoading(true);
    setInfo(null);
    try {
      if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
      }
      if (mode === "signup") {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = async (provider: "google") => {
    setError(null);
    setLoading(true);
    setInfo(null);
    try {
      if (provider === "google") {
        await signInWithGoogle();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome 👋</h1>

          <p className="text-gray-300 mb-6">
            Logged in as{" "}
            <span className="font-medium">{currentUser.email}</span>
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 mb-4 hover:bg-red-700 p-3 rounded-lg font-medium"
          >
            Logout
          </button>
          <a className="hover:underline text-blue-600" href="/">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">
          {mode === "signup" ? "Create Account" : "Login"}
        </h1>

        <div className="flex justify-center space-x-2 mb-6 md:mt-0">
          <button
            className={`px-6 py-2 rounded transition-colors ${
              mode === "signup"
                ? "bg-blue-600 cursor-default"
                : "bg-gray-700 hover:bg-blue-700"
            }`}
            onClick={() => setMode("signup")}
            disabled={mode === "signup"}
          >
            Sign up
          </button>
          <button
            className={`px-6 py-2 rounded transition-colors ${
              mode === "login"
                ? "bg-blue-600 cursor-default"
                : "bg-gray-700 hover:bg-blue-700"
            }`}
            onClick={() => setMode("login")}
            disabled={mode === "login"}
          >
            Login
          </button>
        </div>

        <div className="flex flex-col space-y-4 mb-6 md:mt-0">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900 p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 text-white w-full"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900 p-3 pr-16 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 text-white w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 my-auto text-sm text-gray-300 hover:text-white focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {mode === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-400 hover:underline"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            onClick={handleEmailSubmit}
            disabled={loading}
            className={`p-3 rounded-lg text-white w-full transition-colors ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Please wait..."
              : mode === "signup"
              ? "Create account"
              : "Login"}
          </button>
        </div>

        <div className="my-4 text-center font-semibold text-white">
          <span>OR</span>
        </div>

        <button
          onClick={() => handleProvider("google")}
          disabled={loading}
          className={`p-3 rounded-lg text-white w-full transition-colors ${
            loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Continue with Google
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="text-blue-400 hover:underline"
          >
            {mode === "signup"
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </button>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: 12, whiteSpace: "pre-wrap" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
