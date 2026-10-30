import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { HiCube } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/loadingAnimation.jsx";
import ProductDeleteModal from "../../components/productDeleteModal.jsx";

export default function AdminProductPage() {

    /* ══ LOGIC — unchanged ══ */
    const [products,           setProducts]           = useState([]);
    const [isProductAreLoaded, setIsProductAreLoaded] = useState(false);

    useEffect(() => {
        if (!isProductAreLoaded) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_API_URL + "/products", {
                headers: { "Authorization": "Bearer " + token }
            }).then(response => {
                setProducts(Array.isArray(response.data) ? response.data : []);
                setIsProductAreLoaded(true);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [isProductAreLoaded]);
    /* ══ end LOGIC ══ */

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page header ── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)" }}>
                            <HiCube className="text-lg" style={{ color: "#4F8EF7" }} />
                        </div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Products
                        </h1>
                    </div>
                    <p className="text-sm pl-12" style={{ color: "#7A8BA3" }}>
                        {products.length} product{products.length !== 1 ? "s" : ""} in the catalogue
                    </p>
                </div>

                {/* Add product button */}
                <Link to="/admin/add-products" className="btn-primary text-sm gap-2">
                    <FaPlus className="text-sm" /> Add Product
                </Link>
            </div>

            {/* ── Content ── */}
            {isProductAreLoaded ? (
                <>
                    {/* Table card */}
                    <div className="rounded-2xl overflow-hidden"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ background: "#151D2E", borderBottom: "1px solid #1E2D45" }}>
                                        {["", "ID", "Name", "Category", "Brand", "Price", "Stock", "Status", "Actions"].map(h => (
                                            <th key={h}
                                                className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                                                style={{ color: "#7A8BA3" }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(products) && products.map((item, idx) => (
                                        <tr
                                            key={item.productId}
                                            className="transition-colors duration-150"
                                            style={{
                                                borderBottom: "1px solid #1E2D45",
                                                background: idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.4)",
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "rgba(79,142,247,0.04)"}
                                            onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.4)"}
                                        >
                                            {/* Thumbnail */}
                                            <td className="px-4 py-3">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0"
                                                    style={{ background: "#151D2E", border: "1px solid #1E2D45" }}>
                                                    <img
                                                        src={item.images?.[0] || "/placeholder.png"}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>

                                            {/* Product ID */}
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-mono font-semibold px-2 py-1 rounded-md"
                                                    style={{ background: "rgba(30,45,69,0.6)", color: "#4F8EF7" }}>
                                                    {item.productId}
                                                </span>
                                            </td>

                                            {/* Name */}
                                            <td className="px-4 py-3" style={{ maxWidth: "200px" }}>
                                                <p className="text-sm font-semibold line-clamp-2" style={{ color: "#E8EDF5" }}>
                                                    {item.name}
                                                </p>
                                                {item.model && (
                                                    <p className="text-xs mt-0.5" style={{ color: "#7A8BA3" }}>{item.model}</p>
                                                )}
                                            </td>

                                            {/* Category */}
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                                                    style={{ background: "rgba(157,111,255,0.1)", color: "#9D6FFF", border: "1px solid rgba(157,111,255,0.2)" }}>
                                                    {item.category}
                                                </span>
                                            </td>

                                            {/* Brand */}
                                            <td className="px-4 py-3 text-sm" style={{ color: "#7A8BA3" }}>
                                                {item.brand || "—"}
                                            </td>

                                            {/* Price */}
                                            <td className="px-4 py-3">
                                                <p className="text-sm font-bold" style={{ color: "#10B981" }}>
                                                    LKR {Number(item.price).toLocaleString()}
                                                </p>
                                                {item.labelledPrice > item.price && (
                                                    <p className="text-xs line-through" style={{ color: "#F04E37" }}>
                                                        LKR {Number(item.labelledPrice).toLocaleString()}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Stock */}
                                            <td className="px-4 py-3">
                                                <span className="text-sm font-semibold"
                                                    style={{ color: item.stock > 10 ? "#10B981" : item.stock > 0 ? "#F59E0B" : "#F04E37" }}>
                                                    {item.stock}
                                                </span>
                                            </td>

                                            {/* Availability */}
                                            <td className="px-4 py-3">
                                                {item.availability || item.isAvailable ? (
                                                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                        style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                        style={{ background: "rgba(240,78,55,0.1)", color: "#F04E37", border: "1px solid rgba(240,78,55,0.2)" }}>
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <ProductDeleteModal
                                                        product={item}
                                                        refresh={() => setIsProductAreLoaded(false)}
                                                    />
                                                    <Link
                                                        to="/admin/edit-products"
                                                        state={item}
                                                        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                                                        style={{ background: "rgba(79,142,247,0.1)", color: "#4F8EF7", border: "1px solid rgba(79,142,247,0.2)" }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(79,142,247,0.2)"; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(79,142,247,0.1)"; }}
                                                        title="Edit product"
                                                    >
                                                        <BiEdit className="text-base" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty state */}
                        {products.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <span className="text-5xl">📦</span>
                                <p className="font-semibold" style={{ color: "#E8EDF5" }}>No products yet</p>
                                <p className="text-sm" style={{ color: "#7A8BA3" }}>Add your first product to get started.</p>
                                <Link to="/admin/add-products" className="btn-primary mt-2 text-sm">
                                    <FaPlus /> Add Product
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <LoadingAnimation />
                </div>
            )}
        </div>
    );
}
