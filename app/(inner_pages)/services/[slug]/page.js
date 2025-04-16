import React from "react";
import Image from "next/image";

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
            description: "This is the description for service 1.",
        },
        {
            id: 2,
            title: "Attendance Tracking",
            slug: "service-2",
            image: image_2,
            description: "This is the description for service 2.",
        },
        {
            id: 3,
            title: "Leave Management",
            slug: "service-3",
            image: image_3,
            description: "This is the description for service 3.",
        },
        {
            id: 4,
            title: "Payroll Management",
            slug: "service-4",
            image: image_4,
            description: "This is the description for service 4.",
        },
        {
            id: 5,
            title: "Document Management",
            slug: "service-5",
            image: image_5,
            description: "This is the description for service 5.",
        },
        {
            id: 6,
            title: "Trainee Management",
            slug: "service-6",
            image: image_6,
            description: "This is the description for service 6.",
        },
    ];

    const service = serviceData.find((service) => service.slug === slug);

    return (
        service ? (
            <div className="service-detail">
                <h1>{service.title}</h1>
                <Image src={service.image} alt={service.title} width={500} height={300} />
                <p>{service.description}</p>
            </div>
        ) : (
            <div>
                <h1>Service not found</h1>
                <p>The service you are looking for does not exist.</p>
            </div>
        )
    );
}