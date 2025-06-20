'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logosidebarImage from "../img/logosidebar.svg"; // Adjust the path based on your project structure
import phoneImage from "../img/phone-ringing.png"; // Adjust the path based on your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'; // Import faArrowUp from solid icons
import { usePathname } from 'next/navigation';
import mailImage from "../img/mail.png";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/" ? true : false;

  return isHomePage ? (
    <div className="section-nine">
      <div className="footer-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="column-1">
                <p className="footer-logo  ">
                  <Image src={logosidebarImage} alt="Logo" className="logo-sidebar" width="30" height="30" />
                </p>
                <p className="footer-column-text">
                  HR Advisers carry out your company HR service needs by
                  providing training and managing the HR department company.
                  Our consultants provide HR outsourcing and inclusive services.
                </p>

                <h2 className="widget-title">FOLLOW US ON</h2>
                <ul className="pbmit-social-links">
                  <li className="pbmit-social-li pbmit-social-facebook">
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <span>
                        <FontAwesomeIcon icon={faSquareFacebook} width="15" height="30" />
                      </span>
                    </Link>
                  </li>
                  <li className="pbmit-social-li pbmit-social-twitter">
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <span>
                        <FontAwesomeIcon icon={faXTwitter} width="15" height="30" />
                      </span>
                    </Link>
                  </li>
                  <li className="pbmit-social-li pbmit-social-linkedin">
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <span>
                        <FontAwesomeIcon icon={faLinkedin} width="15" height="30" />
                      </span>
                    </Link>
                  </li>
                  <li className="pbmit-social-li pbmit-social-instagram">
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <span>
                        <FontAwesomeIcon icon={faInstagram} width="15" height="30" />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="column-2">
                <h2 className="column-2-title">SMART HR™</h2>
                <div className="footer-support">
                  <h5 className="footer-support-inner">
                    <span>Our Email </span>
                    <br />
                    info@smarthr.com
                  </h5>
                  <div className="call-logo">
                    <Image src={mailImage} width="30" height="30" alt="Phone" />
                  </div>
                </div>
                <br></br>
                <div className="footer-support">
                  <h5 className="footer-support-inner">
                    <span>Talk To Our Support </span>
                    <br />
                    +1 002-123-4567
                  </h5>
                  <div className="call-logo">
                    <Image src={phoneImage} width="30" height="30" alt="Phone" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="footer-3">
        <div className="container">
          <div className="footer-bottom-area">
            <div className="row">
              <div className="col-md-6">
                <p>
                  Copyright © 2022 <span>Emphires</span> All Rights Reserved.
                </p>
              </div>
              <div className=" col-md-6">
                <ul className="footer-menu">
                  <li className="menu-item">
                    <Link href="#">Privacy &amp; Policy</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="#">Conditions</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="#">Refund Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Link className="scroll-area" href="#">
            <FontAwesomeIcon icon={faArrowUp} width="15" height="40" />
          </Link>
        </div>
      </div>
    </div>
  ) : <></>;
};

export default Footer;