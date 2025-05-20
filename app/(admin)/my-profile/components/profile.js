"use client";

import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '@/app/providers/authprovider';


export default function ProfileForm({ token }) {
    const [user, setAuthUser] = useState({ name: '', email: '', company: '', designation: '', phone: '', joiningDate: '', username: '' });
    const [profile, setProfileImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [getDesignations, setDesignations] = useState([]);
    const { setUser } = useContext(AuthContext);
    const notifySettings = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    useEffect(() => {
        const fetchDesignations = async () => {
            try {
                const response = await fetch(`/api/designation-list`);
                const data = await response.json();
                console.log(data.data)
                setDesignations(data.data);
            } catch (err) {
                console.log("Error fetching designations", err);
            }
        }

        fetchDesignations();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data && data.user) {
                    setAuthUser({ id: data.user._id, name: data.user.name, email: data.user.email, company: data.user.company, designation: data.user.designation, phone: data.user.phone, joiningDate: data.user.joiningDate, username: data.user.username, });
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("company", user.company);
        formData.append("designation", user.designation);
        formData.append("phone", user.phone);
        formData.append("joiningDate", user.joiningDate);
        formData.append("username", user.username);
        formData.append("profileImage", profile);

        try {
            const res = await fetch("/api/update-profile", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.status == true) {
                toast.success(data.message, notifySettings);
                setUser(data.data);
            } else {
                toast.error(data.message, notifySettings);
            }
        } catch (err) {
            toast.error(err.message, notifySettings);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleFormSubmission} className="tab-content bg-colorr" encType='multipart/form-data'>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.name}
                            onChange={(e) => setAuthUser({ ...user, name: e.target.value })}
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.email}
                            onChange={(e) => setAuthUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor="company" className="text-sm font-medium text-gray-700">Company</label>
                        <input
                            type="text"
                            id="company"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.company}
                            onChange={(e) => setAuthUser({ ...user, company: e.target.value })}
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor="designation" className="text-sm font-medium text-gray-700">Designation</label>
                        <select
                            id="designation"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.designation}
                            onChange={(e) => setAuthUser({ ...user, designation: e.target.value })}
                            required
                        >
                            <option value="">Select Designation</option>
                            {getDesignations.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.phone}
                            onChange={(e) => setAuthUser({ ...user, phone: e.target.value })}
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor="joiningDate" className="text-sm font-medium text-gray-700">Joining Date</label>
                        <input
                            type="date"
                            id="joiningDate"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.joiningDate}
                            onChange={(e) => setAuthUser({ ...user, joiningDate: e.target.value })}
                            required
                        />
                    </div>

                    {/* Username */}                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.username}
                            onChange={(e) => setAuthUser({ ...user, username: e.target.value })}
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor="profile" className="text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            id="profile"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="flex justify-center margin-chnge">
                    <button
                        type="submit"
                        className={`text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center ${loading && "opacity-70 cursor-not-allowed"}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                Please wait
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 animate-spin text-white" viewBox="0 0 100 101" fill="none">
                                    <path d="M100 50.6C100 78.2 77.6 100.6 50 100.6C22.4 100.6 0 78.2 0 50.6C0 23 22.4 0.6 50 0.6C77.6 0.6 100 23 100 50.6ZM9.1 50.6C9.1 73.2 27.4 91.5 50 91.5C72.6 91.5 90.9 73.2 90.9 50.6C90.9 28 72.6 9.7 50 9.7C27.4 9.7 9.1 28 9.1 50.6Z" fill="#E5E7EB" />
                                    <path d="M93.97 39.04C96.39 38.4 97.86 35.91 97.01 33.55C95.29 28.82 92.87 24.37 89.82 20.35C85.85 15.12 80.88 10.72 75.21 7.41C69.54 4.1 63.28 1.94 56.77 1.05C51.77 0.37 46.7 0.45 41.73 1.28C39.26 1.69 37.81 4.2 38.45 6.62C39.09 9.05 41.57 10.47 44.05 10.11C47.85 9.55 51.72 9.53 55.54 10.05C60.86 10.78 65.99 12.55 70.63 15.26C75.27 17.96 79.33 21.56 82.58 25.84C84.92 28.91 86.8 32.29 88.18 35.88C89.08 38.22 91.54 39.68 93.97 39.04Z" fill="currentColor" />
                                </svg>
                            </span>
                        ) : "Update Profile"}
                    </button>
                </div>
            </form>
            <div className="outer-toster">
                <ToastContainer />
            </div>

        </>
    );
}
