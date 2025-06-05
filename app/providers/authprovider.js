"use client";

import { createContext, useState, useEffect } from 'react';
import { getCookie } from 'cookies-next/client';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [trainee, setTrainee] = useState(null);
    const [token, setToken] = useState(null);
    const [traineeToken, setTraineeToken] = useState(null);

    const fetchUser = async () => {
        const userToken = getCookie('token');
        setToken(userToken);
        if (!userToken) {
            setUser(null);
            return;
        }

        try {
            const response = await fetch('/api/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            });
            const data = await response.json();
            if (data.status && data.user) {
                setUser(data.user);
                setIsLoggedIn(true);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
    };

    const fetchTrainee = async () => {
        const traineeToken = getCookie('trainee_token');
        setTraineeToken(traineeToken);
        if (!traineeToken) {
            setTrainee(null);
            return;
        }

        try {
            const response = await fetch('/api/trainee-me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${traineeToken}`,
                },
            });
            const data = await response.json();
            if (data.status && data.trainee) {
                setTrainee({
                    id: data.trainee._id,
                    name: `${data.trainee.firstName} ${data.trainee.lastName}`,
                    firstName: data.trainee.firstName,
                    lastName: data.trainee.lastName,
                    email: data.trainee.email,
                    contactNo: data.trainee.contactNo,
                    profileImage: data.trainee.profileImage,
                });
                setIsLoggedIn(true);
            } else {
                setTrainee(null);
            }
        } catch {
            setTrainee(null);
        }
    };


    const refreshAuth = async () => {
        await Promise.all([fetchUser(), fetchTrainee()]);
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn, user, trainee, token, traineeToken,
            setIsLoggedIn, setUser, setTrainee, setToken, setTraineeToken,
            refreshAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}
