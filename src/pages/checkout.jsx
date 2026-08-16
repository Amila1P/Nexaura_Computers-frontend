import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getCart, getCartTotal } from "../utils/cart.js";
import getFormattedPrice from "../utils/priceFormat.js";
import CreateOrderModel from "../components/createOrderModel.jsx";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state);

    return (
        <div className="w-full h-full overflow-y-auto bg-white p-6 pb-40">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

            <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
                {cart.map((item) => {
                    return (
                        <div
                            key={item.product.productId}
                            className="w-full min-h-44 bg-white flex items-center rounded-xl border border-gray-200 px-6 py-5 shadow-sm"
                        >
                            <div className="w-40 h-32 flex items-center justify-center shrink-0">
                                <img
                                    src={item.product.image}
                                    alt={item.product.productName}
                                    className="w-full h-full object-contain"
                                />
                            </div>

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

                            <div className="flex flex-col items-center justify-center gap-3 px-6">
                                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                                    <button
                                        className="w-10 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-lg"
                                        onClick={() => {
                                            if (item.quantity <= 1) {
                                                return;
                                            }

                                            const updatedCart = cart.map(cartItem => {
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
                                            });

                                            setCart(updatedCart);

                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify(updatedCart)
                                            );
                                        }}
                                    >
                                        -
                                    </button>

                                    <span className="w-10 h-9 flex items-center justify-center text-gray-700 font-medium">
                                        {item.quantity}
                                    </span>

                                    <button
                                        className="w-10 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-lg"
                                        onClick={() => {
                                            const updatedCart = cart.map(cartItem => {
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
                                            });

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

                            <div className="w-44 flex items-center justify-end pl-4">
                                <p className="text-xl font-semibold text-gray-800">
                                    {getFormattedPrice(
                                        item.product.price * item.quantity
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}

                <CreateOrderModel cart={cart} />
            </div>
        </div>
    )
}