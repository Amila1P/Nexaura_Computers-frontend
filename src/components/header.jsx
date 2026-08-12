import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";

export default function Header() {
    return (
        <header className = " w-full h-[100px] bg-accent relative flex items-center justify-center shadow-2xl">
            <Link className= "w-[200px] h-full absolute left-10 flex items-center justify-center">
                <img src="/NexAura Logo.png" alt="Logo" className=" h-[60px] mr-2"/>
            </Link>
            <div className="h-full w-[300px] flex items-center justify-center gap-10">
                    <Link to="/" className= "text-white hover:text-gray-300">Home</Link>
                    <Link to="/products" className= "text-white hover:text-gray-300">Products</Link>
                    <Link to="/contact-us" className= "text-white hover:text-gray-300">Contact Us</Link>
                </div>
                <Link to="/cart" className= "text-white hover:text-gray-300">
                    <BiCart className="text-white text-3xl hover:text-gray-300" />
                </Link>
        </header>
    )
}