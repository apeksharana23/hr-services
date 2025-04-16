"use client";
import Image from 'next/image';
import avatarImage from '@/app/img/avatar.jpg';
import { IconCalendarShare } from '@tabler/icons-react';
import { IconTableRow } from '@tabler/icons-react';
import { IconUsersGroup } from '@tabler/icons-react';
import { IconMoneybag } from '@tabler/icons-react';
import { IconChecklist } from '@tabler/icons-react';
import { IconUserCog } from '@tabler/icons-react';

export default function Dashboard() {
    return (
        <div className="page-wrapper bg-colorr">
            <div className="content-wrapper">
                <h1 className="page-title">Dashboard</h1>
                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a className="home1" href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page"><a className="home1" href="/dashboard">Dashboard</a></li>
                    </ol>
                </nav>
                <div className=" card welcome-back">
                    <div className="welcome-back-inner">
                        <div className="welcome-back-left">
                            <span className="avatar">
                                <Image src={avatarImage} alt="Avatar" width={30} height={30} />
                            </span>
                            <div className="ms-3">
								<h3 className="mb-2">Welcome Back, Adrian</h3>
								<p>You have <span className="text-primary text-decoration-underline">21</span> Pending Approvals &amp; <span className="text-primary text-decoration-underline">14</span> Leave Requests</p>
							</div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-primary mb-2">
                                        <IconCalendarShare stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                    <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-green mb-2">
                                        <IconTableRow stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                    <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-blue mb-2">
                                        <IconUsersGroup stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                    <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-pink mb-2">
                                        <IconChecklist stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                 

                    
                </div>
                <div className='row'>
                <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-purple mb-2">
                                        <IconMoneybag stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                    <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-red mb-2">
                                        <IconCalendarShare stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                    <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-parrot-green mb-2">
                                        <IconUsersGroup stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                    <div className='col-xxl-8 d-flex'>
                        <div className='row flex-fill'>
                        <div className="col-xl-4 width-chnge d-flex">
								<div className="card-1 flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-black mb-2">
                                        <IconUserCog stroke={1.5}  width={20} height={20}/>										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
										<a href="#" className="link-default">View Details</a>
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