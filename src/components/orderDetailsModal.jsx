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

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                style={{
                    background: "rgba(79,142,247,0.1)",
                    color: "#4F8EF7",
                    border: "1px solid rgba(79,142,247,0.25)",
                    cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(79,142,247,0.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(79,142,247,0.1)"; }}
                title="View Order Details"
                aria-label="View Order Details"
            >
                <FaEyeSlash className="text-base" />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 animate-fade-in">
                    <div
                        className="w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
                        style={{
                            background: "#0F1623",
                            border: "1px solid #1E2D45",
                            maxHeight: "90vh",
                        }}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-4 right-4 text-[#7A8BA3] hover:text-[#E8EDF5] p-2 rounded-xl transition-colors cursor-pointer z-10" 
                            style={{ background: "rgba(30,45,69,0.6)" }}
                            onClick={() => setIsModalOpen(false)}
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header section (Order Info) */}
                        <div className="px-6 py-5 flex flex-col gap-4 border-b shrink-0" style={{ background: "#151D2E", borderColor: "#1E2D45" }}>
                            <div>
                                <h2 className="text-2xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                    Order #{order.orderId}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-semibold"
                                        style={{ background: "rgba(79,142,247,0.15)", color: "#4F8EF7", border: "1px solid rgba(79,142,247,0.3)" }}>
                                        {order.email}
                                    </span>
                                    <span className="text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5"
                                        style={{ background: "#1C2740", color: "#E8EDF5", border: "1px solid #1E2D45" }}>
                                        <FaPhone className="text-xs" style={{ color: "#7A8BA3" }} /> 
                                        {order.phone}
                                    </span>
                                    <span className="text-xs px-2.5 py-1 rounded-md"
                                        style={{ background: "#1C2740", color: "#7A8BA3", border: "1px solid #1E2D45" }}>
                                        {new Date(order.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex p-3.5 rounded-xl items-start gap-3"
                                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                                <div className="mt-0.5 shrink-0" style={{ color: "#4F8EF7" }}>
                                    <FaHome size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#7A8BA3" }}>
                                        Delivery Address
                                    </span>
                                    <span className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>
                                        {order.firstName} {order.lastName}
                                    </span>
                                    <span className="text-xs mt-0.5" style={{ color: "#7A8BA3" }}>
                                        {order.addressLineOne}{order.addressLineTwo ? `, ${order.addressLineTwo}` : ""}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Body section (Items List) */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-3" style={{ background: "#080C14" }}>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>
                                    Purchased Items ({order.items?.length || 0})
                                </h3>
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                    style={{ background: "rgba(79,142,247,0.12)", color: "#4F8EF7" }}>
                                    Status: {order.status}
                                </span>
                            </div>

                            {order.items?.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3.5 rounded-xl transition-all"
                                    style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                                    {/* Item Image */}
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-16 h-16 object-cover rounded-lg shrink-0" 
                                        style={{ background: "#151D2E", border: "1px solid #1E2D45" }}
                                    />
                                    
                                    {/* Item Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate" style={{ color: "#E8EDF5" }}>
                                            {item.name}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: "#7A8BA3" }}>
                                            <span>Qty: <strong style={{ color: "#E8EDF5" }}>{item.quantity}</strong></span>
                                            <span>Unit Price: <strong style={{ color: "#E8EDF5" }}>{getFormattedPrice(item.price)}</strong></span>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right pl-4 shrink-0" style={{ borderLeft: "1px solid #1E2D45" }}>
                                        <div className="text-[10px] uppercase font-bold" style={{ color: "#7A8BA3" }}>Line Total</div>
                                        <div className="text-sm font-bold mt-0.5" style={{ color: "#10B981" }}>
                                            {getFormattedPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {order.notes && (
                                <div className="p-3.5 rounded-xl mt-3 text-xs"
                                    style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                                    <p className="font-bold mb-1" style={{ color: "#F59E0B" }}>Customer / Order Notes:</p>
                                    <p style={{ color: "#E8EDF5" }}>{order.notes}</p>
                                </div>
                            )}
                        </div>

                        {/* Grand Total Bar */}
                        <div className="px-6 py-4 flex justify-between items-center border-t shrink-0"
                            style={{ background: "#151D2E", borderColor: "#1E2D45" }}>
                            <span className="text-sm font-medium" style={{ color: "#7A8BA3" }}>Grand Total</span>
                            <span className="text-2xl font-black" style={{ color: "#10B981", fontFamily: "'Outfit', sans-serif" }}>
                                {getFormattedPrice(order.total)}
                            </span>
                        </div>

                        {/* Edit Section Footer */}
                        <div className="px-6 py-4 border-t flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 shrink-0"
                            style={{ background: "#0F1623", borderColor: "#1E2D45" }}>
                            <div className="flex-1 flex flex-col">
                                <label className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Admin Notes
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none transition-colors"
                                    rows="2"
                                    style={{
                                        background: "#151D2E",
                                        border: "1px solid #1E2D45",
                                        color: "#E8EDF5",
                                    }}
                                    placeholder="Add an internal note..."
                                    value={notes} 
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Order Status
                                    </label>
                                    <select
                                        className="px-3 py-2 rounded-xl text-sm outline-none cursor-pointer"
                                        style={{
                                            background: "#151D2E",
                                            border: "1px solid #1E2D45",
                                            color: "#E8EDF5",
                                        }}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <button
                                    className="btn-primary text-sm px-5 py-2.5 mt-auto"
                                    onClick={() => updateOrder()}
                                    disabled={isUpdating}
                                    style={{ opacity: isUpdating ? 0.7 : 1 }}
                                > 
                                    {isUpdating ? "Updating..." : "Update Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}