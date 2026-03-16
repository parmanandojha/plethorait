import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_KEY = "plethora_admin_authed";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const authed = localStorage.getItem(ADMIN_KEY);
    if (authed === "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin") {
      localStorage.setItem(ADMIN_KEY, "true");
      navigate("/admin", { replace: true });
      return;
    }

    setError("Invalid credentials. Use admin / admin.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white px-4">
      <div className="w-full max-w-sm bg-[#1b1b1b] border border-white/10 rounded-md px-8 py-10 shadow-lg">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Plethora IT Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wide mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-white/20 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-white/20 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 mt-1" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-[#f5f5f5] transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-[11px] text-white/60 text-center">
          Hint: username <span className="font-mono">admin</span>, password{" "}
          <span className="font-mono">admin</span>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;

