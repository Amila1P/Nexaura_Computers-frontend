import { FaEyeSlash, FaHome, FaPhone } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import getFormattedPrice from "../utils/priceFormat.js";

export default function OrderDetailsModal({order, refresh}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    //const product = props.product;
    //const refresh = props.refresh;


    return(

        <>
            <FaEyeSlash className = "text-blue-600 text-2xl cursor-pointer hover:text-blue-800" 
                onClick = {
                    ()=>{
                        setIsModalOpen(true)
                    }
                }
            />
            {
                isModalOpen&&
                <div className = "w-screen h-screen fixed bg-black/40 top-0 left-0 flex justify-center items-center text-black z-99">
                    <div className="w-[800px] bg-white rounded-lg flex flex-col justify-center items-center gap-4 p-4 relative">

                        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-700 cursor-pointer" onClick={()=>setIsModalOpen(false)}>X</button>

                        <div className="w-full flex flex-col items-center">
                            <h2 className="text-lg font-semibold">Order Details</h2>
                            <div className="w-full flex items-center text-sm text-gray-600"><span className="inline-block rounded-md bg-gray-200 px-2 py-1">{order.orderId}</span>
                                <div className="text-sm text-gray-600 italic ml-2">{order.email}</div>
                                <div className="text-gray-600 flex justify-center items-center gap-2 ml-10"><FaPhone/>{order.phone}</div>
                            </div>
                            <div className="w-full flex justify-between items-center mt-2">
                                <div className="flex justify-center items-center gap-2">
                                    <FaHome/>
                                    <span className="text-lg text-gray-800"><span className="font-semibold">{order.firstName} {order.lastName}</span>, {order.addressLineOne}, {order.addressLineTwo}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[400px] flex flex-col items-center gap-4 overflow-y-scroll">
                            {
                                order.items.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex items-center gap-2">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                                <div className="flex-shrink-0 flex flex-col justify-between">
                                                    <h3 className="text-sm font-semibold">{item.name}</h3>
                                                    <span className="text-xs text-gray-500">Quantity: {item.quantity}</span>
                                                    <span className="text-xs text-gray-500">Price: {getFormattedPrice(item.price)}</span>
                                                    <span className="text-xs text-gray-500">Total: {getFormattedPrice(item.price * item.quantity)}</span>
                                                </div>
                                        </div>  
                                    </div>
                                ))
                            }
                        </div>

                        <div className = "w-full justify-end items-center bg-gray-100 rounded-lg p-4 m-2">
                            <span className="text-lg font-semibold text-gray-800">Total: {getFormattedPrice(order.total)}</span>
                        </div>
                        
                    </div>
                </div>
            }
        </> 
    )
}