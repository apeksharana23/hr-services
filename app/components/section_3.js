import Link from "next/link";
import Image from "next/image";


import rightarrowImage from "../img/rightarrow.png"; 
import newemployeeImage from "../img/newemployee.png"; 
import newattImage from "../img/newatt.png"; 
import newlwaveImage from "../img/newlwave.png"; 
import newfinImage from "../img/newfin.png"; 
import newdocImage from "../img/newdoc.png"; 
import newtrainImage from "../img/newtrain.png"; 


export default function Section3() {
    return(
        <div className="section-three">
        <div className="container">
          <div className="section-three-top">
            <div className="row new-width">
              {/* Box 1: Employee Management */}
              <div className="col-md-4">
                <div className="box-1">
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
              <div className="col-md-4 change-top">
                <div className="box-2">
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
              <div className="col-md-4 change-top">
                <div className="box-3">
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
                <div className="box-4">
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
                <div className="box-5">
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
                <div className="box-6">
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
         

    );
}