import { useState } from "react";
import { getCart } from "../utils/cart.js";
import getFormattedPrice from "../utils/priceFormat.js";

export default function CartPage(){
    const [cart, setCart] = useState(getCart());

    return(
        <div className = "w-full h-full flex items-center justify-center">
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key = {item.product.productId} className = "w-full h-75 bg-gray-50 flex flex-col items-center justify-center rounded-lg gap-4 border p-5">
                                <img src = {item.product.image} alt = {item.product.productName} className = "w-50 h-50 object-contain"/>
                                
                                <div className="h-full w-100 flex flex-col items-center justify-center gap-2">
                                    <h2 className = "text-xl font-bold">{item.product.productName}</h2>
                                    <p className = "text-md">{item.product.productId}</p>
                                    <p className = "text-lg">{getFormattedPrice(item.product.price)}</p>
                                    <p className = "text-md">Quantity: {item.quantity}</p>
                                    <div>
                                        <button className = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick = {()=>{
                                            const updatedCart = cart.filter(cartItem => cartItem.product.productId !== item.product.productId);
                                            setCart(updatedCart);
                                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                                        }}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}