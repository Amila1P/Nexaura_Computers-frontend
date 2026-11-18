import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiSparkles, HiArrowRight } from "react-icons/hi";
import api from "../utils/api";
import { getFormattedPrice } from "../utils/priceFormat";

export default function HeroProductSlideshow() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    // Fetch products and filter ONLY those where isFeatured === true
    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        api.get("/products")
            .then((res) => {
                if (!isMounted) return;
                const products = Array.isArray(res.data) ? res.data : [];
                const featured = products.filter((p) => Boolean(p.isFeatured));
                setFeaturedProducts(featured);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load featured products for hero slideshow:", err);
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Ensure active slide is within bounds when products update
    useEffect(() => {
        if (currentIndex >= featuredProducts.length && featuredProducts.length > 0) {
            setCurrentIndex(0);
        }
    }, [featuredProducts.length, currentIndex]);

    // Auto-play slideshow: transitions every 4.5 seconds (clears interval on unmount)
    useEffect(() => {
        if (featuredProducts.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
        }, 4500);

        return () => clearInterval(interval);
    }, [featuredProducts.length, isHovered]);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glowing outer ambient ring */}
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(79,142,247,0.25), rgba(157,111,255,0.15))",
                    filter: "blur(40px)",
                    transform: "scale(1.15)",
                }}
            />

            {/* Slideshow main container */}
            <div
                className="relative rounded-3xl overflow-hidden flex flex-col items-center justify-center transition-all duration-300"
                style={{
                    width: "380px",
                    maxWidth: "90vw",
                    height: "400px",
                    background: "rgba(21, 29, 46, 0.75)",
                    border: "1px solid rgba(79, 142, 247, 0.25)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(79,142,247,0.1)",
                }}
            >
                {isLoading ? (
                    /* Loading skeleton state */
                    <div className="flex flex-col items-center justify-center gap-3 w-full h-full p-8 animate-pulse">
                        <div className="w-16 h-16 rounded-2xl bg-[#1E2D45]/60" />
                        <div className="w-36 h-4 rounded-full bg-[#1E2D45]/60" />
                        <div className="w-24 h-3 rounded-full bg-[#1E2D45]/40" />
                    </div>
                ) : featuredProducts.length > 0 ? (
                    <>
                        {/* Slides list with smooth CSS fade/scale transition */}
                        <div className="relative w-full h-full overflow-hidden">
                            {featuredProducts.map((product, idx) => {
                                const isActive = idx === currentIndex;
                                return (
                                    <Link
                                        key={product.productId || idx}
                                        to={`/overview/${product.productId}`}
                                        state={{ product }}
                                        className={`absolute inset-0 w-full h-full flex flex-col justify-between p-6 transition-all duration-700 ease-in-out group ${
                                            isActive
                                                ? "opacity-100 scale-100 pointer-events-auto z-10"
                                                : "opacity-0 scale-95 pointer-events-none z-0"
                                        }`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {/* Top Header Row: Featured Badge + Sale Tag */}
                                        <div className="flex items-center justify-between z-20">
                                            <span
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                                                style={{
                                                    background: "rgba(79, 142, 247, 0.15)",
                                                    border: "1px solid rgba(79, 142, 247, 0.35)",
                                                    color: "#4F8EF7",
                                                }}
                                            >
                                                <HiSparkles className="text-sm" /> Featured
                                            </span>
                                            {product.labelledPrice > product.price && (
                                                <span className="badge badge-sale text-xs px-2.5 py-0.5">
                                                    Sale
                                                </span>
                                            )}
                                        </div>

                                        {/* Center: High Quality Product Image */}
                                        <div className="relative flex-1 flex items-center justify-center p-2 my-2 overflow-hidden">
                                            <img
                                                src={product.images?.[0] || "/placeholder.png"}
                                                alt={product.name}
                                                className="w-full h-full max-h-[210px] object-contain transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Bottom Details Card: Title, Price & CTA */}
                                        <div
                                            className="relative z-20 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-colors duration-300"
                                            style={{
                                                background: "rgba(15, 22, 35, 0.85)",
                                                border: "1px solid rgba(30, 45, 69, 0.8)",
                                            }}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p
                                                    className="text-sm font-semibold truncate group-hover:text-[#4F8EF7] transition-colors"
                                                    style={{ color: "#E8EDF5" }}
                                                    title={product.name}
                                                >
                                                    {product.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-sm font-bold" style={{ color: "#10B981" }}>
                                                        {getFormattedPrice(product.price)}
                                                    </span>
                                                    {product.labelledPrice > product.price && (
                                                        <span
                                                            className="text-xs line-through"
                                                            style={{ color: "#F04E37" }}
                                                        >
                                                            {getFormattedPrice(product.labelledPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Subtle arrow button */}
                                            <div
                                                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                                                style={{
                                                    background: "rgba(79, 142, 247, 0.12)",
                                                    color: "#4F8EF7",
                                                    border: "1px solid rgba(79, 142, 247, 0.25)",
                                                }}
                                            >
                                                <HiArrowRight className="text-sm" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Navigation Dots (Only if more than 1 featured product) */}
                        {featuredProducts.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-[#080C14]/75 backdrop-blur-md border border-[#1E2D45]">
                                {featuredProducts.map((_, dotIndex) => (
                                    <button
                                        key={dotIndex}
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setCurrentIndex(dotIndex);
                                        }}
                                        className="rounded-full transition-all duration-300 cursor-pointer"
                                        style={{
                                            width: dotIndex === currentIndex ? "22px" : "6px",
                                            height: "6px",
                                            background:
                                                dotIndex === currentIndex
                                                    ? "#4F8EF7"
                                                    : "rgba(122, 139, 163, 0.4)",
                                            boxShadow:
                                                dotIndex === currentIndex
                                                    ? "0 0 8px rgba(79, 142, 247, 0.7)"
                                                    : "none",
                                        }}
                                        aria-label={`Go to slide ${dotIndex + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    /* Fallback state when no products have been featured yet by admin */
                    <div className="text-center p-6 select-none flex flex-col items-center justify-center">
                        <div className="text-7xl mb-3">🖥️</div>
                        <p className="text-sm font-semibold" style={{ color: "#4F8EF7" }}>
                            NexAura Featured
                        </p>
                        <p className="text-xs mt-1 max-w-[240px]" style={{ color: "#7A8BA3" }}>
                            Mark products as "Featured" in the Admin Panel to display them here in the hero slideshow.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

