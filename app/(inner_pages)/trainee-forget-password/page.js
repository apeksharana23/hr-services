"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function TraineesForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/trainee-forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status) {
        setMessage("Email sent successfully. Redirecting to login...");
        setTimeout(() => router.push("/join-us-sign-in"), 2000);
        setEmail("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="main-container">

      <div className="forgot-password-form">
        <div className="forgot-section">
          <div className="container">
            <div className="forgot-box">
              <h2>Forgot Your Password?</h2>
              <p className="forgot-text">Enter your email and we will send you a reset link.</p>
              <form onSubmit={handleSubmit} className="form-3">
                <div className="forgot-input">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Enter your email</label>
                </div>
                <button type="submit" className="forgot-btn">
                  Send Reset Link
                </button>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="switch-login">
                  <p>
                    Remembered your password? <Link href="/join-us-sign-in">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

