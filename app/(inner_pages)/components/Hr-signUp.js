"use client";
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';

export default function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const notifySettings = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name: fullname,
      email,
      phone,
      password,
      confirm_password: confirmPassword,
      role: 'hr' 
    };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === true) {
        setFullname("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        e.target.reset();

        toast.success(data.message, notifySettings);
      } else {
        toast.error(data.message, notifySettings);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
    routeModule.push("/login");
  };

  return (
    <form className="form-2" onSubmit={handleSubmitForm}>
      <div className="register-input">
        <input type="text" required onChange={(e) => setFullname(e.target.value)} value={fullname} />
        <label>Full Name</label>
      </div>
      <div className="register-input">
        <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
        <label>Email Address</label>
      </div>
      <div className="register-input">
        <input type="tel" required onChange={(e) => setPhone(e.target.value)} value={phone} />
        <label>Phone Number</label>
      </div>
      <div className="register-input">
        <input type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        <label>Create Password</label>
      </div>
      <div className="register-input">
        <input type="password" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        <label>Confirm Password</label>
      </div>
      <div className="register-terms">
        <label htmlFor="agree" className="checkbox-label">
          <input type="checkbox" id="agree" required />
          <p>I agree to the <Link href="#">Terms & Conditions</Link></p>
        </label>
      </div>
      <button type="submit" className="register-btn" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      <div className="switch-login">
        <p>Already registered? <Link href="/login">Log in</Link></p>
      </div>
      <ToastContainer />
    </form>
  );
}
