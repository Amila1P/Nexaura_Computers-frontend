import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import api from "../utils/api";
import {toast} from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation.jsx";
import ImageSlideShow from "../components/imageSlideShow.jsx";

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
                    <div className="w-1/2 h-full border flex justify-center">
                        <ImageSlideShow images={product.images} />
                    </div>
                    <div className="w-1/2 h-full border">
                    </div>
                </div>
            }
        </div>
    )
} 