import { useState } from "react";
import { getCart } from "../utils/cart.js";
import getFormattedPrice from "../utils/priceFormat.js";
import {getCartTotal} from "../utils/cart.js";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    return (
        <div className="w-full h-full overflow-y-auto bg-white p-6 pb-40">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

            <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 ">

                {
                    cart.map(
                        (item) => {
                            return (
                                <div
                                    key={item.product.productId}
                                    className="w-full min-h-44 bg-white flex items-center rounded-xl border border-gray-200 px-6 py-5 shadow-sm"
                                >

                                    {/* Product Image */}
                                    <div className="w-40 h-32 flex items-center justify-center shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.productName}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 h-full flex flex-col justify-center pl-6 gap-1">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {item.product.productName}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {item.product.productId}
                                        </p>

                                        <p className="text-lg font-semibold text-gray-700 mt-1">
                                            {getFormattedPrice(item.product.price)}
                                        </p>

                                        {/* Remove Button */}
                                        <button
                                            className="text-sm text-red-500 hover:text-red-700 font-medium w-fit mt-2"
                                            onClick={() => {
                                                const updatedCart = cart.filter(
                                                    cartItem =>
                                                        cartItem.product.productId !==
                                                        item.product.productId
                                                );

                                                setCart(updatedCart);

                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify(updatedCart)
                                                );
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex flex-col items-center justify-center gap-3 px-6">

                                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">

                                            {/* Minus Button */}
                                            <button
                                                className="w-10 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-lg"
                                                onClick={() => {

                                                    if (item.quantity <= 1) {
                                                        return;
                                                    }

                                                    const updatedCart = cart.map(
                                                        cartItem => {
                                                            if (
                                                                cartItem.product.productId ===
                                                                item.product.productId
                                                            ) {
                                                                return {
                                                                    ...cartItem,
                                                                    quantity: cartItem.quantity - 1
                                                                };
                                                            }

                                                            return cartItem;
                                                        }
                                                    );

                                                    setCart(updatedCart);

                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify(updatedCart)
                                                    );
                                                }}
                                            >
                                                -
                                            </button>

                                            {/* Quantity */}
                                            <span className="w-10 h-9 flex items-center justify-center text-gray-700 font-medium">
                                                {item.quantity}
                                            </span>

                                            {/* Plus Button */}
                                            <button
                                                className="w-10 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-lg"
                                                onClick={() => {

                                                    const updatedCart = cart.map(
                                                        cartItem => {
                                                            if (
                                                                cartItem.product.productId ===
                                                                item.product.productId
                                                            ) {
                                                                return {
                                                                    ...cartItem,
                                                                    quantity: cartItem.quantity + 1
                                                                };
                                                            }

                                                            return cartItem;
                                                        }
                                                    );

                                                    setCart(updatedCart);

                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify(updatedCart)
                                                    );
                                                }}
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>

                                    {/* Total */}
                                    <div className="w-44 flex items-center justify-end pl-4">
                                        <p className="text-xl font-semibold text-gray-800">
                                            {getFormattedPrice(
                                                item.product.price * item.quantity
                                            )}
                                        </p>
                                    </div>

                                </div>
                            );
                        }
                    )
                }

                <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                    <div className="w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-800">Total: {getFormattedPrice(getCartTotal(cart))}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Checkout
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}