import react from "react";
import Link from "next/link";
import Image from "next/image";

import img01Image from "../../img/img01.jpg";
import partnershipImage from "../../img/partnership.png";
import customerCareImage from "../../img/customercare.png";
import consultantImage from "../../img/consultant.png"; 
import leadershipImage from "../../img/leadership.png"; 
import consultationImage from "../../img/consultation.png"; 
import ctaicon2Image from "../../img/ctaicon2.png";



export default function AboutUs() {
    return (
        <div className="about-page-header-bg">
            <div className="about-page-header">
                <div className="container">
                    <div className="about-page-header-content">
                        <div className="about-page-header-inner">
                            <div className="about-page-header-text">
                                <div className="about-page-header-text-inner">
                                    <h1 className="about-page-header-text-heading">About Us</h1>
                                </div>

                            </div>
                            <div className="about-page-breadcrumbs">
                                <div className="about-page-breadcrumbs-inner">
                                    <span>
                                        <Link href="/" className="home"><span>Home</span></Link>
                                    </span>
                                    <span className="sep">-</span>
                                    <span>
                                        <Link href="/about-us" className="home"><span>About</span></Link>
                                    </span>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="about-page">
                <div className="container">
                    <div className="section-four-heading">
                        <div className="heading-subtitle">
                            <h4>WHO WE ARE</h4>
                        </div>
                        <h2 className="heading-text">
                            Why choose HR consulting
                            <br />
                            <em>Services Company</em>
                        </h2>
                    </div>
                    <div className="row">
                        {/* Left Column */}
                        <div className="col-xl">
                            <div className="abt-us-lft">
                                <div className="image">
                                    <Image src={img01Image} width={500} height={300} alt="About Us" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-xl">
                            <div className="abt-us-rgt">
                                <p>
                                    Our advisers provide a broad menu of services that identify the task requirements in the
                                    organization and design the task description with skill requirements for the task.
                                </p>
                                <div className="abt-us-content">
                                    <div className="abt-us-content-box">
                                        <div className="abt-us-content-box1">
                                            <div className="abt-us-content-box1-icon">
                                                <Image src={partnershipImage} width={50} height={50} alt="Strategic Partners" />
                                            </div>
                                            <div className="abt-us-content-text">
                                                <h2 className="abt-us-content-heading">Strategic Partners</h2>
                                                <div className="abt-us-more-text">
                                                    We believe in the value that our functions add to a business. Our strategic partners
                                                    play a specialist role in the success of a business.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="abt-us-content2">
                                    <div className="abt-us-content-box">
                                        <div className="abt-us-content-box1">
                                            <div className="abt-us-content-box1-icon">
                                                <Image src={customerCareImage} width={50} height={50} alt="Corporate Programs" />
                                            </div>
                                            <div className="abt-us-content-text">
                                                <h2 className="abt-us-content-heading">Corporate Programs</h2>
                                                <div className="abt-us-more-text">
                                                    Corporate Programs add value to our functions in a business. Our strategic partners
                                                    specialize in HR's role in the success of a business.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="end-text">
                                    Get intrigued about our service pricing?{" "}
                                    <Link href="#">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-seven">
                <div className="container">
                    <div className="approach-content">
                        <h4 className="approach-content-text">OUR APPROACH</h4>
                        <h2 className="approach-title">
                            We Choose a Human
                            <em className="approach-highlight">Resources</em>
                        </h2>
                        <p className="approach-text">
                            We have our special functions that add to a business. We feel that these
                            special functions are part of HR and a piece of the success of a business.
                        </p>
                    </div>
                    <div className="row">
                        {/* Box 1: Compensation Consulting */}
                        <div className="col-xl">
                            <div className="approach-box">
                                <div className="approach-icon">
                                    <Image src={consultantImage} width={50} height={50} alt="Compensation Consulting" />
                                </div>
                                <div className="approach-icon-content">
                                    <h2 className="approach-ihbox-heading">Compensation Consulting</h2>
                                    <div className="approach-ihbox-text">
                                        Compensation Consulting always helps companies with marketing and customer growth.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Box 2: Leadership Training */}
                        <div className="col-xl">
                            <div className="approach-box">
                                <div className="approach-icon">
                                    <Image src={leadershipImage} width={50} height={50} alt="Leadership Training" />
                                </div>
                                <div className="approach-icon-content">
                                    <h2 className="approach-ihbox-heading">Leadership Training</h2>
                                    <div className="approach-ihbox-text">
                                        Leadership Training always helps companies with marketing and customer growth.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Box 3: Corporate Programs */}
                        <div className="col-xl">
                            <div className="approach-box-last">
                                <div className="approach-icon">
                                    <Image src={consultationImage} width={50} height={50} alt="Corporate Programs" />
                                </div>
                                <div className="approach-icon-content">
                                    <h2 className="approach-ihbox-heading">Corporate Programs</h2>
                                    <div className="approach-ihbox-text">
                                        Corporate Programs always help companies with marketing and customer growth.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="about-footer">
              <div className="about-footer-inner">
                <div className="container">
                    <div className="row about-footer-row">
                        <div className="col-md-12">
                            <h3 className="about-footer-content">
                            Call adviser for Emphires HR outsourcing service business
                            </h3>
                            <div className="cta-icon">
                                    <Image className="icon-img" src={ctaicon2Image} alt=""></Image>
                                </div>
                        </div>
                        <div className="col-md-3">
                            <div className="about-button">
                                <Link href="/contact" className="abt-btn">Contact Us Now</Link>
                            </div>
                        </div>
                    </div>
                </div>

              </div>
            </footer>
        </div>
    );
}