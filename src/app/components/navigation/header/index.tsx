'use clinet';
import React from "react";
import Link from "next/link";
 

const Header = () => {
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
        </div>
    )

}
export default Header;