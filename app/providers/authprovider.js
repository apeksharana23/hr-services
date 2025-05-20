"use client";

import { createContext, useState, useEffect } from 'react';
import { getCookie } from 'cookies-next/client';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getCookie('token');
            if (!token) {
                setIsLoggedIn(false);
                setUser(null);
                return;
            }

            const response = await fetch('/api/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.status) {
                setIsLoggedIn(true);
                setUser(data.user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }

        fetchUser();
    }, []);
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}