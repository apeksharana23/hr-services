import React from "react";
import Image from "next/image";
import Link from "next/link";

import image_1 from "../../../img/service-1.jpg";
import image_2 from "../../../img/service-2.jpg";
import image_3 from "../../../img/service-3.jpg";
import image_4 from "../../../img/service-4.png";
import image_5 from "../../../img/service-5.jpg";
import image_6 from "../../../img/service-6.jpg";

export default function ServicesDetail({ params }) {
    const { slug } = params || {};
    const serviceData = [
        {
            id: 1,
            title: "Employee Management",
            slug: "service-1",
            image: image_1,
            description: "Our Employee Management service offers a comprehensive solution for managing all employee-related data, performance metrics, and roles efficiently. Streamline your HR processes with centralized employee profiles, track performance evaluations, and assign roles with ease. This service also includes tools for onboarding new hires, managing employee records, and generating detailed reports to support strategic decision-making, ensuring your workforce is organized and productive.",
        },
        {
            id: 2,
            title: "Attendance Tracking",
            slug: "service-2",
            image: image_2,
            description: "Track employee attendance seamlessly with real-time logs, shift management, and detailed attendance summaries. Our Attendance Tracking service allows you to monitor clock-in and clock-out times, manage shift schedules, and identify attendance patterns to improve workforce efficiency. Features include automated notifications for tardiness, integration with payroll systems, and customizable reports, helping you maintain compliance and optimize employee productivity.",
        },
        {
            id: 3,
            title: "Leave Management",
            slug: "service-3",
            image: image_3,
            description: "Simplify the entire leave management process with our user-friendly interface designed to handle leave requests, approvals, and tracking effortlessly. Employees can submit leave applications online, while managers can review and approve them with a single click. The system supports various leave types, including sick leave, vacation, and maternity leave, and provides a calendar view for better planning. Stay compliant with labor laws and maintain transparency with automated notifications and detailed leave balance reports.",
        },
        {
            id: 4,
            title: "Payroll Management",
            slug: "service-4",
            image: image_4,
            description: "Automate your payroll processes with our Payroll Management service, designed to handle calculations, tax deductions, and payslip generation in just a few clicks. This service ensures accurate salary disbursements by integrating with attendance and leave data, calculating overtime, bonuses, and deductions automatically. It also supports compliance with local tax regulations, provides secure payslip distribution, and offers detailed payroll reports for financial planning, saving you time and reducing errors.",
        },
        {
            id: 5,
            title: "Document Management",
            slug: "service-5",
            image: image_5,
            description: "Securely manage employee documents, compliance files, and HR records in one centralized platform with our Document Management service. This solution allows you to store, organize, and retrieve documents such as contracts, certifications, and performance reviews with ease. Features include role-based access control, version tracking, and automated reminders for document renewals, ensuring compliance with legal requirements and enhancing data security while reducing administrative overhead.",
        },
        {
            id: 6,
            title: "Trainee Management",
            slug: "service-6",
            image: image_6,
            description: "Efficiently manage trainee progress, evaluations, and training schedules with our Trainee Management service. This system enables you to create customized training programs, track trainee performance through assessments, and schedule sessions seamlessly. It also provides tools for feedback collection, progress reporting, and certification tracking, ensuring that your trainees are well-prepared and your training initiatives are successful. Ideal for organizations looking to develop talent effectively.",
        },
    ];

    const service = serviceData.find((service) => service.slug === slug);

    return (
        <>
            <div className="service-page-header bg-white py-8 border-b border-gray-200">
                <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="service-page-header-content">
                        <div className="service-page-header-inner">
                            <div className="service-page-breadcrumbs mb-4">
                                <div className="service-page-breadcrumbs-inner flex items-center space-x-2 text-sm text-gray-600">
                                    <span>
                                        <Link
                                            href="/"
                                            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            Home
                                        </Link>
                                    </span>
                                    <span className="text-gray-400">--</span>
                                    <span>
                                        <Link
                                            href="/services"
                                            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            Services
                                        </Link>
                                    </span>
                                    {service && (
                                        <>
                                            <span className="text-gray-400">--</span>
                                            <span className="text-gray-800">{service.title}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="service-page-header-text">
                                <div className="service-page-header-text-inner">
                                    <h1 className="service-page-header-text-heading text-3xl md:text-4xl font-bold text-gray-800">
                                        {service ? service.title : "Service Not Found"}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 services">
                {service ? (
                    <div className="max-w-5xl mx-auto">
                        <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
                            <Image
                                src={service.image}
                                alt={service.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-16 max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Service Not Found</h1>
                        <p className="text-gray-600 text-lg">The service you're looking for doesn't exist. Please try another one.</p>
                    </div>
                )}
            </div>
        </>
    );
}