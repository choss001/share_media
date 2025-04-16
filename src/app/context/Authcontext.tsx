'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the context
interface AuthContextProps {
    isAuthenticated: boolean;
    setAuthenticated: (auth: boolean) => void;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provide the context to your application
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Check for the token in cookie when the app loads
        const checkAuth = async (): Promise<void> => {
            try {
                const checkAuth = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/test/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (checkAuth.ok)
                    setAuthenticated(true);
                
                if (checkAuth.status === 401 || checkAuth.status === 502)
                    setAuthenticated(false);
            } catch (error) {
                setAuthenticated(false);
                console.log(error);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
