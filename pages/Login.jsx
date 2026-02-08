// ENHANCED LOGIN PAGE UI (Modern Glass + Gradient + UX polish)
// src/pages/Login.jsx

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        setError("User record missing. Please register again.");
        setLoading(false);
        return;
      }

      const role = userDoc.data().role;

      // Role‑based navigation (can expand later)
      if (role === "member" || role === "lead" || role === "head") {
        navigate("/");
      } else {
        setError("Invalid role assigned.");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F2F0D8" }}>
      {/* Glass Card */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-lg bg-white border-2 border-black/10 rounded-3xl p-10 shadow-lg space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-black">
            Welcome Back 👋
          </h1>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="w-full p-3 rounded-xl bg-white border-2 border-black/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-black placeholder-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border-2 border-black/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-black placeholder-gray-500"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-black transition active:scale-95 bg-yellow-400 hover:bg-yellow-500"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 opacity-50 text-xs">
          <div className="flex-1 h-px bg-white/20" />
          OR
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-black">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-500 font-semibold cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </form>
    </div>
  );
}
