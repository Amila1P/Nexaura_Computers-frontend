import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductDeleteModal({product, refresh}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    //const product = props.product;
    //const refresh = props.refresh;

    function handleDelete(){
        const token = localStorage.getItem("token");
        axios.delete(
            import.meta.env.VITE_API_URL + "/products/" + product.productId,
            {
                headers: {
                    'Authorization': "Bearer " + token
                },
            }
        ).then(
            () => {
                toast.success("Product deleted successfully");
                setIsModalOpen(false);
                refresh();
            }
        ).catch(
            (error) => {
                toast.error("Failed to delete product");
                console.log(error);
            }
        );
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                style={{
                    background: "rgba(240,78,55,0.1)",
                    color: "#F04E37",
                    border: "1px solid rgba(240,78,55,0.25)",
                    cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(240,78,55,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(240,78,55,0.1)"; }}
                title="Delete product"
                aria-label="Delete product"
            >
                <TbTrash className="text-base" />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div
                        className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
                        style={{
                            background: "#151D2E",
                            border: "1px solid #1E2D45",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                        }}
                    >
                        <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                            style={{ background: "rgba(240,78,55,0.12)", border: "1px solid rgba(240,78,55,0.3)" }}>
                            <TbTrash className="text-2xl" style={{ color: "#F04E37" }} />
                        </div>

                        <h3 className="text-lg font-bold text-center mb-2" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Delete Product?
                        </h3>
                        <p className="text-sm text-center mb-6" style={{ color: "#7A8BA3" }}>
                            Are you sure you want to delete <span className="font-semibold text-white">"{product.name}"</span>? This action cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                                style={{
                                    background: "rgba(30,45,69,0.7)",
                                    color: "#E8EDF5",
                                    border: "1px solid #1E2D45",
                                }}
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                                style={{
                                    background: "linear-gradient(135deg, #F04E37, #DC2626)",
                                    color: "#FFFFFF",
                                    boxShadow: "0 4px 14px rgba(240,78,55,0.35)",
                                }}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}