import Link from "next/link";
import Image from "next/image";


import img01Image from "../img/img01.jpg"; 
import partnershipImage from "../img/partnership.png"; 
import customerCareImage from "../img/customercare.png";  

export default function Section4() {
    return(
        <div className="section-four">
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
                <div className="abt-us-box">
                  <div
                    className="circle-progressbar"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ "--value": 95 }}
                  ></div>
                  <div className="circle-text">
                    <div className="circle-text-number">
                      95
                      <sup>%</sup>
                    </div>
                    <span className="circle-title">Training Course</span>
                  </div>
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
    

    );
}