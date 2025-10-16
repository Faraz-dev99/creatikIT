"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { admin, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

   //Redirect if already logged in
   
   useEffect(() => {
     if (admin) router.push("/dashboard");
   }, [admin, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await login({ email, password });
    if (admin) router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('/bgimage.webp')] bg-center bg-cover p-2">
      <Toaster position="top-right" />
      <div className="relative w-full max-w-5xl min-h-[calc(100vh-200px)] bg-[url('/bgimage.webp')] bg-center bg-cover  rounded-2xl overflow-hidden shadow-2xl shadow-black/70 flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-4xl text-blue-200 font-bold mb-4">
              Welcome Back 👋
            </h2>
            <p className="text-purple-300 text-lg">
              Log in to your admin dashboard and manage everything efficiently.
            </p>
          </div>
          <div className="absolute right-[-60px] top-0 bottom-0 w-[120px]  rounded-full  opacity-30"></div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-blue-200 text-center mb-6">
            Admin Login
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative mt-2">
              <FaUserAlt className="absolute left-3 top-3 text-gray-300" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                required
                className="peer w-full pl-10 pt-4 pb-2 border-b border-gray-300 text-gray-300 focus:border-purple-300 focus:outline-none transition bg-transparent"
              />
              <label
                htmlFor="email"
                className={`absolute left-10 text-gray-300 text-sm transition-all duration-200 ${
                  email
                    ? "-top-1.5 text-purple-300 text-sm"
                    : "top-3 text-gray-300 text-base"
                } peer-focus:-top-1.5 peer-focus:text-purple-300 peer-focus:text-sm`}
              >
                Email Address
              </label>
            </div>

            <div className="relative mt-4">
              <FaLock className="absolute left-3 top-3 text-gray-300" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                required
                className="peer w-full pl-10 pt-4 pb-2 border-b border-gray-300 text-gray-300 focus:border-purple-300 focus:outline-none transition bg-transparent"
              />
              <label
                htmlFor="password"
                className={`absolute left-10 text-gray-300 text-sm transition-all duration-200 ${
                  password
                    ? "-top-1.5 text-purple-300 text-md"
                    : "top-3 text-gray-300 text-base"
                } peer-focus:-top-1.5 peer-focus:text-purple-300 peer-focus:text-sm`}
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 text-white text-lg font-medium rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700  transition disabled:opacity-60"
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