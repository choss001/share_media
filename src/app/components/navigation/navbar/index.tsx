import Logo from "./Logo";
import Link from "next/link";
import Button from "./Button";
 
const Navbar = () =>{
    return (
        <>
            <div className="px-3 w-full h-20 sticky top-0 border-slate-200 border-solid border-b-[1px]">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo />
                        <ul className="hidden md:flex gap-x-6 text-white">
                            <li>
                                <Link href="/about">
                                    <p>About Us</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    <p>Services</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts">
                                    <p>Contacts</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/media">
                                    <p>Media</p>
                                </Link>
                            </li>
                        </ul>
                        <Button />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Navbar;