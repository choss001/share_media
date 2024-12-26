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
        // Check for the token in localStorage when the app loads
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
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
