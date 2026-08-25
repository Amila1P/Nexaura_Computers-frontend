import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import UserData from "./userData.jsx";


export default function BottomNavigationBar({ user, setUser }){
    return(
        <div className = "flex lg:hidden fixed bottom-0 w-full h-[80px] bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] justify-evenly py-2">
            <Link to="/" className = "h-full aspect-square flex flex-col text-accent shadow-2xl shadow-accent text-3xl items-center justify-center">
                <GoHome className="text-3xl text-gray-500 hover:text-gray-300"/>
            </Link>
            <Link to="/search" className = "h-full aspect-square flex flex-col text-accent shadow-2xl shadow-accent text-3xl items-center justify-center">
                <CiSearch className="text-3xl text-gray-500 hover:text-gray-300"/>
            </Link>
            <Link to="/cart" className = "h-full aspect-square flex flex-col text-accent shadow-2xl shadow-accent text-3xl items-center justify-center">
                <CiShoppingCart className="text-3xl text-gray-500 hover:text-gray-300"/>
            </Link>
            <UserData user={user} setUser={setUser}/>
        </div>
    )
}