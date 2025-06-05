"use client";
import React, { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { useSetCookie } from 'cookies-next/client';
import { AuthContext } from "@/app/providers/authprovider";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginTraineesPage() {
  const { refreshAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setCookie = useSetCookie();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch(`/api/join-us-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        setCookie("trainee_token", data.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });

        setTimeout(async () => {
          await refreshAuth();
          router.push('/dashboard-trainees');
        }, 1000);
      } else {
        toast.error(data.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="outer-toster">
        <ToastContainer />
      </div>
      <form onSubmit={handleSubmit} className="space-y-10 w-[70%] mx-auto">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="forget text-end m-left">
          <label htmlFor="remember"></label>
          <Link href="/trainee-forget-password" className="!text-blue-900">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex mt-2 items-center justify-center gap-2 bg-blue-900 text-white text-lg py-3 rounded-md hover:!bg-blue-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 last-text-1 pt-3">
        Don’t have an account?{" "}
        <Link href="/joinus" className="!text-blue-900 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}
