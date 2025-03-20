'use clinet';
import React from "react";
import Link from "next/link";
 

const HeaderMobile = () => {
    return(
        <div className="border-solid border-b-[1px] fixed top-0 z-10 w-full
        h-[50px] justify-center items-center flex bg-white md:hidden">
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
            {/* <Link
                className="flex-auto"
                href="/test">
                <div className="flex justify-center">upload</div>
            </Link> */}
            <Link
                className="flex-auto"
                href="/llm">
                <div className="flex justify-center">chat with ai</div>
            </Link>
        </div>
    )

}
export default HeaderMobile;