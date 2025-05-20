"use client";
 
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';



export default function ContactUs() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.status) {
                alert(result.message);
                e.target.reset();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };




    return (
        <div className="contact-us">
            <div className="about-page-header">
                <div className="container">
                    <div className="about-page-header-content">
                        <div className="about-page-header-inner">
                            <div className="about-page-header-text">
                                <div className="about-page-header-text-inner">
                                    <h1 className="about-page-header-text-heading">Contact Us</h1>
                                </div>

                            </div>
                            <div className="about-page-breadcrumbs">
                                <div className="about-page-breadcrumbs-inner">
                                    <span>
                                        <Link href="/" className="home"><span>Home</span></Link>
                                    </span>
                                    <span className="sep">-</span>
                                    <span>
                                        <Link href="/contact" className="home"><span>Contact Us</span></Link>
                                    </span>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-us-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="contact-us-info">
                                <div className="contact-us-info-inner">
                                    <div className="contact-us-info-box1">
                                        <div className="contact-us-info-box1-icon">
                                            <div className="contact-us-info-box1-icon-inner">
                                                <Link href="#" className="contact-us-info-box1-icon-link">
                                                    <FontAwesomeIcon icon={faEnvelope} width="30" height="30" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="contact-us-info-box1-text">
                                            <h2 className="contact-us-info-box1-text-heading">
                                                Email Address</h2>
                                            <div className="contact-us-info-box1-text-content">
                                                info@yourmail.com
                                                <br></br>
                                                email@example.com
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-us-info">
                                <div className="contact-us-info-inner">
                                    <div className="contact-us-info-box1">
                                        <div className="contact-us-info-box1-icon">
                                            <div className="contact-us-info-box1-icon-inner">
                                                <Link href="#" className="contact-us-info-box1-icon-link">
                                                    <FontAwesomeIcon icon={faLocationDot} width="30" height="30" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="contact-us-info-box1-text">
                                            <h2 className="contact-us-info-box1-text-heading">
                                                Our Address</h2>
                                            <div className="contact-us-info-box1-text-content">
                                                19 Ingraham Street,
                                                <br></br>
                                                Brooklyn, New York 11206
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-us-info">
                                <div className="contact-us-info-inner">
                                    <div className="contact-us-info-box1">
                                        <div className="contact-us-info-box1-icon">
                                            <div className="contact-us-info-box1-icon-inner">
                                                <Link href="#" className="contact-us-info-box1-icon-link">
                                                    <FontAwesomeIcon icon={faCalendarDays} width="30" height="30" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="contact-us-info-box1-text">
                                            <h2 className="contact-us-info-box1-text-heading">
                                                Hours
                                            </h2>
                                            <div className="contact-us-info-box1-text-content">
                                                Mon – Fri: 9am – 5pm
                                                <br></br>
                                                Sat – Sun: closed
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="message-us">
                <div className='container'>
                    <div className='message-us-inner'>
                        <div className="row g-0">
                            <div className="col-md-6">
                                <div className="contact-section-bottom-inner-left">
                                    <div className="pbmit-heading-subheading">
                                        <h4 className="pbmit-subtitle">MESSAGE US</h4>
                                        <h2 className="pbmit-title">Have be any Question? feel free to contact with us.</h2>
                                    </div>
                                    <p className="mb-4">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                                    <ul className="pbmit-social-links pt-3">
                                        <li className="pbmit-social-li pbmit-social-facebook ">
                                            <Link href="#" target="_blank" rel="noopener">
                                                <span><FontAwesomeIcon icon={faSquareFacebook} width="15" height="30" /> </span>
                                            </Link>
                                        </li>
                                        <li className="pbmit-social-li pbmit-social-twitter ">
                                            <Link href="#" target="_blank" rel="noopener">
                                                <span><FontAwesomeIcon icon={faXTwitter} width="15" height="30" /> </span>
                                            </Link>
                                        </li>
                                        <li className="pbmit-social-li pbmit-social-linkedin ">
                                            <Link href="#" target="_blank" rel="noopener">
                                                <span><FontAwesomeIcon icon={faInstagram} width="15" height="30" /> </span>
                                            </Link>
                                        </li>
                                        <li className="pbmit-social-li pbmit-social-instagram ">
                                            <Link href="#" target="_blank" rel="noopener">
                                                <span><FontAwesomeIcon icon={faLinkedin} width="15" height="30" /> </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='contact-form'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row mb-3 g-3'>
                                            <div className='col-lg-6'>
                                                <input type="text" className="form-control-1" placeholder="Your Name" name="name" required />
                                            </div>
                                            <div className='col-lg-6'>
                                                <input type="email" className="form-control-1" placeholder="Email Address" name="email" required />
                                            </div>
                                            <div className='col-lg-6'>
                                                <input type="tel" className="form-control-1" placeholder="Phone Number" name="phone" />
                                            </div>
                                            <div className='col-lg-12'>
                                                <textarea className="form-control-1" name="message" rows="5" placeholder="Write Message" required></textarea>
                                            </div>
                                            <div className='col-lg-12'>
                                                <button type="submit" className="message-btn">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}