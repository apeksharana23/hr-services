'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import emailImage from "../img/email.png"; // Adjust the path based on your project structure
import locationImage from "../img/location.png"; // Adjust the path based on your project structure
import chatImage from "../img/chat.png"; // Adjust the path based on your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/" ? true : false;

  return isHomePage ? (
    <div className="section-one">
      <div className="top-header">
        <div className="container-1 main">
          <div className="top-header-left">
            <div className="left-img">
              <h3><Image src={emailImage} width="30" height="30" alt="Email" />
                <p>Email Address : info@smarthr.com</p>
              </h3>
            </div>
            <div className="right-img">
              <h3><Image src={locationImage} width="30" height="30" alt="Location" />
                <p>Office Address : 12 Tottina, NY, USA</p>
              </h3>
            </div>
          </div>
          <div className="top-header-right">
            <div className="left-img-1">
              <Link href="#">
                <FontAwesomeIcon icon={faSquareFacebook} width="15" height="30" />
              </Link>
              <Link href="#">
                <FontAwesomeIcon icon={faXTwitter} width="15" height="30" />
              </Link>
              <Link href="#">
                <FontAwesomeIcon icon={faInstagram} width="16" height="30" />
              </Link>
              <Link href="#">
                <FontAwesomeIcon icon={faLinkedin} width="15" height="30" />
              </Link>
            </div>
            <div className="right-img-1">
              <Link href="#">
                <FontAwesomeIcon icon={faMagnifyingGlass} width="15" height="30" />
              </Link>
            </div>
            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className="header">
        <nav>
          <div className="logo">Smart HR</div>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-us">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/join-us-sign-in">Join Us</Link>
            </li>
          </ul>
          <div className="col-md-3 register-hr">
            <div className="about-button"><a className="abt-btn bg-chnge-1" href="/sign-up">Register as Hr</a>
            </div>
          </div>

        </nav>
      </div>
    </div>
  ) : <></>
}

export default Header;