import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import UserData from "./userData";

export default function Header({ user, setUser }) {
    return (
        <header className = "fixed top-0 left-0 z-50 w-full h-25 bg-accent flex items-center justify-center shadow-2xl">
            <Link to="/" className= "lg:w-[200px] h-full absolute lg:left-10 flex items-center justify-center">
                <img src="/NexAura Logo.png" alt="Logo" className="h-15 mr-2"/>
            </Link>
            <div className="h-full hidden lg:flex items-center justify-center gap-10">
                    <Link to="/" className= "text-white hover:text-gray-300">Home</Link>
                    <Link to="/products" className= "text-white hover:text-gray-300">Products</Link>
                    <Link to="/contact-us" className= "text-white hover:text-gray-300">Contact Us</Link>
                </div>
                <div className="h-[50px] hidden lg:flex absolute right-30 items-center justify-center gap-5">
                    <UserData user={user} setUser={setUser} />
                </div>
                <Link to="/cart" className= "w-[50px] h-[50px] absolute right-10 hidden lg:flex items-center justify-center text-white hover:text-gray-300">
                    <BiCart className="text-white text-3xl hover:text-gray-300" />
                </Link>
        </header>
    )
}
