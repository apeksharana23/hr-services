import React from "react";
import SignUp from "../components/Hr-signUp";

const SignUpPage = () => {
  return (
    <div className="main-container">
      <div className="register-form">
        <div className="register-section">
          <div className="container">
            <div className="register-box">
              <h2>Create an Account</h2>
                <SignUp />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignUpPage;