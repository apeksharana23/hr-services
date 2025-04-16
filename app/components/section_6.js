
import Image from "next/image";

import appointmentImage from "../img/appointment.jpg"; 

export default function Section6() {
    return(
        <div className="section-six">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    {/* Left Column */}
                    <div className="col-xl-6 appointment-section">
                      <div className="appointment-section-left">
                        <div className="appointment-heading">
                          <h4 className="first-heading">WHO WE ARE</h4>
                          <div className="newsletter">
                            Subscribe
                            <em className="black-highlight"> Newsletter</em>
                          </div>
                        </div>
                        <form action="#" method="POST">
                          <input className="section-five-input" type="text" placeholder="Your Name" required />
                          <input className="section-five-input" type="email" placeholder="Email address" required />
                          <textarea placeholder="Message" required></textarea>
                          <button className="button-click" type="submit" id="submit">SUBSCRIBE</button>
                        </form>
                      </div>
                    </div>
        
                    {/* Right Column */}
                    <div className="col-xl-6 appointment-section-rght">
                      <div className="section-rght-inner">
                        <div className="section-rght-inner-box">
                          <div className="inner-box-img">
                            <Image src={appointmentImage} width={500} height={300} alt="Appointment" />
                          </div>
                          <div className="inner-content-box">
                            <div className="inner-content-box-text">
                              <h4>100% SUCCESS</h4>
                            </div>
                          </div>
                        </div>
                        <div className="progress-bar1">
                          <span className="progress-label">Research Strategy</span>
                          <div className="progress-line">
                            <div className="w3-border">
                              <div className="w3-grey" style={{ height: "8px", width: "80%" }}></div>
                            </div>
                          </div>
                          <div className="progress-percentage">
                            <span>80%</span>
                          </div>
                        </div>
                        <div className="progress-bar1">
                          <span className="progress-label">Direct Marketing</span>
                          <div className="progress-line">
                            <div className="w3-border">
                              <div className="w3-grey" style={{ height: "8px", width: "70%" }}></div>
                            </div>
                          </div>
                          <div className="progress-percentage">
                            <span>70%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    );
}