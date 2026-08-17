import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";
import ProductDeleteModal from "../../components/ProductDeleteModal.jsx";
import getFormattedPrice from "../../utils/priceFormat.js";

export default function AdminOrdersPage() {

    const [orders ,setOrders] = useState([]);
    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false)
 
    useEffect(()=>{
        if(! isOrdersAreLoaded){
            const token = localStorage.getItem("token")

            axios.get(import.meta.env.VITE_API_URL + "/orders/10/1", {
                headers:{
                "Authorization": "Bearer " + token
                }
            }).then(
                (response)=>{
                setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
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
                </>
            ) : (
                <LoadingAnimation />
            )}
        </div>
    );
}
