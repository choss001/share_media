'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/Authcontext';

const Header = () => {
    const router = useRouter();
    const { isAuthenticated, setAuthenticated } = useAuth();

    const logout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
        router.push('/');
    };

    useEffect(() => {
        const fetchProfile = async (): Promise<void> => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/test/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
                
                const json = await res.json();
                console.log(json);
            } catch (error) {
                console.error(error);
                setAuthenticated(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="hidden md:flex justify-center border-b border-gray-300 h-[50px] bg-white fixed z-10 w-full">
            <div className="flex items-center space-x-12">
                <Link href="https://github.com/choss001">
                    <div>성식이</div>
                </Link>
                <Link href="/">
                    <div>Main</div>
                </Link>
                <Link href="/services">
                    <div>Services</div>
                </Link>
                <Link href="/test">
                    <div>Upload</div>
                </Link>
                <Link href="/topic">
                    <div>Topic</div>
                </Link>
                {isAuthenticated ? (
                    <button onClick={logout} className="text-red-500">
                        Logout
                    </button>
                ) : (
                    <Link href="/signin">
                        <div>Sign In</div>
                    </Link>
                )}
                <Link href="/user">
                    <div>User</div>
                </Link>
                <Link href="/llm">
                    <div>LLM</div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
