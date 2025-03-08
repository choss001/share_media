'use client'
import React from "react";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useAuth } from "@/app/context/Authcontext";
 

const Header = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const { isAuthenticated, setAuthenticated } = useAuth();
    const logout = () => {
        localStorage.removeItem("token")
        setAuthenticated(false);
        router.push('/'); // Replace '/media-list' with the actual list page path
    }

    useEffect(() => {
        fetchProfile()
    }, [])
    const fetchProfile = async (): Promise<void> => {
        try{
            const token = localStorage.getItem("token");
            console.log(`token : ${token}`)
            if (!token) {
                console.error("No token found");
                //router.push("/");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/test/profile`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        
                    },
                }
            );
            console.log(`res : ${res.ok}, profile : ${profile}`)
            if (res.ok) {
                const json = await res.json()
                setProfile(json)
            } else {
                setAuthenticated(false)
            }

        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };
    // async function fetchProfile() {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/test/profile`,{
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //     if (res.ok){
    //         const json = await res.json()
    //         setProfile(json)
    //     }
    // }
    return(
        <div className="justify-center flex border-solid 
            border-b-[1px] h-[50px] items-center hidden md:flex bg-white">
            <Link
                href="https://github.com/choss001">
            <div>성식이</div>
            </Link>
            <Link
                className="ml-[500px]"
                href="/">
                <div className="ml-12">main</div>
            </Link>
            <Link
                className=""
                href="/services">
                <div className="ml-12">services</div>
            </Link>
            <Link
                className=""
                href="/test">
                <div className="ml-12">upload</div>
            </Link>
            <Link
                className=""
                href="/topic">
                <div className="ml-12">topic</div>
            </Link>
            {isAuthenticated ? 
                <div 
                    className="ml-12"
                >
                    <button onClick={logout}>
                        logout
                    </button>
                </div>
            : 
                <Link
                    className=""
                    href="/signin">
                    <div className="ml-12">signin</div>
                </Link> 
            }
            <Link
                className=""
                href="/user">
                <div className="ml-12">user</div>
            </Link>
        </div>
    )

}
export default Header;