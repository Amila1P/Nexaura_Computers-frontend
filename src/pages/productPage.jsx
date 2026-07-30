import { useState, useEffect } from "react";
import axios from "axios";

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
                    <div key={item.id} className="w-[300px] h-[400px] border rounded-2xl">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                    </div>
                )
               })
            }
        </div>
    )
}