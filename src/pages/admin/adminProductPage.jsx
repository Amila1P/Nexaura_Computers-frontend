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

            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>ProductId</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Labelled Price</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Category</th>
                        <th>Availability</th>
                        <th>Stock</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(
                            (item)=>{
                                return(
                                    <tr key={item.productId}>
                                        <td>
                                            <img src={item.images?.[0] || "/placeholder.png"} alt={item.name} width="80" />
                                        </td>
                                        <td>{item.productId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.labelledPrice}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.model}</td>
                                        <td>{item.category}</td>
                                        <td></td>
                                        <td>{item.stock}</td>
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