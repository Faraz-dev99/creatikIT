"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { FaUserAlt, FaLock } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://live-project-backend-viiy.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.token) Cookies.set("token", data.token, { expires: 7 });
      toast.success("Login successful 🎉");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Unexpected error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-4">
      <Toaster position="top-right" />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left curved gradient section */}
        <div className="relative w-full md:w-1/2 bg-gradient-to-br from-[#00b09b] to-[#96c93d] flex items-center justify-center text-white p-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back 👋</h2>
            <p className="text-white/90 text-lg">
              Log in to your admin dashboard and manage everything efficiently.
            </p>
          </div>

          {/* Decorative curved overlay */}
          <div className="absolute right-[-60px] top-0 bottom-0 w-[120px] bg-white rounded-full blur-2xl opacity-30"></div>
        </div>

        {/* Right side login form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Admin Login
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email input */}
            <div className="relative mt-2">
              <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                required
                className="peer w-full pl-10 pt-4 pb-2 border-b border-gray-300 text-gray-700 focus:border-green-500 focus:outline-none transition bg-transparent"
              />
              <label
                htmlFor="email"
                className={`absolute left-10 text-gray-400 text-sm transition-all duration-200
      ${
        email ? "top-0 text-green-500 text-sm" : "top-3 text-gray-400 text-base"
      }
      peer-focus:-top-1.5 peer-focus:text-green-500 peer-focus:text-sm`}
              >
                Email Address
              </label>
            </div>

            {/* Password input */}
            <div className="relative mt-4">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                required
                className="peer w-full pl-10 pt-4 pb-2 border-b border-gray-300 text-gray-700 focus:border-green-500 focus:outline-none transition bg-transparent"
              />
              <label
                htmlFor="password"
                className={`absolute left-10 text-gray-400 text-sm transition-all duration-200
      ${
        password
          ? "top-0 text-green-500 text-md"
          : "top-3 text-gray-400 text-base"
      }
      peer-focus:-top-1.5 peer-focus:text-green-500 peer-focus:text-sm`}
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 text-white text-lg font-medium rounded-full bg-gradient-to-r from-[#00b09b] to-[#96c93d] hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;