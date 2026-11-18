import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import uploadMedia from '/src/utils/mediaUpload.js';
import axios from "axios";
import { HiCube, HiChevronLeft } from "react-icons/hi";

/* ── Reusable form field wrapper ── */
function Field({ label, children, half, quarter, full }) {
    const w = full ? "w-full" : quarter ? "w-full sm:w-1/4" : half ? "w-full sm:w-1/2" : "w-full sm:w-3/4";
    return (
        <div className={`${w} p-2`}>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                {label}
            </label>
            {children}
        </div>
    );
}

export default function AdminEditProductPage() {

    /* ══ LOGIC — unchanged ══ */
    const location       = useLocation();
    const selectedProduct = location.state ?? null;

    const [productId,     setProductId]     = useState(() => selectedProduct?.productId     ?? "");
    const [name,          setName]          = useState(() => selectedProduct?.name          ?? "");
    const [altNames,      setAltNames]      = useState(() => selectedProduct?.altNames?.join(", ") ?? "");
    const [price,         setPrice]         = useState(() => selectedProduct?.price         ?? "");
    const [labelledPrice, setLabelledPrice] = useState(() => selectedProduct?.labelledPrice ?? "");
    const [description,   setDescription]   = useState(() => selectedProduct?.description   ?? "");
    const [images,        setImages]        = useState(() => selectedProduct?.images        ?? []);
    const [brand,         setBrand]         = useState(() => selectedProduct?.brand         ?? "");
    const [model,         setModel]         = useState(() => selectedProduct?.model         ?? "");
    const [category,      setCategory]      = useState(() => selectedProduct?.category      ?? "");
    const [isAvailable,   setIsAvailable]   = useState(() => selectedProduct?.isAvailable   ?? true);
    const [stock,         setStock]         = useState(() => selectedProduct?.stock         ?? 0);
    const [isFeatured,    setIsFeatured]    = useState(() => selectedProduct?.isFeatured    ?? false);
    const [isUpdating,    setIsUpdating]    = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedProduct == null) {
            toast.error("No product data found. Please select a product to edit.");
            navigate("/admin/products");
        }
    }, [navigate, selectedProduct]);

    async function handleUpdate() {
        try {
            setIsUpdating(true);
            const token = localStorage.getItem("token");
            if (token == null) {
                toast.error("You must be logged in to perform this action.");
                window.location.href = "/login";
                return;
            }
            const mediaUploadPromises = [];
            for (let i = 0; i < images.length; i++) {
                mediaUploadPromises.push(uploadMedia(images[i]));
            }
            const urls = await Promise.all(mediaUploadPromises);
            const altNamesArray = altNames.split(",").map(n => n.trim()).filter(Boolean);
            const productData = {
                name, altNames: altNamesArray,
                price        : Number(price),
                labelledPrice: Number(labelledPrice),
                description, images: urls, brand, model, category,
                isAvailable, stock: Number(stock) || 0,
                isFeatured,
            };
            if (urls.length === 0) {
                productData.images = selectedProduct?.images ?? [];
            }
            await axios.put(import.meta.env.VITE_API_URL + "/products/" + productId, productData, {
                headers: { "Authorization": "Bearer " + token }
            });
            toast.success("Product updated successfully.");
            navigate("/admin/products");
        } catch (error) {
            setIsUpdating(false);
            toast.error(error?.response?.data?.message || "Failed to update product. Please try again.");
            console.log("error updating product", error);
        }
    }
    /* ══ end LOGIC ══ */

    /* Shared input style */
    const inputStyle = {
        width: "100%", padding: "0.65rem 0.9rem",
        background: "#0F1623", border: "1.5px solid #1E2D45",
        borderRadius: "10px", color: "#E8EDF5",
        fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
        outline: "none", transition: "border-color 0.2s",
    };
    const disabledStyle = { ...inputStyle, opacity: 0.5, cursor: "not-allowed" };

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page header ── */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/products"
                        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                        style={{ background: "rgba(30,45,69,0.6)", color: "#7A8BA3", border: "1px solid #1E2D45" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#E8EDF5"}
                        onMouseLeave={e => e.currentTarget.style.color = "#7A8BA3"}
                    >
                        <HiChevronLeft className="text-lg" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)" }}>
                            <HiCube className="text-lg" style={{ color: "#4F8EF7" }} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                Edit Product
                            </h1>
                            <p className="text-xs font-mono" style={{ color: "#7A8BA3" }}>
                                ID: {productId}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                    <Link to="/admin/products" className="btn-secondary text-sm px-5 py-2">
                        Cancel
                    </Link>
                    <button
                        id="admin-edit-product-update"
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="btn-primary text-sm px-5 py-2"
                        style={{ opacity: isUpdating ? 0.7 : 1 }}
                    >
                        {isUpdating ? "Updating…" : "Update Product"}
                    </button>
                </div>
            </div>

            {/* ── Current images preview ── */}
            {selectedProduct?.images?.length > 0 && (
                <div className="rounded-2xl p-5 mb-4" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#7A8BA3" }}>
                        Current Images
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        {selectedProduct.images.map((img, i) => (
                            <div key={i} className="w-20 h-20 rounded-xl overflow-hidden"
                                style={{ background: "#151D2E", border: "1px solid #1E2D45" }}>
                                <img src={img} alt={`Product image ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Form card ── */}
            <div className="rounded-2xl p-6" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>

                {/* Section: Basic Info */}
                <p className="text-xs font-bold uppercase tracking-wider mb-4 pb-3"
                    style={{ color: "#4F8EF7", borderBottom: "1px solid #1E2D45" }}>
                    Basic Information
                </p>
                <div className="flex flex-wrap -mx-2 mb-6">
                    <Field label="Product ID (read-only)" quarter>
                        <input style={disabledStyle} value={productId} disabled />
                    </Field>
                    <Field label="Product Name">
                        <input style={inputStyle} value={name} onChange={e => setName(e.target.value)}
                            placeholder="Product name"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Alternative Names (comma-separated)" full>
                        <input style={inputStyle} value={altNames} onChange={e => setAltNames(e.target.value)}
                            placeholder="Comma-separated alternative names"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Description" full>
                        <textarea
                            rows={4} value={description} onChange={e => setDescription(e.target.value)}
                            placeholder="Product description…"
                            style={{ ...inputStyle, resize: "vertical" }}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"}
                        />
                    </Field>
                </div>

                {/* Section: Pricing */}
                <p className="text-xs font-bold uppercase tracking-wider mb-4 pb-3"
                    style={{ color: "#4F8EF7", borderBottom: "1px solid #1E2D45" }}>
                    Pricing & Stock
                </p>
                <div className="flex flex-wrap -mx-2 mb-6">
                    <Field label="Price (LKR)" quarter>
                        <input type="number" style={inputStyle} value={price} onChange={e => setPrice(e.target.value)}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Labelled / MRP (LKR)" quarter>
                        <input type="number" style={inputStyle} value={labelledPrice} onChange={e => setLabelledPrice(e.target.value)}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Stock Quantity" quarter>
                        <input type="number" style={inputStyle} value={stock} onChange={e => setStock(Number(e.target.value))}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Availability" quarter>
                        <select
                            value={isAvailable ? "true" : "false"}
                            onChange={e => setIsAvailable(e.target.value === "true")}
                            style={{ ...inputStyle, cursor: "pointer" }}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"}
                        >
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </Field>
                    <Field label="Hero Slideshow" quarter>
                        <select
                            value={isFeatured ? "true" : "false"}
                            onChange={e => setIsFeatured(e.target.value === "true")}
                            style={{ ...inputStyle, cursor: "pointer" }}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"}
                        >
                            <option value="false">Standard</option>
                            <option value="true">Featured (Hero)</option>
                        </select>
                    </Field>
                </div>

                {/* Section: Categorisation */}
                <p className="text-xs font-bold uppercase tracking-wider mb-4 pb-3"
                    style={{ color: "#4F8EF7", borderBottom: "1px solid #1E2D45" }}>
                    Categorisation
                </p>
                <div className="flex flex-wrap -mx-2 mb-6">
                    <Field label="Category" quarter>
                        <select value={category} onChange={e => setCategory(e.target.value)}
                            style={{ ...inputStyle, cursor: "pointer" }}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"}>
                            <option value="Laptop">Laptop</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Smartphone">Smartphone</option>
                            <option value="Camera">Camera</option>
                            <option value="Others">Others</option>
                        </select>
                    </Field>
                    <Field label="Brand" quarter>
                        <select value={brand} onChange={e => setBrand(e.target.value)}
                            style={{ ...inputStyle, cursor: "pointer" }}
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"}>
                            <option value="Apple">Apple</option>
                            <option value="Samsung">Samsung</option>
                            <option value="Dell">Dell</option>
                            <option value="HP">HP</option>
                            <option value="Lenovo">Lenovo</option>
                            <option value="Asus">Asus</option>
                            <option value="Acer">Acer</option>
                            <option value="Others">Others</option>
                        </select>
                    </Field>
                    <Field label="Model" half>
                        <input style={inputStyle} value={model} onChange={e => setModel(e.target.value)}
                            placeholder="Model number / variant"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                </div>

                {/* Section: Replace Images */}
                <p className="text-xs font-bold uppercase tracking-wider mb-4 pb-3"
                    style={{ color: "#4F8EF7", borderBottom: "1px solid #1E2D45" }}>
                    Replace Images
                </p>
                <div className="flex flex-wrap -mx-2">
                    <Field label="Upload new images (leave empty to keep current)" full>
                        <label
                            className="flex flex-col items-center justify-center gap-2 w-full py-8 rounded-xl cursor-pointer transition-all duration-200"
                            style={{ background: "rgba(30,45,69,0.4)", border: "1.5px dashed #1E2D45" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "#4F8EF7"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2D45"}
                        >
                            <span className="text-3xl">🖼️</span>
                            <p className="text-sm font-medium" style={{ color: "#7A8BA3" }}>
                                {images.length > 0
                                    ? `${images.length} new file(s) selected`
                                    : "Click to upload replacement images"}
                            </p>
                            <p className="text-xs" style={{ color: "#7A8BA3" }}>Leave empty to keep existing images</p>
                            <input
                                type="file" multiple className="hidden"
                                onChange={e => setImages(e.target.files)}
                            />
                        </label>
                    </Field>
                </div>
            </div>
        </div>
    );
}