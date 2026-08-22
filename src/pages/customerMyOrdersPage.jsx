import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/LoadingAnimation.jsx";
import getFormattedPrice from "../utils/priceFormat.js";
import CustomerOrderDetailsModal from "../components/customerOrderDetailsModal.jsx";

export default function CustomerOrderPage() {

    const [orders ,setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false)
 
    useEffect(()=>{
        if(! isOrdersAreLoaded){
            const token = localStorage.getItem("token")

            axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize+"/" +currentPage, {
                headers:{
                "Authorization": "Bearer " + token
                }
            }).then(
                (response)=>{
                    console.log("API Response Data:", response.data);
                const receivedOrders = Array.isArray(response.data.orders)
                    ? response.data.orders
                    : Array.isArray(response.data)
                        ? response.data
                        : [];

                setOrders(receivedOrders);
                setTotalPages(response.data.totalPages || 1);
                setTotalOrders(response.data.total || response.data.totalOrders || receivedOrders.length || 0);
                setIsOrdersAreLoaded(true)
                }
            ).catch(
                (error)=>{
                console.log(error);
                }
            )
        }
      
      }, [isOrdersAreLoaded]
    )

    return (
        <div className="w-full h-full min-h-screen bg-[#0F0F12] text-gray-200 overflow-y-auto p-6">
            {/* Header Area */}
            <div className="sticky top-0 z-10 w-full h-[80px] rounded-2xl bg-[#2A2D3E]/80 backdrop-blur-xl border border-[#2A2D3E] text-white flex items-center px-8 justify-between shadow-2xl mb-6"> 
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6]"></div>
                    <h1 className="text-2xl font-bold tracking-wide uppercase">My Orders</h1>
                </div>
            </div>

            {/* Total Orders Summary */}
            <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-sm font-medium text-gray-400">
                    Total Orders: <span className="text-[#8B5CF6] font-bold text-base ml-1">{totalOrders}</span>
                </span>
            </div>

            {isOrdersAreLoaded ? (
                <>
                    {/* Table Container */}
                    <div className="w-full overflow-x-auto rounded-2xl border border-[#2A2D3E] bg-[#2A2D3E]/40 backdrop-blur-md shadow-2xl">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="bg-[#2A2D3E] text-xs uppercase tracking-wider text-gray-300 border-b border-[#0F0F12]">
                                <tr>
                                    <th className="text-center p-4">Order Id</th>
                                    <th className="text-center p-4">Email</th>
                                    <th className="text-center p-4">First Name</th>
                                    <th className="text-center p-4">Last Name</th>
                                    <th className="text-center p-4">Phone</th>
                                    <th className="text-center p-4">Date</th>
                                    <th className="text-center p-4">Total</th>
                                    <th className="text-center p-4">Status</th>
                                    <th className="text-center p-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#2A2D3E]/60">
                                {Array.isArray(orders) && orders.map((item) => {
                                    return (
                                        <tr className="bg-[#0F0F12]/60 hover:bg-[#2A2D3E]/80 transition-colors duration-200" key={item.orderId}>
                                            <td className="text-center font-mono text-xs text-[#8B5CF6] p-4">{item.orderId}</td>
                                            <td className="text-center p-4 text-gray-300">{item.email}</td>
                                            <td className="text-center p-4">{item.firstName}</td>
                                            <td className="text-center p-4">{item.lastName}</td>
                                            <td className="text-center p-4 text-gray-400">{item.phone}</td>
                                            <td className="text-center p-4 text-gray-400 text-xs">{item.date}</td>
                                            <td className="text-center p-4">
                                                <span className="font-bold text-white">{getFormattedPrice(item.total)}</span>
                                            </td>
                                            <td className="text-center p-4">
                                                <span className="inline-block rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#8B5CF6] px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="text-center p-4">
                                                <CustomerOrderDetailsModal order={item} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && (
                        <div className="text-center py-16 bg-[#2A2D3E]/20 rounded-2xl border border-[#2A2D3E] mt-4">
                            <p className="text-gray-400 font-medium">No orders found.</p>
                        </div>
                    )}
                    
                    {/* Pagination Controls */}
                    <div className="w-full flex flex-col sm:flex-row justify-end items-center gap-4 mt-6 px-2">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => {
                                    if(currentPage > 1){
                                        setCurrentPage(currentPage - 1);
                                        setIsOrdersAreLoaded(false);
                                    }
                                }}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-[#2A2D3E] text-gray-200 rounded-xl hover:bg-[#8B5CF6] hover:text-white disabled:opacity-40 disabled:hover:bg-[#2A2D3E] disabled:hover:text-gray-200 transition-all duration-200 text-xs font-semibold"
                            >
                                Previous
                            </button>
                            <span className="text-xs text-gray-400 font-medium">
                                Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
                            </span>
                            <button 
                                onClick={() => {
                                    setCurrentPage(currentPage + 1);
                                    setIsOrdersAreLoaded(false);
                                }}
                                disabled={currentPage >= totalPages}
                                className="px-4 py-2 bg-[#2A2D3E] text-gray-200 rounded-xl hover:bg-[#8B5CF6] hover:text-white disabled:opacity-40 disabled:hover:bg-[#2A2D3E] disabled:hover:text-gray-200 transition-all duration-200 text-xs font-semibold"
                            >
                                Next
                            </button>
                        </div>

                        <select
                            value={pageSize}
                            onChange={(e)=>{
                                setPageSize(parseInt(e.target.value));
                                setIsOrdersAreLoaded(false);
                            }}
                            className="bg-[#2A2D3E] border border-[#2A2D3E] text-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
                        >
                            <option value={2}>2 per page</option>
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center min-h-[400px]">
                    <LoadingAnimation />
                </div>
            )}
        </div>
    );
}