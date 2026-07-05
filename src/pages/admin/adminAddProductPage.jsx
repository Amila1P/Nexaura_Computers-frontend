import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import uploadMedia from '/src/utils/mediaUpload.js';
 

export default function AdminAddProductPage() {
    
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();


    // productId
    // name
    // altNames
    // price
    // labelledPrice
    // description
    // images
    // brand
    // model
    // category
    // isAvailable
    // stock

    async function handleSave(){
        try{

            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be logged in to perform this action.");
                window.location.href = "/login";
                return;
            }

            const mediaUploadPromises = []

            for(let i=0; i<images.length; i++){

                mediaUploadPromises.push(uploadMedia(images[i]));

            }

            const urls = await Promise.all(mediaUploadPromises);
            const altNamesArray = altNames.split(", ") 

            const productData = {
                productId :productId,
                name : name,
                altNames : altNamesArray,
                price :price,
                labelledPrice : labelledPrice,
                description : description,
                images : urls,
                brand : brand,
                model : model,
                category : category,
                isAvailable : isAvailable,
                stock : stock
            }

            await axios.post(import.meta.env.VITE_API_URL+"/products", productData,
                {
                    headers :{
                        "Authorization" : "Bearer "+token
                    }
                }
            )

            toast.success("Product added successfully.");
            navigate("/admin/products");

        }catch(error){
            toast.error(error?.response?.data?.message || "Failed to add product. Please try again.")
            console.log("error adding product", error)
        }
    }

    return (
        <div className = "w-full h-full flex flex-col items-center p-4 overflow-y-auto">
            <div className = "sticky top-0 w-full h-[100px] rounded-lg bg-accent text-white flex items-center p-5 justify-between shadow-2xl"> 
                
                <h1 className = "text-2xl font-semibold">Add Product</h1>
                <div className = "h-full flex justify-center items-center">
                    <button onClick={handleSave} className = "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Save</button>
                    <button className = "bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600">Cancel</button>
                </div>

                

            </div>

            <div className="w-full flex flex-wrap pt-5 pb-5 bg-white shadow-2xl p-5 mt-8 rounded-lg">
                    <div className = "w-1/4  p-2">
                        <label className = "block font-semibold mb-2">Product ID:</label>
                        <input className = "border border-gray-300 rounded-md p-2 w-full"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>
                    <div className = "w-3/4 p-2">
                        <label className = "block font-semibold mb-2">Name:</label>
                        <input className = "border border-gray-300 rounded-md p-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className = "w-full p-2">
                        <label className = "block font-semibold mb-2">Alternative Names:</label>
                        <input className="border border-gray-300 rounded-md p-2 w-full"
                            value={altNames}
                            onChange={(e) => setAltNames(e.target.value)}
                        />
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className = "block font-semibold mb-2">Price:</label>
                        <input className="border border-gray-300 rounded-md p-2 w-full"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className = "block font-semibold mb-2">Labelled Price:</label>
                        <input className="border border-gray-300 rounded-md p-2 w-full"
                            value={labelledPrice}
                            onChange={(e) => setLabelledPrice(e.target.value)}
                        />
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className = "block font-semibold mb-2">Category:</label>
                        <select onChange={(e) => setCategory(e.target.value)} value={category}  className = "border border-gray-300 rounded-md p-2 w-full" >
                            <option value="Laptop">Laptop</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Smartphone">Smartphone</option>
                            <option value="Camera">Camera</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className = "block font-semibold mb-2">Images:</label>
                        <input type ="file" multiple className = "border border-gray-300 rounded-md p-2 w-full"
                            onChange = {(e)=>setImages(e.target.files)} 
                        />  
                    </div>
                    <div className = "w-full p-2">
                        <label className ="block font-semibold mb-2">Description: </label>
                        <textarea className = "border border-gray-300 rounded-md p-2 w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}    
                        />
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className ="block font-semibold mb-2">Brand: </label>

                        <select 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)} 
                            className = "border border-gray-300 rounded-md p-2 w-full">
                            <option value="Apple">Apple</option>
                            <option value="Samsung">Samsung</option>
                            <option value="Dell">Dell</option>
                            <option value="HP">HP</option>
                            <option value="Lenovo">Lenovo</option>
                            <option value="Asus">Asus</option>
                            <option value="Acer">Acer</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className ="block font-semibold mb-2">Model:</label>
                        <input className = "border border-gray-300 rounded-md p-2 w-full"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className ="block font-semibold mb-2">Stock:</label>
                        <input className = "border border-gray-300 rounded-md p-2 w-full"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(parseInt(e.target.value))}
                        />
                    </div>
                    <div className = "w-1/4 p-2">
                        <label className ="block font-semibold mb-2">Availability</label>
                        <select
                            value={isAvailable} 
                            onChange={(e) => setAvailability(e.target.value)} 
                            className = "border border-gray-300 rounded-md p-2 w-full">
                            <option className = "bg-green-600 text-white font-semibold" value={true}>Available</option>
                            <option className = "bg-red-600 text-white font-semibold" value={false}>Not Available</option>
                        </select>
                    </div>

            </div>

        </div>
    )
}