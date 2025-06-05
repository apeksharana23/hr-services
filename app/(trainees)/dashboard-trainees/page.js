"use client";

import React, { useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconCalendarShare, IconTableRow, IconUsersGroup, IconMoneybag, IconChecklist, IconUserCog } from '@tabler/icons-react';
import { AuthContext } from '@/app/providers/authprovider';

export default function DashboardTrainee() {
    const { isLoggedIn, trainee, traineeToken } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn || !traineeToken) {
            router.push('/join-us-sign-in');
        }
    }, [isLoggedIn, traineeToken, router]);

    return (
        <div className="page-wrapper bg-colorr">
            <div className="content-wrapper">
                <h1 className="page-title">Dashboard</h1>
                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a className="home1" href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page"><a className="home1" href="/dashboard-trainee">Dashboard</a></li>
                    </ol>
                </nav>
                {isLoggedIn && trainee && (
                    <div className="card welcome-back">
                        <div className="welcome-back-inner">
                            <div className="welcome-back-left d-flex align-items-center">
                                <span className="avatar">
                                    <Image
                                        src={trainee.profileImage || "/Uploads/1745930609700_man-user.jpg"}
                                        alt="User Avatar"
                                        width={30}
                                        height={30}
                                        className="rounded-circle object-cover"
                                    />
                                </span>
                                <div className="ms-3">
                                    <h3 className="mb-2">Welcome, {trainee.name}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}