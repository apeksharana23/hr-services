import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import project01Image from "../img/project01.webp"; 
import project02Image from "../img/project02.jpg"; 
import project03Image from "../img/project03.jpg"; 
import project04Image from "../img/project04.jpg"; 
import project05Image from "../img/project05.jpg"; 
import testimonial01Image from "../img/testimonial01.jpg"; 
import quotationImage from "../img/quotation.png"; 


export default function Section8() {
    return (
        <div className="section-eight">
            <div className="container-fluid">
                <div className="section-slider">
                    <div className="slider-inner">
                        {/* Slider Item 1 */}
                        <div className="slider-1">
                            <div className="slider-1-inner">
                                <div className="slider-1-img-text">
                                    <div className="img-wrapper">
                                        <Image src={project01Image} width={500} height={300} alt="Project 1" />
                                    </div>
                                    <div className="text-icon-wrapper">
                                        <div className="text-icon-wrapper-inner">
                                            <div className="icon-wrapper">

                                                <Link href="#" className="icon-wrapper-box">
                                                    <FontAwesomeIcon icon={faPlus} width="15" height="30" />
                                                </Link>

                                            </div>
                                            <div className="text-wrapper">
                                                <div className="text-wrapper-upper">
                                                    <Link href="#">Increase Leads</Link>
                                                </div>
                                                <h3 className="text-wrapper-lower">
                                                    <Link href="#">Packard Consulting</Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slider Item 2 */}
                        <div className="slider-1">
                            <div className="slider-1-inner">
                                <div className="slider-1-img-text">
                                    <div className="img-wrapper">
                                        <Image src={project02Image} width={500} height={300} alt="Project 2" />
                                    </div>
                                    <div className="text-icon-wrapper">
                                        <div className="text-icon-wrapper-inner">
                                            <div className="icon-wrapper">
                                                <Link href="#" className="icon-wrapper-box">
                                                    <FontAwesomeIcon icon={faPlus} width="15" height="30" />
                                                </Link>
                                            </div>
                                            <div className="text-wrapper">
                                                <div className="text-wrapper-upper">
                                                    <Link href="#">Chief Executive</Link>
                                                </div>
                                                <h3 className="text-wrapper-lower">
                                                    <Link href="#">Consulting Project</Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slider Item 3 */}
                        <div className="slider-1">
                            <div className="slider-1-inner">
                                <div className="slider-1-img-text">
                                    <div className="img-wrapper">
                                        <Image src={project03Image} width={500} height={300} alt="Project 3" />
                                    </div>
                                    <div className="text-icon-wrapper">
                                        <div className="text-icon-wrapper-inner">
                                            <div className="icon-wrapper">
                                                <Link href="#" className="icon-wrapper-box">
                                                    <FontAwesomeIcon icon={faPlus} width="15" height="30" />
                                                </Link>
                                            </div>
                                            <div className="text-wrapper">
                                                <div className="text-wrapper-upper">
                                                    <Link href="#">Increase Leads</Link>
                                                </div>
                                                <h3 className="text-wrapper-lower">
                                                    <Link href="#">Lead Generations</Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slider Item 4 */}
                        <div className="slider-1">
                            <div className="slider-1-inner">
                                <div className="slider-1-img-text">
                                    <div className="img-wrapper">
                                        <Image src={project04Image} width={500} height={300} alt="Project 4" />
                                    </div>
                                    <div className="text-icon-wrapper">
                                        <div className="text-icon-wrapper-inner">
                                            <div className="icon-wrapper">
                                                <Link href="#" className="icon-wrapper-box">
                                                    <FontAwesomeIcon icon={faPlus} width="15" height="30" />
                                                </Link>
                                            </div>
                                            <div className="text-wrapper">
                                                <div className="text-wrapper-upper">
                                                    <Link href="#">Marketing Expert</Link>
                                                </div>
                                                <h3 className="text-wrapper-lower">
                                                    <Link href="#">Marketing Strategy</Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slider Item 5 */}
                        <div className="slider-1">
                            <div className="slider-1-inner">
                                <div className="slider-1-img-text">
                                    <div className="img-wrapper">
                                        <Image src={project05Image} width={500} height={300} alt="Project 5" />
                                    </div>
                                    <div className="text-icon-wrapper">
                                        <div className="text-icon-wrapper-inner">
                                            <div className="icon-wrapper">
                                                <Link href="#" className="icon-wrapper-box">
                                                    <FontAwesomeIcon icon={faPlus} width="15" height="30" />
                                                </Link>
                                            </div>
                                            <div className="text-wrapper">
                                                <div className="text-wrapper-upper">
                                                    <Link href="#">Build Effective</Link>
                                                </div>
                                                <h3 className="text-wrapper-lower">
                                                    <Link href="#">Employee Insights</Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="testinomial-section">
                    <div className="container">
                        <div className="row align-item-center">
                            {/* Left Column */}
                            <div className="col-xl-5">
                                <div className="testinomial-section-heading">
                                    <h4 className="testinomial-first-heading">OUR TESTIMONIAL</h4>
                                    <h2 className="testinomial-second-heading">
                                        What employees say about
                                        <em> human resources</em>
                                    </h2>
                                </div>
                                <div className="testinomial-text">
                                    We have introduced the value that our functions bring. We feel that this specialist part of Human Resources contributes to digital marketing.
                                </div>
                                <Link href="#" className="testinomial-link">

                                    <span className="link-btn">View All Testimonials</span>
                                    <i className="fa-solid fa-arrow-right-long arrow"></i>

                                </Link>
                            </div>

                            {/* Right Column */}
                            <div className="col-xl-7">
                                <div className="testinomial-slider">
                                    <div className="testinomial-slider-wrapper">
                                        {/* Testimonial Item */}
                                        <div className="slider-1-testinomial">
                                            <div className="slider-1-inner-testinomial">
                                                <div className="slider-1-box">
                                                    <div className="slider-1-box-content">
                                                        <div className="slider-1-box-content-img">
                                                            <div className="slider-1-img">
                                                                <Image src={testimonial01Image} width={100} height={100} alt="Testimonial 1" />
                                                            </div>
                                                        </div>
                                                        <div className="slider-1-box-content-text">
                                                            <div className="text-upper">
                                                                <blockquote className="quote-text">
                                                                    <p>
                                                                        HR Adviser responded quickly to questions and worked with us to find the most expert employees for our company. These guys are the best advisers and have helped us many times.
                                                                    </p>
                                                                </blockquote>
                                                            </div>
                                                            <div className="text-lower">
                                                                <div className="text-lower-detail">
                                                                    <h3 className="pbminfotech-box-title">Jasica Lenon</h3>
                                                                    - <span className="pbmit-designation">Manager</span>
                                                                </div>
                                                                <div className="text-lower-icon">
                                                                    <Image src={quotationImage} width={30} height={30} alt="Quotation" />
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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