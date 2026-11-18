import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

export default function AdminAddProductPage() {

    /* ══ LOGIC — unchanged ══ */
    const [productId,     setProductId]     = useState("");
    const [name,          setName]          = useState("");
    const [altNames,      setAltNames]      = useState("");
    const [price,         setPrice]         = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [description,   setDescription]   = useState("");
    const [images,        setImages]        = useState([]);
    const [brand,         setBrand]         = useState("");
    const [model,         setModel]         = useState("");
    const [category,      setCategory]      = useState("");
    const [isAvailable,   setIsAvailable]   = useState(true);
    const [stock,         setStock]         = useState(0);
    const [isFeatured,    setIsFeatured]    = useState(false);
    const [isSaving,      setIsSaving]      = useState(false);
    const navigate = useNavigate();

    async function handleSave() {
        try {
            setIsSaving(true);
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
                productId    : Number(productId) || productId,
                name, altNames: altNamesArray,
                price        : Number(price),
                labelledPrice: Number(labelledPrice),
                description, images: urls, brand, model, category,
                isAvailable, stock: Number(stock) || 0,
                isFeatured,
            };
            await axios.post(import.meta.env.VITE_API_URL + "/products", productData, {
                headers: { "Authorization": "Bearer " + token }
            });
            toast.success("Product added successfully.");
            navigate("/admin/products");
        } catch (error) {
            setIsSaving(false);
            toast.error(error?.response?.data?.message || "Failed to add product. Please try again.");
            console.log("error adding product", error);
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
                                Add Product
                            </h1>
                            <p className="text-xs" style={{ color: "#7A8BA3" }}>Fill in the details to add a new product</p>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                    <Link to="/admin/products" className="btn-secondary text-sm px-5 py-2">
                        Cancel
                    </Link>
                    <button
                        id="admin-add-product-save"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary text-sm px-5 py-2"
                        style={{ opacity: isSaving ? 0.7 : 1 }}
                    >
                        {isSaving ? "Saving…" : "Save Product"}
                    </button>
                </div>
            </div>

            {/* ── Form card ── */}
            <div className="rounded-2xl p-6" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>

                {/* Section: Basic Info */}
                <p className="text-xs font-bold uppercase tracking-wider mb-4 pb-3"
                    style={{ color: "#4F8EF7", borderBottom: "1px solid #1E2D45" }}>
                    Basic Information
                </p>
                <div className="flex flex-wrap -mx-2 mb-6">
                    <Field label="Product ID" quarter>
                        <input style={inputStyle} value={productId} onChange={e => setProductId(e.target.value)}
                            placeholder="e.g. 1001"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Product Name">
                        <input style={inputStyle} value={name} onChange={e => setName(e.target.value)}
                            placeholder="e.g. ASUS ROG Strix G16"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Alternative Names (comma-separated)" full>
                        <input style={inputStyle} value={altNames} onChange={e => setAltNames(e.target.value)}
                            placeholder="e.g. ROG Strix, ASUS ROG G16"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Description" full>
                        <textarea
                            rows={4} value={description} onChange={e => setDescription(e.target.value)}
                            placeholder="Write a detailed product description…"
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
                            placeholder="0.00"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Labelled / MRP (LKR)" quarter>
                        <input type="number" style={inputStyle} value={labelledPrice} onChange={e => setLabelledPrice(e.target.value)}
                            placeholder="0.00"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                    <Field label="Stock Quantity" quarter>
                        <input type="number" style={inputStyle} value={stock} onChange={e => setStock(Number(e.target.value))}
                            placeholder="0"
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
                            <option value="">Select…</option>
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
                            <option value="">Select…</option>
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
                            placeholder="e.g. G614JZR-N3061W"
                            onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                            onBlur={e => e.target.style.borderColor = "#1E2D45"} />
                    </Field>
                </div>

                {/* Section: Media */}
                <p className="text-xs font-bold uppercase tracking-wider mb-4 pb-3"
                    style={{ color: "#4F8EF7", borderBottom: "1px solid #1E2D45" }}>
                    Product Images
                </p>
                <div className="flex flex-wrap -mx-2">
                    <Field label="Upload Images (multiple allowed)" full>
                        <label
                            className="flex flex-col items-center justify-center gap-2 w-full py-8 rounded-xl cursor-pointer transition-all duration-200"
                            style={{ background: "rgba(30,45,69,0.4)", border: "1.5px dashed #1E2D45" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "#4F8EF7"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2D45"}
                        >
                            <span className="text-3xl">🖼️</span>
                            <p className="text-sm font-medium" style={{ color: "#7A8BA3" }}>
                                {images.length > 0
                                    ? `${images.length} file(s) selected`
                                    : "Click to upload or drag & drop"}
                            </p>
                            <p className="text-xs" style={{ color: "#7A8BA3" }}>PNG, JPG, WebP supported</p>
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