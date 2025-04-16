import React from "react";
import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <div className="main-container">

      <div className="forgot-password-form">
        <div className="forgot-section">
          <div className="container">
            <div className="forgot-box">
              <h2>Forgot Your Password?</h2>
              <p className="forgot-text">Enter your email and we will send you a reset link.</p>
              <form action="#" className="form-3">
                <div className="forgot-input">
                  <input type="email" required />
                  <label>Enter your email</label>
                </div>
                <button type="submit" className="forgot-btn">Send Reset Link</button>
                <div className="switch-login">
                  <p>
                    Remembered your password? <Link href="/login">Log in</Link>
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

export default ForgotPasswordPage;