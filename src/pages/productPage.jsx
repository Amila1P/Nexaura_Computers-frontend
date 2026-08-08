import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products")
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setIsLoading(false);
            });
    }, []); 

    if (isLoading) {
        return <div>Loading Products...</div>; 
    }

    return (
        <div className="w-full h-full border-[2px] flex justify-center flex-wrap">
            {
               products.map((item) => {
                return (
                    <ProductCard key={item.productId} product={item}/> 
                )
               })
            }
        </div>
    )
}