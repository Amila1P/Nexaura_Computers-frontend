import { useState } from "react";  
import getFormattedPrice from "../utils/priceFormat.js";
import { getCartTotal } from "../utils/cart.js";
import { toast } from "react-hot-toast";
import api from "../utils/api.js";
import axios from "axios";

export default function CreateOrderModel(props) {
    const [isModelOpen, setIsModelOpen] = useState(false);
    
    /*firstName : user.firstName,
        lastName : user.lastName,
        addressLineOne : req.body.addressLineOne,
        addressLineTwo : req.body.addressLineTwo,
        city : req.body.city,
        state : req.body.state,
        postalCode : req.body.postalCode,
        phone : req.body.phone,
        country : req.body.country,*/
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
        
    const cart = props.cart;

    async function createOrder() {
        try{
            const token = localStorage.getItem("token");
            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                country,
                items : [] 
            }


            for(let i=0; i<cart.length; i++){
                const item = cart[i]
                data.items.push({
                    productId : item.product.productId,
                    quantity : item.quantity
                })
            }
            await axios.post(import.meta.env.VITE_API_URL + "/orders", data, {
                headers : {
                    "Authorization" : "Bearer " + token
                }
            })

            toast.success("Order placed successfully");
            setIsModelOpen(false);

        }catch(error){
            const errorMessage = error.response?.data?.message || "Failed to place order";
            toast.error(errorMessage);
        }
    }
    
       return (
          <>
            
             <div className="w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                <p className="text-lg font-semibold text-gray-800">
                    Total: {getFormattedPrice(getCartTotal(cart))}
                </p>
                    <button className="bg-accent text-white px-4 py-2 rounded-lg font-semibold" onClick={() => setIsModelOpen(true)}>Order Now</button>
            </div>

            {isModelOpen && (
                <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
                    <div className="relative z-[10000] w-[420px] max-h-[90vh] overflow-auto bg-white rounded-xl p-6 flex flex-col gap-3 shadow-xl pointer-events-auto">
                        <h2 className="text-xl font-semibold text-gray-800 text-center">Shipping Details</h2>
                        <div className="flex flex-col gap-2">
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="Address Line 1" value={addressLineOne} onChange={(e) => setAddressLineOne(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="Address Line 2" value={addressLineTwo} onChange={(e) => setAddressLineTwo(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0" />
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold" onClick={() => setIsModelOpen(false)}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold" onClick={()=>{
                                if(!firstName || !lastName || !addressLineOne || !city || !state || !postalCode || !phone || !country){
                                    toast.error("Please fill all the required fields");
                                    return;
                                }else{
                                    createOrder();
                                }
                            }}>Place Order</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}