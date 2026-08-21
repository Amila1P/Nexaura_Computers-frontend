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
        <div className="w-full h-full overflow-y-scroll p-5">
            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-accent text-white flex items-center p-5 justify-between shadow-2xl"> 
                <h1 className="text-2xl font-semibold">Orders</h1>
            </div>
            <div className="flex justify-between items-center mt-5">
                <span className="text-sm text-gray-600">Total Orders: <span className="font-semibold"> {totalOrders}</span></span>
            </div>

            {isOrdersAreLoaded ? (
                <>
                    <table className="mt-5 w-full text-secondary">
                        <thead className="bg-accent/45 text-white">
                            <tr>
                                <th className="text-center border border-primary p-4">Order Id</th>
                                <th className="text-center border border-primary p-4">Email</th>
                                <th className="text-center border border-primary p-4">First Name</th>
                                <th className="text-center border border-primary p-4">Last Name</th>
                                <th className="text-center border border-primary p-4">Phone</th>
                                <th className="text-center border border-primary p-4">Date</th>
                                <th className="text-center border border-primary p-4">Total</th>
                                <th className="text-center border border-primary p-4">Status</th>
                                <th className="text-center border border-primary p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(orders) && orders.map((item) => {
                                return (
                                    <tr className="odd:bg-gray-200 even:bg-primary odd:text-black border-t-4 border-primary hover:bg-accent/45" key={item.orderId}>
                                        <td className="text-center text-wrap border border-primary p-2">{item.orderId}</td>
                                        <td className="text-center text-wrap border border-primary p-2">{item.email}</td>
                                        <td className="text-center text-wrap border border-primary p-2">{item.firstName}</td>
                                        <td className="text-center text-wrap border border-primary p-2">{item.lastName}</td>
                                        <td className="text-center text-wrap border border-primary p-2">{item.phone}</td>
                                        <td className="text-center text-wrap border border-primary p-2">{item.date}</td>
                                        <td className="text-center text-wrap border border-primary p-2">
                                            <span className="font-semibold text-gray-800">{getFormattedPrice(item.total)}</span>
                                        </td>
                                        <td className="text-center text-wrap border border-primary p-2">
                                            <span className="inline-block rounded-full bg-accent text-white px-3 py-1 text-xs font-medium">{item.status}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <CustomerOrderDetailsModal order={item} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {orders.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No orders found.</p>
                        </div>
                    )}
                    
                    <div className="w-full flex justify-end items-center gap-3 mt-4">
                        <button onClick={
                            ()=>{
                                if(currentPage > 1){
                                    setCurrentPage(currentPage - 1);
                                    setIsOrdersAreLoaded(false);
                                }
                            }
                        }
                        className ="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200">
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                        <button onClick={
                            ()=>{
                                setCurrentPage(currentPage + 1);
                                setIsOrdersAreLoaded(false);
                            }
                        }
                        className ="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200">
                            Next
                        </button>

                        <select
                            value={pageSize}
                            onChange={(e)=>{
                                setPageSize(parseInt(e.target.value));
                                setIsOrdersAreLoaded(false);
                            }}
                            className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200">
                                <option value={2}>2</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                        </select>
                    </div>
                </>
                
            ) : (
                <LoadingAnimation />
            )}
        </div>
    );
}
