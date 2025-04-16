import React from "react";
import Link from "next/link";
import Image from "next/image";

import rightarrowImage from "../../img/rightarrow.png";
import newemployeeImage from "../../img/newemployee.png";
import newattImage from "../../img/newatt.png";
import newlwaveImage from "../../img/newlwave.png";
import newfinImage from "../../img/newfin.png";
import newdocImage from "../../img/newdoc.png";
import newtrainImage from "../../img/newtrain.png";


export default function Service() {
  return (
    <div className="service-page-header-bg">
      <div className="service-page-header">
        <div className="container">
          <div className="service-page-header-content">
            <div className="service-page-header-inner">
              <div className="service-page-header-text">
                <div className="service-page-header-text-inner">
                  <h1 className="service-page-header-text-heading">Our Services</h1>
                </div>

              </div>
              <div className="service-page-breadcrumbs">
                <div className="service-page-breadcrumbs-inner">
                  <span>
                    <Link title="" href="/" class="home"><span>Home</span></Link>
                  </span>
                  <span class="sep">-</span>
                  <span>
                    <Link title="" href="/services" class="home"><span>Services</span></Link>
                  </span>
                  
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>


      <div className="service-page">
        <div className="container">
          <div className="service-box">
            <div className="row">
              {/* Box 1: Employee Management */}
              <div className="col-md-4">
                <div className="box-a">
                  <div className="inside-box">
                    <div className="inside-box-icon">
                      <div className="inside-box-img">
                        <Image src={newemployeeImage} width={50} height={50} alt="Employee Management" />
                      </div>
                    </div>
                    <div className="inside-box-content">
                      <h2 className="content-heading">Employee Management</h2>
                      <div className="content-text">
                        Effortlessly manage employee records and updates.
                      </div>
                    </div>
                    <div className="inside-box-btn">
                      <Link href="/services/service-1">
                        <Image src={rightarrowImage} width={20} height={20} alt="Arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Attendance Tracking */}
              <div className="col-md-4">
                <div className="box-b">
                  <div className="inside-box">
                    <div className="inside-box-icon">
                      <div className="inside-box-img">
                        <Image src={newattImage} width={50} height={50} alt="Attendance Tracking" />
                      </div>
                    </div>
                    <div className="inside-box-content">
                      <h2 className="content-heading">Attendance Tracking</h2>
                      <div className="content-text">
                        Track attendance, leaves, and overtime with precision.
                      </div>
                    </div>
                    <div className="inside-box-btn">
                      <Link href="/services/service-2">
                        <Image src={rightarrowImage} width={20} height={20} alt="Arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 3: Leave Management */}
              <div className="col-md-4">
                <div className="box-c">
                  <div className="inside-box">
                    <div className="inside-box-icon">
                      <div className="inside-box-img">
                        <Image src={newlwaveImage} width={50} height={50} alt="Leave Management" />
                      </div>
                    </div>
                    <div className="inside-box-content">
                      <h2 className="content-heading">Leave Management</h2>
                      <div className="content-text">
                        Simplify leave requests and approvals.
                      </div>
                    </div>
                    <div className="inside-box-btn">
                      <Link href="/services/service-3">
                        <Image src={rightarrowImage} width={20} height={20} alt="Arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Box 4: Payroll Management */}
              <div className="col-md-4">
                <div className="box-d">
                  <div className="inside-box">
                    <div className="inside-box-icon">
                      <div className="inside-box-img">
                        <Image src={newfinImage} width={50} height={50} alt="Payroll Management" />
                      </div>
                    </div>
                    <div className="inside-box-content">
                      <h2 className="content-heading">Payroll Management</h2>
                      <div className="content-text">
                        Automate payroll calculations and generate payslips seamlessly.
                      </div>
                    </div>
                    <div className="inside-box-btn">
                      <Link href="/services/service-4">
                        <Image src={rightarrowImage} width={20} height={20} alt="Arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 5: Document Management */}
              <div className="col-md-4">
                <div className="box-e">
                  <div className="inside-box">
                    <div className="inside-box-icon">
                      <div className="inside-box-img">
                        <Image src={newdocImage} width={50} height={50} alt="Document Management" />
                      </div>
                    </div>
                    <div className="inside-box-content">
                      <h2 className="content-heading">Document Management</h2>
                      <div className="content-text">
                        Securely store and organize HR documents.
                      </div>
                    </div>
                    <div className="inside-box-btn">
                      <Link href="/services/service-5">
                        <Image src={rightarrowImage} width={20} height={20} alt="Arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 6: Trainee Management */}
              <div className="col-md-4">
                <div className="box-f">
                  <div className="inside-box">
                    <div className="inside-box-icon">
                      <div className="inside-box-img">
                        <Image src={newtrainImage} width={50} height={50} alt="Trainee Management" />
                      </div>
                    </div>
                    <div className="inside-box-content">
                      <h2 className="content-heading">Trainee Management</h2>
                      <div className="content-text">
                        Onboard, track, and manage trainees efficiently.
                      </div>
                    </div>
                    <div className="inside-box-btn">
                      <Link href="/services/service-6">
                        <Image src={rightarrowImage} width={20} height={20} alt="Arrow" />
                      </Link>
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