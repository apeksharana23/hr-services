import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';



export default function ContactUs() {
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
                                        <Link href="/" class="home"><span>Home</span></Link>
                                    </span>
                                    <span className="sep">-</span>
                                    <span>
                                        <Link href="/contact" class="home"><span>Conatct Us</span></Link>
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
                                                <span><FontAwesomeIcon icon={faSquareFacebook} width="15"  height="30" /> </span>
                                            </Link>
                                        </li>
                                        <li class="pbmit-social-li pbmit-social-twitter ">
                                        <Link href="#" target="_blank" rel="noopener">
                                                <span><FontAwesomeIcon icon={faXTwitter} width="15"  height="30" /> </span>
                                            </Link>
                                        </li>
                                        <li class="pbmit-social-li pbmit-social-linkedin ">
                                        <Link href="#" target="_blank" rel="noopener">
                                                <span><FontAwesomeIcon icon={faInstagram} width="15"  height="30" /> </span>
                                            </Link>
                                        </li>
                                        <li class="pbmit-social-li pbmit-social-instagram ">
                                        <Link href="#" target="_blank" rel="noopener">
                                                <span><FontAwesomeIcon icon={faLinkedin} width="15"  height="30" /> </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className='contact-form'>
                                    <div className='row mb-3 g-3'>
                                    <div className='col-lg-6'>
                                    <input type="text" class="form-control-1" placeholder="Your Name" name="Your Name" />
                                    </div>
                                    <div className='col-lg-6'>
                                    <input type="email" class="form-control-1" placeholder="Email Address" name="Email Address"/> 
                                  </div>
                                    <div className='col-lg-6'>
                                    <input type="number" class="form-control-1" placeholder="Phone Number" name="Phone Number"/>
                                    </div>
                                    <div className='col-lg-6'>
                                    <input type="email" class="form-control-1" placeholder="Email Address" name="Email Address"/>
                                    </div>
                                    <div className='col-lg-12'>
                                    <textarea class="form-control-1" name="message" rows="5" placeholder="Write Message"></textarea>
                                    </div>
                                    <div className='col-lg-12'>
                                    <a href="#" class="message-btn">Send Message</a>
                                    </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}