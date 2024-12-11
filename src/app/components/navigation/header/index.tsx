'use client'
import React from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
 

const Header = () => {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("token")
        router.push('/'); // Replace '/media-list' with the actual list page path
    }
    return(
        <div className="justify-center flex border-solid border-b-[1px] h-[50px] items-center hidden md:flex">
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
                href="/signin">
                <div className="ml-12">signin</div>
            </Link>
            <Link
                className=""
                href="/signup">
                <div className="ml-12">signup</div>
            </Link>
            <Link
                className=""
                href="/user">
                <div className="ml-12">user</div>
            </Link>
            <div 
                className="ml-12"
            >
                <button onClick={logout}>
                    logout
                </button>
            </div>
        </div>
    )

}
export default Header;