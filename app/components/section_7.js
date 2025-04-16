
import Image from "next/image";

import consultantImage from "../img/consultant.png"; 
import leadershipImage from "../img/leadership.png"; 
import consultationImage from "../img/consultation.png"; 

export default function Section7() {
    return(
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
    );
}