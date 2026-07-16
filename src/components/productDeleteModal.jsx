import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductDeleteModal({product, refresh}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    //const product = props.product;
    //const refresh = props.refresh;

    function handleDelete(){
        ()=>{
                    const token = localStorage.getItem("token")
                    axios.delete(
                        import.meta.env.VITE_API_URL+"/products/"+product.productId,
                        {
                            headers:{
                                'Authorization': "Bearer "+ token
                            },
                        }
                    ).then(
                        ()=>{
                            toast.success("Product delete successfully")
                            refresh()
                        }
                    ).catch(
                        (error)=>{
                            toast.error("Failed delete product")
                            console.log(error)
                        }
                    )
                }
    }


    return(

        <>
            <TbTrash className = "text-red-600 text-2xl cursor-pointer hover:text-red-800" 
                onClick = {
                    ()=>{
                        setIsModalOpen(true)
                    }
                }
            />
            {
                isModalOpen&&
                <div className = "w-screen h-screen fixed bg-black/40 top-0 left-0 flex justify-center items-center text-black ">
                    <div className="w-[500px] h-[200px] bg-white rounded-lg flex flex-col justify-center items-center gap-4 p-4">
                        <h1 className = "text-2xl font-semibold text-center">Are you sure you want to delete this product?</h1>
                        <div className="flex gap-4">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800" onClick={handleDelete}>
                                Delete
                            </button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
        </> 
    )
}