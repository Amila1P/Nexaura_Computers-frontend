import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getCart, getCartTotal } from "../utils/cart.js";
import getFormattedPrice from "../utils/priceFormat.js";
import CreateOrderModel from "../components/createOrderModel.jsx";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state);

    return (
        <div className="w-full h-full overflow-y-auto bg-white p-4 sm:p-5 md:p-6 pb-40">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-5 sm:mb-6">
                Your Cart
            </h1>

            <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">

                {cart.map((item) => {
                    return (
                        <div
                            key={item.product.productId}
                            className="w-full min-h-44 bg-white flex flex-wrap lg:flex-nowrap items-center rounded-xl border border-gray-200 px-3 sm:px-5 lg:px-6 py-4 sm:py-5 shadow-sm"
                        >

                            <div className="w-24 sm:w-32 lg:w-40 h-24 sm:h-28 lg:h-32 flex items-center justify-center shrink-0">
                                <img
                                    src={item.product.image}
                                    alt={item.product.productName}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="flex-1 min-w-0 h-auto lg:h-full flex flex-col justify-center pl-3 sm:pl-5 lg:pl-6 gap-1 text-left">
                                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 break-words">
                                    {item.product.productName}
                                </h2>

                                <p className="text-xs sm:text-sm text-gray-500 break-words">
                                    {item.product.productId}
                                </p>

                                <div className="flex items-center justify-between lg:block mt-1 sm:mt-2">

                                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                                        {getFormattedPrice(item.product.price)}
                                    </p>

                                    <div className="flex lg:hidden items-center border border-gray-300 rounded-full overflow-hidden">

                                        <button
                                            className="w-8 sm:w-9 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-base sm:text-lg"
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

                                        <span className="w-8 sm:w-9 h-8 flex items-center justify-center text-gray-700 font-medium text-sm">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="w-8 sm:w-9 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-base sm:text-lg"
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

                                <button
                                    className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium w-fit mt-1"
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

                            <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-6">

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

                            <div className="w-full lg:w-44 flex items-center justify-center lg:justify-end pl-0 lg:pl-4 mt-3 lg:mt-0">
                                <p className="text-lg sm:text-xl font-semibold text-gray-800">
                                    {getFormattedPrice(
                                        item.product.price * item.quantity
                                    )}
                                </p>
                            </div>

                        </div>
                    );
                })}

                <div className="w-full mt-2 sm:mt-4">
                    <CreateOrderModel cart={cart} />
                </div>

            </div>
        </div>
    )
}