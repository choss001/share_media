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
                <div className="flex justify-center text-xs text-black">main</div>
            </Link>
            <div className="border-r-[1px] border-gray w-0 h-[1rem]"/>
            <Link
                className="flex-auto"
                href="/signin">
                <div className="flex justify-center text-xs text-black">signin</div>
            </Link>
            <div className="border-r-[1px] border-gray w-0 h-[1rem]"/>
            <Link
                className="flex-auto"
                href="/services">
                <div className="flex justify-center text-xs text-black">services</div>
            </Link>
            <div className="border-r-[1px] border-gray w-0 h-[1rem]"/>
            <Link
                className="flex-auto"
                href="/test">
                <div className="flex justify-center text-xs text-black">upload</div>
            </Link>
            <div className="border-r-[1px] border-gray w-0 h-[1rem]"/>
            <Link
                className="flex-auto"
                href="/topic">
                <div className="flex justify-center text-xs text-black">diary</div>
            </Link>
            <div className="border-r-[1px] border-gray w-0 h-[1rem]"/>
            <Link
                className="flex-auto"
                href="/llm">
                <div className="flex justify-center text-xs text-black">chat with ai</div>
            </Link>
        </div>
    )

}
export default HeaderMobile;