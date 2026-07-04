import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";


export default function AdminProductPage() {
    return (
        <div className = "w-full h-full ">

            <Link to="/admin/add-products" className ="fixed bottom-8 right-16 w-[60px] h-[60px] bg-accent flex justify-center items-center text-white text-3xl rounded-full hover:bg-black hover:text-accent" >
                <FaPlus />
            </Link>
        </div>
    )}