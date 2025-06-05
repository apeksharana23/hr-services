"use client";

import React, { useState, useEffect, useContext } from 'react';
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function MyCourses() {
  const [course, setCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function myCourses() {
      try {
        const trainee_token = getCookie("trainee_token");
        if (trainee_token) {
          const res = await fetch("/api/my-courses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${trainee_token}`
            },
            body: JSON.stringify({ token: trainee_token })
          });

          const data = await res.json();
          if (data && data.status && data.data) {
            setCourse(data.data);
          } else {
            setCourse(null);
          }
        } else {
          router.push("/join-us-sign-in");
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setCourse(null);
      }
    }

    myCourses();
  }, []);

  return (
    <div className="page-wrapper bg-colorr">
      <div className="content-wrapper">
        <h1 className="page-title">My Course Details</h1>
        <nav className="breadcrumb-nav" aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a className="home1" href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page"><a className="home1" href="/dashboard-trainee">Dashboard</a></li>
          </ol>
        </nav>

        <section className="user-info-sec">
          <div className="user-container">
            {course ? (
              <div className="info-card">
                <div className="card-header">
                  <h3 className="card-title">{course.course_name}</h3>
                </div>
                <p><strong>Description:</strong> {course.course_description}</p>
                <p><strong>Joined On:</strong> {new Date(course.joining_date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}</p>
              </div>
            ) : (
              <p>No course data found.</p>
            )}
          </div>
        </section>
      </div>
    </div>

  );
}