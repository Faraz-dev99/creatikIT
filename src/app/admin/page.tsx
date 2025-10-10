"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    

    try {
      const res = await fetch(
        "https://live-project-backend-viiy.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("✅ API Response:", data);

      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      // ✅ On success, trigger redirect state
      setRedirect(true);
    } catch (err: any) {
      console.error("❌ Login Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Automatically redirect after login
  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
       // window.location.href = "/dashboard";
       router.push("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [redirect]);

  return (
    <div className="bg-cyan-500 dark:bg-gray-900 max-md:min-h-[calc(100vh-52px)] md:min-h-[calc(100vh-56px)] flex justify-center items-center p-4 h-full">
      <div className="bg-gradient-to-r from-blue-500 to-yellow-500 p-[2px] rounded-xl shadow-2xl w-full max-w-5xl">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl flex flex-col md:flex-row overflow-hidden">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
            <p className="text-black font-semibold dark:text-gray-300 mb-6 text-lg text-center md:text-left">
              Admin Login
            </p>

            <form className="space-y-6">
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=" "
                  className="peer w-full border rounded-lg px-4 pt-5 pb-2 bg-white dark:bg-gray-700 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <label
                  className="absolute left-4 top-0 bg-gray-200 dark:bg-gray-800 px-1 text-gray-500 text-sm transition-all duration-200 
                    peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                    peer-focus:-top-6 peer-focus:text-sm peer-focus:text-cyan-600"
                >
                  Enter Your Email
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=" "
                  className="peer w-full border rounded-lg px-4 pt-5 pb-2 bg-white dark:bg-gray-700 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <label
                  className="absolute left-4 top-0 bg-gray-200 dark:bg-gray-800 px-1 text-gray-500 text-sm transition-all duration-200 
                    peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                    peer-focus:-top-6 peer-focus:text-sm peer-focus:text-cyan-600"
                >
                  Password
                </label>
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading ? "Logging in..." : redirect ? "Redirecting..." : "Login"}
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-white dark:bg-gray-900">
            <img
              src="/asmin.png"
              alt="Admin Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain rounded shadow-lg border border-cyan-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;