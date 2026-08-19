import { FaEyeSlash, FaHome, FaPhone } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import getFormattedPrice from "../utils/priceFormat.js";
import api from "../utils/api.js";

export default function OrderDetailsModal({order, refresh}){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState(order.notes);
    const [status, setStatus] = useState(order.status);
    const [isUpdating, setIsUpdating] = useState(false);

    //const product = props.product;
    //const refresh = props.refresh;

    async function updateOrder(){
        const token = localStorage.getItem('token');
        setIsUpdating(true);
        try{
            await api.put(`/orders/` + order.orderId, {
                status: status,
                notes: notes
            }, {
                headers:{
                "Authorization": "Bearer " + token
                }
            })
            toast.success("Order updated successfully");
            refresh();
            setIsUpdating(false);
            
        }catch(error){
            console.error("Error updating order:", error);
            toast.error("Error updating order");
            setIsUpdating(false);
        }

    }

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
                <div className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
                        
                        {/* Close Button */}
                        <button 
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer z-10" 
                            onClick={() => setIsModalOpen(false)}
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header section (Order Info) */}
                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-5 flex flex-col gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                        ID: {order.orderId}
                                    </span>
                                    <span className="text-sm text-gray-600 bg-gray-200/50 px-2.5 py-1 rounded-md">
                                        {order.email}
                                    </span>
                                    <span className="text-sm text-gray-600 bg-gray-200/50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                                        <FaPhone className="text-gray-400 text-xs" /> 
                                        {order.phone}
                                    </span>
                                </div>
                            </div>

                            <div className="flex bg-white p-3 rounded-lg border border-gray-200/60 shadow-sm items-start gap-3">
                                <div className="mt-1 text-gray-400">
                                    <FaHome size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Shipping Address</span>
                                    <span className="text-gray-800">
                                        <span className="font-semibold text-gray-900">{order.firstName} {order.lastName}</span>
                                        <span className="mx-2 text-gray-300">|</span> 
                                        {order.addressLineOne}, {order.addressLineTwo}
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="w-full flex gap-3 items-center mt-2 pb-2 ml-6" >
                            <span className="text-gray-600">Order Date: {new Date(order.date).toLocaleDateString()}</span>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                                Status: {order.status}
                            </span>

                        </div>
                        <div className="w-full flex gap-3 items-center mt-2 pb-2 ml-6" >
                            <p className="text-gray-800 font-semibold">Order Notes: </p>
                            <p className="text-gray-600">{order.notes}</p>
                        </div>


                        {/* Body section (Items List) */}
                        <div className="flex-1 overflow-y-auto max-h-[20vh] p-6 bg-gray-50/50">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Purchased Items</h3>
                            <div className="flex flex-col gap-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        {/* Item Image */}
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-20 h-20 object-cover rounded-lg border border-gray-100 bg-gray-50" 
                                        />
                                        
                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h3 className="text-base font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span>Qty: <span className="font-medium text-gray-700">{item.quantity}</span></span>
                                                <span>Price: <span className="font-medium text-gray-700">{getFormattedPrice(item.price)}</span></span>
                                            </div>
                                        </div>

                                        {/* Item Total */}
                                        <div className="text-right pl-4 border-l border-gray-100">
                                            <div className="text-xs text-gray-400 mb-1">Total</div>
                                            <div className="text-sm font-bold text-gray-800">
                                                {getFormattedPrice(item.price * item.quantity)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer section (Total) */}
                        <div className="border-t border-gray-200 bg-white px-6 py-5 flex justify-between items-center rounded-b-2xl">
                                                        
                            <div className="flex items-center gap-4">
                                <span className="text-lg font-medium text-gray-500">Grand Total</span>
                                <span className="text-3xl font-extrabold text-gray-900">
                                    {getFormattedPrice(order.total)}
                                </span>
                            </div>
                            
                        </div>

                        <div className="border-t border-gray-200 bg-white px-6 py-5 flex justify-between items-center rounded-b-2xl">
                            <div className="w-1/2 flex flex-col">
                                <label className="text-sm font-medium text-gray-500">Edit Notes</label>
                                <textarea className="w-full px-3 py-1 bg-gray-200 text-gray-700 rounded" 
                                    type="text" placeholder="Add a note..." value={notes} 
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex flex-col ">
                                <label className="text-sm font-medium text-gray-500">Edit Status</label>
                                <select className="px-3 py-1 bg-gray-200 text-gray-700 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => updateOrder()} disabled={isUpdating}> 
                                {isUpdating ? "Updating..." : "Update"}
                            </button>
                        </div>
                        
                    </div>
                </div>
            }
        </> 
    )
}