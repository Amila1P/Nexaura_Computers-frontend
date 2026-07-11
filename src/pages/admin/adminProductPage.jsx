import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductPage() {

    const [products ,setProducts] = useState([]);
 
    useEffect(()=>{
      //backend api
      const token = localStorage.getItem("token")

      axios.get(import.meta.env.VITE_API_URL + "/products", {
        headers:{
          "Authorization": "Bearer " + token
        }
      }).then(
        (response)=>{
          setProducts(response.data);
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      )
      }, []
    )

    return (
        <div className = "w-full h-full ">

            {/*
                products.map(
                    (item)=>{
                        console.log(item);
                        return <p key={item.productId}>
                            {item.productId}
                        </p>
                    }
                )
            */}


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
                                        <td className = "text-center border border-primary p-4">{item.productId}</td>
                                        <td className = "text-center border border-primary p-4">{item.name}</td>
                                        <td className = "text-center border border-primary p-4">{item.price}</td>
                                        <td className = "text-center border border-primary p-4">{item.labelledPrice}</td>
                                        <td className = "text-center border border-primary p-4">{item.brand}</td>
                                        <td className = "text-center border border-primary p-4">{item.model}</td>
                                        <td className = "text-center border border-primary p-4">{item.category}</td>
                                        <td className = "text-center border border-primary p-4">{item.availability ? 'In Stock' : 'Out of Stock'}</td>
                                        <td className = "text-center border border-primary p-4">{item.stock}</td>
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