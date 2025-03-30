'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/Authcontext';

const Header = () => {
    const router = useRouter();
    const { isAuthenticated, setAuthenticated } = useAuth();

    const logout = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/auth/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        if (res.ok){
            alert('success');
        }

        setAuthenticated(false);
        router.push('/');
    };

    useEffect(() => {
        const fetchProfile = async (): Promise<void> => {
            try {
                const checkAuth = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/test/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                
                if (checkAuth.status === 401)
                    setAuthenticated(false);
            } catch (error) {
                setAuthenticated(false);
            }
        };

        fetchProfile();
    },);

    return (
        <div className="hidden md:flex border-b border-gray-300 h-[50px] bg-white fixed z-10 w-full items-center justify-center">
            <div className="w-[55em] flex">
                <div className='mr-auto'>
                    <Link href="https://github.com/choss001">
                        <div>성식이</div>
                    </Link>
                </div>
                <div className='ml-auto flex space-x-12'>
                    <Link href="/">
                        <div>Main</div>
                    </Link>
                    <Link href="/services">
                        <div>Services</div>
                    </Link>
                    {/* <Link href="/topic">
                        <div>Topic</div>
                    </Link> */}

                    <Link href="/test">
                        <div>Upload</div>
                    </Link>
                    {isAuthenticated ? (
                        <div className='flex space-x-12'>
                            <button onClick={logout} className="text-red-500">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/signin">
                            <div>Sign In</div>
                        </Link>
                    )}
                    {/* <Link href="/user">
                        <div>User</div>
                    </Link> */}
                    <Link href="/llm">
                        <div>Chat with AI</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
