"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function JoinUs() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getTrainingTypes, setTrainingTypes] = useState([]);
  const [trainingType, setTrainingType] = useState("");


  useEffect(() => {
    const fetchTrainingTypes = async () => {
      try {
        const response = await fetch(`/api/list-training`);
        const data = await response.json();
        setTrainingTypes(data.data);
      } catch (err) {
        console.log("Error fetching trainings", err);
      }
    };

    fetchTrainingTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      firstName,
      lastName,
      email,
      contactNo: contact,
      trainingType,
       status: "Active",
    };

    try {
      const response = await fetch(`/api/joinUs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      

      const data = await response.json();
       console.log("Received POST:", data);

      if (response.ok) {
        alert("Trainee registered and email sent!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setTrainingType("");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10 w-[70%] mx-auto">
        <div className="w-[100%]">
          <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="w-[100%]">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="w-[100%]">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="w-[100%]">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Contact No.</label>
          <input
            type="tel"
            placeholder="Enter your contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="w-[100%]">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Training For</label>
          <select
            value={trainingType}
            onChange={(e) => setTrainingType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Training</option>
            {getTrainingTypes.map((type) => (
              <option key={type._id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex mt-4 items-center justify-center gap-2 bg-blue-900 text-white text-lg py-3 rounded-md hover:!bg-blue-900 transition"
        >
          <span>+</span> Join Us
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>

      <p className=" text-sm text-center text-gray-600 last-text pt-3">
        Already have an account?{" "}
        <Link href="/join-us-sign-in" className="!text-blue-900 hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
