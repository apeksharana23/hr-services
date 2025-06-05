"use client";

import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/providers/authprovider';

export default function ProfileForm() {
    const [trainee, setAuthTrainee] = useState({ firstName: '', lastName: '', email: '', contactNo: '' });
    const [profile, setProfileImage] = useState('');
    const [loading, setLoading] = useState(false);
    const { traineeToken, setTrainee: setContextTrainee } = useContext(AuthContext);
    const router = useRouter();
    const notifySettings = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    useEffect(() => {
        if (traineeToken === null) {
            return;
        }

        if (!traineeToken) {
            toast.error("No authentication token provided", notifySettings);
            router.push('/login');
            return;
        }

        const fetchTrainee = async () => {
            try {
                const response = await fetch("/api/trainee-me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${traineeToken}`,
                    },
                });

                const data = await response.json();
                if (data.status && data.trainee) {
                    setAuthTrainee({
                        id: data.trainee._id,
                        firstName: data.trainee.firstName,
                        lastName: data.trainee.lastName,
                        email: data.trainee.email,
                        contactNo: data.trainee.contactNo,
                    });
                } else {
                    toast.error(data.message || "Failed to fetch trainee data", notifySettings);
                }
            } catch (error) {
                toast.error("Error fetching profile data", notifySettings);
            }
        };

        fetchTrainee();
    }, [traineeToken, router]);



    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("id", trainee.id);
        formData.append("firstName", trainee.firstName);
        formData.append("lastName", trainee.lastName);
        formData.append("email", trainee.email);
        formData.append("contactNo", trainee.contactNo);
        if (profile) formData.append("profileImage", profile);

        try {
            const res = await fetch("/api/update-profile-trainee", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.status) {
                toast.success(data.message, notifySettings);
                setContextTrainee(data.data);
            } else {
                toast.error(data.message, notifySettings);
            }
        } catch (err) {
            toast.error(err.message, notifySettings);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleFormSubmission} className="tab-content bg-colorr" encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={trainee.firstName}
                            onChange={(e) => setAuthTrainee({ ...trainee, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={trainee.lastName}
                            onChange={(e) => setAuthTrainee({ ...trainee, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={trainee.email}
                            onChange={(e) => setAuthTrainee({ ...trainee, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contactNo" className="text-sm font-medium text-gray-700">Contact No</label>
                        <input
                            type="text"
                            id="contactNo"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={trainee.contactNo}
                            onChange={(e) => setAuthTrainee({ ...trainee, contactNo: e.target.value })}
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