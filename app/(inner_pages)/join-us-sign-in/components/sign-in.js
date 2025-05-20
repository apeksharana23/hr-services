"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginTraineesPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
      console.log("Login Response:", data);

      if (response.ok) {
        alert("Login successful!");
        setEmail("");
        setPassword("");
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          Login
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
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
