"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage({ params }) {
    const [token, setToken] = useState("");
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const checkToken = async () => {
            const { slug } = await params;
            setToken(decodeURIComponent(slug));
        }

        checkToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (data.status) {
                setMessage("Password reset successful. Redirecting to login...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setError(data.message || "Reset failed.");
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
                            <h2>Reset Your Password</h2>
                            <p className="forgot-text">Enter and confirm your new password.</p>

                            <form onSubmit={handleSubmit} className="form-3">
                                <div className="forgot-input">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label>New Password</label>
                                </div>

                                <div className="forgot-input">
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <label>Confirm Password</label>
                                </div>

                                <button type="submit" className="forgot-btn">
                                    Reset Password
                                </button>

                                {message && <p className="success-message">{message}</p>}
                                {error && <p className="error-message">{error}</p>}

                                <div className="switch-login">
                                    <p>
                                        Know your password? <a href="/login">Log in</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
