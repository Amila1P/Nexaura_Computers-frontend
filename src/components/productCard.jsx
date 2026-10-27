import { Link } from "react-router-dom"
import getFormattedPrice from "../utils/priceFormat";

export default function ProductCard({ product }) {

    const hasDiscount = product.labelledPrice > product.price;
    const discountPct = hasDiscount
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return (
        <Link
            to={"/overview/" + product.productId}
            state={{ product }}
            className="group flex flex-col overflow-hidden rounded-2xl cursor-pointer"
            style={{
                background: "#151D2E",
                border: "1px solid #1E2D45",
                textDecoration: "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
                e.currentTarget.style.borderColor = "#4F8EF7";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#1E2D45";
            }}
        >
            {/* Image container */}
            <div
                className="relative w-full overflow-hidden"
                style={{ background: "#0F1623", aspectRatio: "1 / 1" }}
            >
                {/* Discount badge */}
                {hasDiscount && (
                    <span
                        className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-xs font-bold"
                        style={{ background: "rgba(240,78,55,0.15)", color: "#F04E37", border: "1px solid rgba(240,78,55,0.3)" }}
                    >
                        -{discountPct}%
                    </span>
                )}

                {/* Hover image (secondary) */}
                <img
                    src={product.images[1] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover absolute inset-0"
                />
                {/* Primary image — fades out on hover */}
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 p-4">
                <p
                    className="text-sm font-semibold line-clamp-2"
                    style={{ color: "#E8EDF5", lineHeight: 1.4 }}
                >
                    {product.name}
                </p>

                {/* Brand tag */}
                {product.brand && (
                    <span className="text-xs" style={{ color: "#7A8BA3" }}>{product.brand}</span>
                )}

                {/* Pricing */}
                <div className="flex flex-col mt-auto gap-0.5">
                    {hasDiscount && (
                        <span className="text-xs line-through" style={{ color: "#7A8BA3" }}>
                            {getFormattedPrice(product.labelledPrice)}
                        </span>
                    )}
                    <span className="text-base font-bold" style={{ color: "#10B981" }}>
                        {getFormattedPrice(product.price)}
                    </span>
                </div>
            </div>
        </Link>
    );
}