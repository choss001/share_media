'use clinet';
import Logo from "./Logo";
import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Button from "./Button";
 

const Header = () => {
    return(
        <div className="justify-center flex border-solid border-b-[1px] h-[50px] items-center">
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