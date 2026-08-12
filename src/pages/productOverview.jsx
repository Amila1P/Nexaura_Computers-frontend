import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import api from "../utils/api";
import {toast} from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation.jsx";
import ImageSlideShow from "../components/imageSlideShow.jsx";
import getFormattedPrice from "../utils/priceFormat.js";
import { addToCart, getCart } from "../utils/cart.js";

export default function ProductOverviewPage(){

    const parameters = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(()=>{
        api.get("/products/"+parameters.productId).then((response)=>{
            setProduct(response.data);
            setStatus("success");
        }).catch((error)=>{
            toast.error("Error fetching product details");
            setStatus("error");
        });
    }, []);

    return(
        <div className = "w-full h-full flex items-center justify-center">
            {
                status == "loading" && <LoadingAnimation/>
            }
            {
                status == "error" && <div className = "w-full h-[300px] flex flex-col items-center justify-centergap-4">
                    <h1 className = "text-2xl font-bold">Failed to load product details.</h1>
                    <Link to="/products" className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back to Products
                    </Link>
                </div>
            }
            {
                status == "success" && <div className = "w-full h-full flex">
                    <div className="w-1/2 h-full flex justify-center">
                        <ImageSlideShow images={product.images} />
                    </div>
                    <div className="w-1/2 h-full flex flex-col p-5">
                        <h1 className = "text-3xl font-bold mb-4">{product.name}
                            {
                                product.altNames.map(
                                    (altName, index) => {
                                        return(
                                            <span key={index} className = "font-normal text-gray-500"> | {altName}</span>
                                        )
                                    }
                                )
                            }
                        </h1>
                        <h2 className = " text-sm text-gray-500 mt-5">{product.productId}</h2>
                        <div className = "flex flex-col gap-2 mt-5">
                            <p className = "text-accent font-semibold text-4xl">
                                {
                                    getFormattedPrice(product.price)
                                }
                            </p>
                            {
                                product.labelledPrice > product.price && 
                                <span className = "text-gray-500 line-through text-xl">
                                    {getFormattedPrice(product.labelledPrice)}
                                    </span>
                            }
                        </div>
                       
                        <div className = "flex gap-2 mt-5">
                            <span className = "text-gray-500">Brand:</span>
                            <span className = "text-gray-700 font-semibold">{product.brand}</span>
                        </div>
                        <div className = "flex gap-2 mt-2">
                            <span className = "text-gray-500">Model:</span>
                            <span className = "text-gray-700 font-semibold">{product.model}</span>
                        </div>

                        <div className = "flex gap-2 mt-5">
                            <span className = "text-gray-500">Category:</span>
                            <span className = "text-gray-700 font-semibold">{product.category}</span>
                        </div>

                        <p className = "text-lg mt-5">
                            {
                                product.description
                            }
                        </p>
                        <div className = "flex gap-4 mt-5">
                            <button className = "bg-blue-500 hover:bg-blue-700 transition-color duration-200 text-white font-bold py-2 px-4 rounded mt-5" onClick = {
                                ()=>{
                                    addToCart(product, 1);
                                    console.log(getCart());
                                }
                            }>
                                Add to Cart
                            </button>
                            <button className = "bg-green-500 hover:bg-green-700 transition-color duration-200 text-white font-bold py-2 px-4 rounded mt-5" onClick={
                                ()=>{
                                    localStorage.removeItem("cart");
                                    console.log(getCart());
                                }
                            }>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
} 