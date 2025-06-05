"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TrainingTypeCard from "./components/TrainingTypeCard"; 
import axios from "axios";

export default function Courses() {
    const [trainingTypes, setTrainingTypes] = useState([]);

    useEffect(() => {
        async function fetchTrainingTypes() {
            try {
                const res = await axios.get("/api/training-type?page=1&limit=100");
                setTrainingTypes(res.data.data || []);
            } catch (err) {
                console.error("Error fetching training types:", err);
            }
        }

        fetchTrainingTypes();
    }, []);

    return (
        <>
            <div className="about-page-header-bg">
                <div className="about-page-header">
                    <div className="container">
                        <div className="about-page-header-content">
                            <div className="about-page-header-inner">
                                <div className="about-page-header-text">
                                    <div className="about-page-header-text-inner">
                                        <h1 className="about-page-header-text-heading">Courses</h1>
                                    </div>
                                </div>
                                <div className="about-page-breadcrumbs">
                                    <div className="about-page-breadcrumbs-inner">
                                        <span>
                                            <Link href="/" className="home"><span>Home</span></Link>
                                        </span>
                                        <span className="sep">-</span>
                                        <span>
                                            <Link href="/courses" className="home"><span>Courses</span></Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                {trainingTypes.length === 0 ? (
                    <p className="text-center text-gray-500">No courses available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {trainingTypes.map((item) => (
                            <TrainingTypeCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
