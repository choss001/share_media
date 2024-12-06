'use clinet';
import React from "react";
import Link from "next/link";
 

const HeaderMobile = () => {
    return(
        <div className="border-solid border-b-[1px] h-[50px] justify-center items-center flex md:hidden">
            <Link
                className="flex-auto"
                href="/">
                <div className="flex justify-center">main</div>
            </Link>
            <Link
                className="flex-auto"
                href="/services">
                <div className="flex justify-center">services</div>
            </Link>
            <Link
                className="flex-auto"
                href="/test">
                <div className="flex justify-center">upload</div>
            </Link>
            <Link
                className="flex-auto"
                href="/signin">
                <div className="flex justify-center">sign in</div>
            </Link>
        </div>
    )

}
export default HeaderMobile;