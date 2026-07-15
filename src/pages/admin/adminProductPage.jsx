import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

export default function AdminProductPage() {

    const [products ,setProducts] = useState([]);
    const [isProductAreLoaded, setIsProductAreLoaded] = useState(false)
 
    useEffect(()=>{
        if(! isProductAreLoaded){
            //backend api
            const token = localStorage.getItem("token")

            axios.get(import.meta.env.VITE_API_URL + "/products", {
                headers:{
                "Authorization": "Bearer " + token
                }
            }).then(
                (response)=>{
                setProducts(response.data);
                setIsProductAreLoaded(true)
                }
            ).catch(
                (error)=>{
                console.log(error);
                }
            )
        }
      
      }, [isProductAreLoaded]
    )

    return (
        <div className = "w-full h-full overflow-y-scroll p-5">

            <div className = "sticky top-0 w-full h-[100px] rounded-lg bg-accent text-white flex items-center p-5 justify-between shadow-2xl"> 
                <h1 className = "text-2xl font-semibold">Products</h1>
            </div>


            <table className="mt-5 w-full text-secondary">
                <thead className="bg-accent/45 text-white">
                    <tr>
                        <th className = "text-center border border-primary p-4">Image</th>
                        <th className = "text-center border border-primary p-4">ProductId</th>
                        <th className = "text-center border border-primary p-4">Name</th>
                        <th className = "text-center border border-primary p-4">Price</th>
                        <th className = "text-center border border-primary p-4">Labelled Price</th>
                        <th className = "text-center border border-primary p-4">Brand</th>
                        <th className = "text-center border border-primary p-4">Model</th>
                        <th className = "text-center border border-primary p-4">Category</th>
                        <th className = "text-center border border-primary p-4">Availability</th>
                        <th className = "text-center border border-primary p-4">Stock</th>
                        <th className = "text-center border border-primary p-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(
                            (item)=>{
                                return(
                                    <tr className="odd:bg-gray-200 even:bg-primary odd:text-black border-t-4 border-primary hover:bg-accent/45" key={item.productId}>
                                        <td className = "text-center border border-primary p-4 rounded-full">
                                            <img src={item.images?.[0] || "/placeholder.png"} alt={item.name} width="80" />
                                        </td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.productId}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.name}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.price}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.labelledPrice}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.brand}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.model}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.category}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.availability ? 'In Stock' : 'Out of Stock'}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">{item.stock}</td>
                                        <td className = "text-center text-wrap border border-primary p-2">
                                            <TbTrash className = "text-2xl text-red-500 cursor-pointer hover:text-red-700"
                                                onClick={
                                                    ()=>{
                                                        toast.success(item.productId)
                                                        const token = localStorage.getItem("token")
                                                        axios.delete(import.meta.env.VITE_API_URL+"/products/"+item.productId,{
                                                            headers:{
                                                                'Authorization': "Bearer "+ token
                                                            }
                                                        }).then(
                                                            ()=>{
                                                                toast.success("Product delete successfully")
                                                                setIsProductAreLoaded(false)
                                                            }
                                                        ).catch(
                                                            (error)=>{
                                                                toast.error("Failed delete product")
                                                                console.log(error)
                                                            }
                                                        )
                                                    }
                                                }
                                            />
                                            <BiEdit className = "text-2xl text-blue-500 cursor-pointer hover:text-blue-700 "/>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>


            <Link to="/admin/add-products" className ="fixed bottom-8 right-16 w-[60px] h-[60px] bg-accent flex justify-center items-center text-white text-3xl rounded-full hover:bg-black hover:text-accent" >
                <FaPlus />
            </Link>
        </div>
    )}