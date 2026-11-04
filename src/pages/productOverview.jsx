import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation.jsx";
import ImageSlideShow from "../components/imageSlideShow.jsx";
import ProductCard from "../components/productCard.jsx";
import getFormattedPrice from "../utils/priceFormat.js";
import { addToCart } from "../utils/cart.js";
import {
    HiChevronLeft,
    HiChevronRight,
    HiShoppingCart,
    HiLightningBolt,
    HiArrowLeft,
    HiCheckCircle,
    HiXCircle,
    HiCube,
    HiTag,
} from "react-icons/hi";

export default function ProductOverviewPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [quantity, setQuantity] = useState(1);

    const relatedSliderRef = useRef(null);

    // Scroll to top whenever the active productId changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setQuantity(1);
    }, [productId]);

    // Fetch the target product details
    useEffect(() => {
        setStatus("loading");
        api.get("/products/" + productId)
            .then((response) => {
                setProduct(response.data);
                setStatus("success");
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                toast.error("Error fetching product details");
                setStatus("error");
            });
    }, [productId]);

    // Fetch catalog list for Previous/Next navigation and Related Products
    useEffect(() => {
        api.get("/products")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setAllProducts(response.data);
                }
            })
            .catch((err) => {
                console.error("Failed to load catalog for product navigation:", err);
            });
    }, []);

    // Compute Previous and Next products in the catalog
    const currentIndex = allProducts.findIndex(
        (p) => String(p.productId) === String(productId)
    );
    const totalCount = allProducts.length;

    const prevProduct =
        totalCount > 1 && currentIndex !== -1
            ? allProducts[(currentIndex - 1 + totalCount) % totalCount]
            : null;

    const nextProduct =
        totalCount > 1 && currentIndex !== -1
            ? allProducts[(currentIndex + 1) % totalCount]
            : null;

    // Filter Related Products (prefer same category, exclude current)
    const relatedProducts = allProducts.filter(
        (p) =>
            String(p.productId) !== String(productId) &&
            (product?.category ? p.category === product.category : true)
    );

    // If related count in category is low, fill with others from catalog
    const fallbackRelated =
        relatedProducts.length < 4
            ? [
                  ...relatedProducts,
                  ...allProducts.filter(
                      (p) =>
                          String(p.productId) !== String(productId) &&
                          !relatedProducts.some((r) => r.productId === p.productId)
                  ),
              ].slice(0, 8)
            : relatedProducts;

    // Smooth horizontal scroll helper for related slider
    function scrollRelated(direction) {
        if (!relatedSliderRef.current) return;
        const scrollAmount = direction === "left" ? -340 : 340;
        relatedSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    const hasDiscount = product && product.labelledPrice > product.price;
    const discountPct = hasDiscount
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return (
        <div className="w-full min-h-screen pb-24" style={{ background: "#080C14" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

                {/* ── TOP BREADCRUMB & PREV/NEXT QUICK SWITCHER ── */}
                <div
                    className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-2xl mb-8"
                    style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                >
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium flex-wrap">
                        <Link
                            to="/"
                            className="transition-colors hover:text-[#4F8EF7]"
                            style={{ color: "#7A8BA3", textDecoration: "none" }}
                        >
                            Home
                        </Link>
                        <span style={{ color: "#4B5563" }}>/</span>
                        <Link
                            to="/products"
                            className="transition-colors hover:text-[#4F8EF7]"
                            style={{ color: "#7A8BA3", textDecoration: "none" }}
                        >
                            Products
                        </Link>
                        {product?.category && (
                            <>
                                <span style={{ color: "#4B5563" }}>/</span>
                                <Link
                                    to={`/products?q=${encodeURIComponent(product.category)}`}
                                    className="transition-colors hover:text-[#4F8EF7]"
                                    style={{ color: "#7A8BA3", textDecoration: "none" }}
                                >
                                    {product.category}
                                </Link>
                            </>
                        )}
                        <span style={{ color: "#4B5563" }}>/</span>
                        <span className="font-semibold truncate max-w-[200px] sm:max-w-xs" style={{ color: "#E8EDF5" }}>
                            {product?.name || productId}
                        </span>
                    </nav>

                    {/* Prev / Next Header Switcher */}
                    {totalCount > 1 && (
                        <div className="flex items-center gap-2 ml-auto">
                            {prevProduct && (
                                <Link
                                    to={`/overview/${prevProduct.productId}`}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 group"
                                    style={{
                                        background: "rgba(30,45,69,0.5)",
                                        color: "#7A8BA3",
                                        border: "1px solid #1E2D45",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#E8EDF5";
                                        e.currentTarget.style.borderColor = "#4F8EF7";
                                        e.currentTarget.style.background = "rgba(79,142,247,0.12)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#7A8BA3";
                                        e.currentTarget.style.borderColor = "#1E2D45";
                                        e.currentTarget.style.background = "rgba(30,45,69,0.5)";
                                    }}
                                    title={`Previous: ${prevProduct.name}`}
                                >
                                    <HiChevronLeft className="text-base group-hover:-translate-x-0.5 transition-transform" />
                                    <span className="hidden sm:inline">Prev</span>
                                </Link>
                            )}

                            {currentIndex !== -1 && (
                                <span className="text-xs px-2 font-mono" style={{ color: "#7A8BA3" }}>
                                    {currentIndex + 1} / {totalCount}
                                </span>
                            )}

                            {nextProduct && (
                                <Link
                                    to={`/overview/${nextProduct.productId}`}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 group"
                                    style={{
                                        background: "rgba(30,45,69,0.5)",
                                        color: "#7A8BA3",
                                        border: "1px solid #1E2D45",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#E8EDF5";
                                        e.currentTarget.style.borderColor = "#4F8EF7";
                                        e.currentTarget.style.background = "rgba(79,142,247,0.12)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#7A8BA3";
                                        e.currentTarget.style.borderColor = "#1E2D45";
                                        e.currentTarget.style.background = "rgba(30,45,69,0.5)";
                                    }}
                                    title={`Next: ${nextProduct.name}`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <HiChevronRight className="text-base group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* ── LOADING STATE ── */}
                {status === "loading" && (
                    <div className="w-full py-24 flex items-center justify-center">
                        <LoadingAnimation />
                    </div>
                )}

                {/* ── ERROR STATE ── */}
                {status === "error" && (
                    <div
                        className="w-full p-12 rounded-3xl flex flex-col items-center justify-center gap-4 text-center my-8"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ background: "rgba(240,78,55,0.1)", border: "1px solid rgba(240,78,55,0.25)" }}
                        >
                            <HiCube className="text-3xl" style={{ color: "#F04E37" }} />
                        </div>
                        <h2 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Product Not Found
                        </h2>
                        <p className="text-sm max-w-md" style={{ color: "#7A8BA3" }}>
                            We couldn't retrieve the specifications for product ID{" "}
                            <span className="font-mono text-[#4F8EF7]">{productId}</span>. It might have been unlisted or moved.
                        </p>
                        <Link
                            to="/products"
                            className="btn-primary mt-2 text-sm gap-2"
                        >
                            <HiArrowLeft /> Back to Catalog
                        </Link>
                    </div>
                )}

                {/* ── PRODUCT MAIN DETAILS ── */}
                {status === "success" && product && (
                    <div className="space-y-12">
                        {/* Upper split: Image gallery + Information */}
                        <div
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 rounded-3xl"
                            style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                        >
                            {/* Left column: Image Slideshow */}
                            <div className="lg:col-span-6 flex justify-center items-start">
                                <ImageSlideShow images={product.images} />
                            </div>

                            {/* Right column: Specs, pricing, and purchase controls */}
                            <div className="lg:col-span-6 flex flex-col justify-between">
                                <div>
                                    {/* Badges: Category & Stock status */}
                                    <div className="flex items-center gap-2.5 flex-wrap mb-3">
                                        {product.category && (
                                            <span
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    background: "rgba(79,142,247,0.12)",
                                                    color: "#4F8EF7",
                                                    border: "1px solid rgba(79,142,247,0.25)",
                                                }}
                                            >
                                                <HiTag className="text-xs" />
                                                {product.category}
                                            </span>
                                        )}

                                        {product.isAvailable ? (
                                            <span
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                                                style={{
                                                    background: "rgba(16,185,129,0.12)",
                                                    color: "#10B981",
                                                    border: "1px solid rgba(16,185,129,0.25)",
                                                }}
                                            >
                                                <HiCheckCircle className="text-sm" /> In Stock ({product.stock} units)
                                            </span>
                                        ) : (
                                            <span
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                                                style={{
                                                    background: "rgba(240,78,55,0.12)",
                                                    color: "#F04E37",
                                                    border: "1px solid rgba(240,78,55,0.25)",
                                                }}
                                            >
                                                <HiXCircle className="text-sm" /> Currently Unavailable
                                            </span>
                                        )}

                                        {hasDiscount && (
                                            <span
                                                className="px-2.5 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    background: "rgba(240,78,55,0.15)",
                                                    color: "#F04E37",
                                                    border: "1px solid rgba(240,78,55,0.3)",
                                                }}
                                            >
                                                Save {discountPct}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Product Title */}
                                    <h1
                                        className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2"
                                        style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif", lineHeight: 1.25 }}
                                    >
                                        {product.name}
                                    </h1>

                                    {/* Alternate Names */}
                                    {Array.isArray(product.altNames) && product.altNames.length > 0 && (
                                        <p className="text-xs sm:text-sm mb-4" style={{ color: "#7A8BA3" }}>
                                            Also known as:{" "}
                                            <span style={{ color: "#A0AEC0" }}>{product.altNames.join(" • ")}</span>
                                        </p>
                                    )}

                                    {/* Product ID Pill */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md"
                                            style={{ background: "#151D2E", color: "#7A8BA3", border: "1px solid #1E2D45" }}
                                        >
                                            SKU: {product.productId}
                                        </span>
                                        {product.brand && (
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded-md"
                                                style={{ background: "#151D2E", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                            >
                                                Brand: {product.brand}
                                            </span>
                                        )}
                                        {product.model && (
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-md"
                                                style={{ background: "#151D2E", color: "#7A8BA3", border: "1px solid #1E2D45" }}
                                            >
                                                Model: {product.model}
                                            </span>
                                        )}
                                    </div>

                                    {/* Pricing Block */}
                                    <div
                                        className="p-5 rounded-2xl mb-6"
                                        style={{ background: "#151D2E", border: "1px solid #1E2D45" }}
                                    >
                                        <div className="flex items-baseline gap-3 flex-wrap">
                                            <p className="text-3xl sm:text-4xl font-black" style={{ color: "#10B981" }}>
                                                {getFormattedPrice(product.price)}
                                            </p>
                                            {hasDiscount && (
                                                <span className="text-base sm:text-lg line-through" style={{ color: "#7A8BA3" }}>
                                                    {getFormattedPrice(product.labelledPrice)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs mt-1" style={{ color: "#7A8BA3" }}>
                                            Includes all applicable taxes. Official manufacturer warranty included.
                                        </p>
                                    </div>

                                    {/* Description */}
                                    {product.description && (
                                        <div className="mb-6">
                                            <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#7A8BA3" }}>
                                                Product Overview
                                            </h3>
                                            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#A0AEC0" }}>
                                                {product.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Purchase controls (Quantity + Add to Cart + Buy Now) */}
                                <div className="pt-6 border-t" style={{ borderColor: "#1E2D45" }}>
                                    {/* Quantity selector */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>
                                            Quantity:
                                        </span>
                                        <div
                                            className="flex items-center rounded-xl overflow-hidden"
                                            style={{ background: "#151D2E", border: "1px solid #1E2D45" }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                                className="w-10 h-10 flex items-center justify-center font-bold text-base transition-colors hover:text-white cursor-pointer"
                                                style={{ color: "#7A8BA3" }}
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span
                                                className="w-12 h-10 flex items-center justify-center font-bold text-sm"
                                                style={{ color: "#E8EDF5" }}
                                            >
                                                {quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                                                className="w-10 h-10 flex items-center justify-center font-bold text-base transition-colors hover:text-white cursor-pointer"
                                                style={{ color: "#7A8BA3" }}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-xs" style={{ color: "#7A8BA3" }}>
                                            Total:{" "}
                                            <span className="font-bold" style={{ color: "#E8EDF5" }}>
                                                {getFormattedPrice(product.price * quantity)}
                                            </span>
                                        </span>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            disabled={!product.isAvailable}
                                            onClick={() => {
                                                addToCart(product, quantity);
                                                toast.success(`${quantity}x ${product.name} added to cart!`);
                                            }}
                                            className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg ${
                                                !product.isAvailable ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            style={{
                                                background: "linear-gradient(135deg, #4F8EF7 0%, #3B72D4 100%)",
                                                color: "#FFFFFF",
                                                boxShadow: "0 8px 24px rgba(79,142,247,0.3)",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (product.isAvailable) {
                                                    e.currentTarget.style.transform = "translateY(-2px)";
                                                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(79,142,247,0.45)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(79,142,247,0.3)";
                                            }}
                                        >
                                            <HiShoppingCart className="text-lg" />
                                            Add to Cart
                                        </button>

                                        <button
                                            type="button"
                                            disabled={!product.isAvailable}
                                            onClick={() => {
                                                navigate("/checkout", {
                                                    state: [
                                                        {
                                                            product: {
                                                                productId: product.productId,
                                                                name: product.name,
                                                                image: product.images?.[0] || "",
                                                                labelledPrice: product.labelledPrice,
                                                                price: product.price,
                                                            },
                                                            quantity: quantity,
                                                        },
                                                    ],
                                                });
                                            }}
                                            className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                                                !product.isAvailable ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            style={{
                                                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                                                color: "#FFFFFF",
                                                boxShadow: "0 8px 24px rgba(16,185,129,0.3)",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (product.isAvailable) {
                                                    e.currentTarget.style.transform = "translateY(-2px)";
                                                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(16,185,129,0.45)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(16,185,129,0.3)";
                                            }}
                                        >
                                            <HiLightningBolt className="text-lg" />
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── ADJACENT PRODUCT BROWSE CARDS (PREV & NEXT) ── */}
                        {totalCount > 1 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3
                                        className="text-base font-bold uppercase tracking-wider"
                                        style={{ color: "#7A8BA3" }}
                                    >
                                        Browse Neighboring Hardware
                                    </h3>
                                    <Link
                                        to="/products"
                                        className="text-xs font-semibold hover:underline"
                                        style={{ color: "#4F8EF7" }}
                                    >
                                        View Full Catalog →
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Previous product card */}
                                    {prevProduct && (
                                        <Link
                                            to={`/overview/${prevProduct.productId}`}
                                            className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group"
                                            style={{
                                                background: "#0F1623",
                                                border: "1px solid #1E2D45",
                                                textDecoration: "none",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = "#4F8EF7";
                                                e.currentTarget.style.transform = "translateX(-4px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = "#1E2D45";
                                                e.currentTarget.style.transform = "translateX(0)";
                                            }}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                style={{ background: "rgba(79,142,247,0.1)", color: "#4F8EF7", border: "1px solid rgba(79,142,247,0.2)" }}
                                            >
                                                <HiChevronLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
                                            </div>
                                            <div
                                                className="w-16 h-16 rounded-xl overflow-hidden shrink-0 p-1 flex items-center justify-center"
                                                style={{ background: "#151D2E", border: "1px solid #1E2D45" }}
                                            >
                                                <img
                                                    src={prevProduct.images?.[0] || "/placeholder.png"}
                                                    alt={prevProduct.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "#4F8EF7" }}>
                                                    Previous Product
                                                </p>
                                                <p className="text-sm font-semibold truncate" style={{ color: "#E8EDF5" }}>
                                                    {prevProduct.name}
                                                </p>
                                                <p className="text-xs font-bold" style={{ color: "#10B981" }}>
                                                    {getFormattedPrice(prevProduct.price)}
                                                </p>
                                            </div>
                                        </Link>
                                    )}

                                    {/* Next product card */}
                                    {nextProduct && (
                                        <Link
                                            to={`/overview/${nextProduct.productId}`}
                                            className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group text-right justify-end"
                                            style={{
                                                background: "#0F1623",
                                                border: "1px solid #1E2D45",
                                                textDecoration: "none",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = "#4F8EF7";
                                                e.currentTarget.style.transform = "translateX(4px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = "#1E2D45";
                                                e.currentTarget.style.transform = "translateX(0)";
                                            }}
                                        >
                                            <div className="flex-1 min-w-0 text-left md:text-right">
                                                <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "#4F8EF7" }}>
                                                    Next Product
                                                </p>
                                                <p className="text-sm font-semibold truncate" style={{ color: "#E8EDF5" }}>
                                                    {nextProduct.name}
                                                </p>
                                                <p className="text-xs font-bold" style={{ color: "#10B981" }}>
                                                    {getFormattedPrice(nextProduct.price)}
                                                </p>
                                            </div>
                                            <div
                                                className="w-16 h-16 rounded-xl overflow-hidden shrink-0 p-1 flex items-center justify-center order-first md:order-last"
                                                style={{ background: "#151D2E", border: "1px solid #1E2D45" }}
                                            >
                                                <img
                                                    src={nextProduct.images?.[0] || "/placeholder.png"}
                                                    alt={nextProduct.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 order-first md:order-last"
                                                style={{ background: "rgba(79,142,247,0.1)", color: "#4F8EF7", border: "1px solid rgba(79,142,247,0.2)" }}
                                            >
                                                <HiChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── RELATED PRODUCTS SLIDER ── */}
                        {fallbackRelated.length > 0 && (
                            <section
                                className="p-6 sm:p-8 rounded-3xl"
                                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                            >
                                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ background: "#4F8EF7" }}
                                            />
                                            <h2
                                                className="text-xl sm:text-2xl font-black"
                                                style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}
                                            >
                                                {product.category
                                                    ? `More in ${product.category}`
                                                    : "Related Hardware"}
                                            </h2>
                                        </div>
                                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                                            Handpicked recommendations matching this configuration
                                        </p>
                                    </div>

                                    {/* Slider navigation controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => scrollRelated("left")}
                                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                                            style={{
                                                background: "#151D2E",
                                                color: "#7A8BA3",
                                                border: "1px solid #1E2D45",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "#E8EDF5";
                                                e.currentTarget.style.borderColor = "#4F8EF7";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = "#7A8BA3";
                                                e.currentTarget.style.borderColor = "#1E2D45";
                                            }}
                                            aria-label="Scroll related products left"
                                        >
                                            <HiChevronLeft className="text-lg" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => scrollRelated("right")}
                                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                                            style={{
                                                background: "#151D2E",
                                                color: "#7A8BA3",
                                                border: "1px solid #1E2D45",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "#E8EDF5";
                                                e.currentTarget.style.borderColor = "#4F8EF7";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = "#7A8BA3";
                                                e.currentTarget.style.borderColor = "#1E2D45";
                                            }}
                                            aria-label="Scroll related products right"
                                        >
                                            <HiChevronRight className="text-lg" />
                                        </button>
                                    </div>
                                </div>

                                {/* Slider track */}
                                <div
                                    ref={relatedSliderRef}
                                    className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
                                    style={{
                                        scrollbarWidth: "none",
                                        msOverflowStyle: "none",
                                    }}
                                >
                                    {fallbackRelated.map((item) => (
                                        <div
                                            key={item.productId}
                                            className="shrink-0 w-64 sm:w-72"
                                        >
                                            <ProductCard product={item} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
