import { HiStar, HiThumbUp, HiThumbDown, HiAnnotation } from "react-icons/hi";

/**
 * Admin Reviews Page
 *
 * The current backend has no reviews model or endpoints.
 * This page is designed and ready — add a Review model and
 * GET /api/reviews endpoint to activate the full UI.
 */
export default function AdminReviewsPage() {

    /* Placeholder sample reviews — replace with real API data once the endpoint exists */
    const SAMPLE_REVIEWS = [
        { id: 1, author: "Sample User",    product: "ASUS ROG Strix G16", rating: 5, comment: "Absolutely love this laptop!", date: "2025-10-10", approved: true  },
        { id: 2, author: "Another User",   product: "Dell XPS 15",         rating: 4, comment: "Great build quality, fast delivery.", date: "2025-10-08", approved: true  },
        { id: 3, author: "Pending Review", product: "HP Omen 16",          rating: 3, comment: "Good but battery life is average.",  date: "2025-10-06", approved: false },
    ];

    function StarRating({ rating }) {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                    <HiStar key={i} className="text-sm"
                        style={{ color: i <= rating ? "#F59E0B" : "#1E2D45" }} />
                ))}
            </div>
        );
    }

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page header ── */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                        <HiStar className="text-lg" style={{ color: "#F59E0B" }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Reviews
                        </h1>
                        <p className="text-xs" style={{ color: "#7A8BA3" }}>Moderate customer product reviews</p>
                    </div>
                </div>
                {/* Coming-soon badge */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>
                    ⚡ Backend integration pending
                </span>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { icon: HiAnnotation, label: "Total Reviews",    value: SAMPLE_REVIEWS.length, color: "#4F8EF7" },
                    { icon: HiThumbUp,    label: "Approved",          value: SAMPLE_REVIEWS.filter(r => r.approved).length, color: "#10B981" },
                    { icon: HiThumbDown,  label: "Pending Approval",  value: SAMPLE_REVIEWS.filter(r => !r.approved).length, color: "#F59E0B" },
                ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center gap-4 p-5 rounded-2xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${color}1A`, border: `1px solid ${color}33` }}>
                            <Icon className="text-xl" style={{ color }} />
                        </div>
                        <div>
                            <p className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>{value}</p>
                            <p className="text-xs" style={{ color: "#7A8BA3" }}>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Reviews table (shows sample / placeholder data) ── */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>

                {/* Backend notice banner */}
                <div className="px-5 py-3 flex items-center gap-3"
                    style={{ background: "rgba(245,158,11,0.06)", borderBottom: "1px solid rgba(245,158,11,0.15)" }}>
                    <span className="text-lg">ℹ️</span>
                    <p className="text-xs" style={{ color: "#7A8BA3" }}>
                        Showing <strong style={{ color: "#F59E0B" }}>sample data</strong>.
                        Add a <code className="px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", fontSize: "0.7rem" }}>
                            Review
                        </code> model and <code className="px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", fontSize: "0.7rem" }}>
                            GET /api/reviews
                        </code> endpoint to connect real data.
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr style={{ background: "#151D2E", borderBottom: "1px solid #1E2D45" }}>
                                {["Author", "Product", "Rating", "Comment", "Date", "Status", "Actions"].map(h => (
                                    <th key={h} className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider"
                                        style={{ color: "#7A8BA3" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {SAMPLE_REVIEWS.map((review, idx) => (
                                <tr key={review.id}
                                    className="transition-colors duration-150"
                                    style={{
                                        borderBottom: "1px solid #1E2D45",
                                        background: idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.4)",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(79,142,247,0.04)"}
                                    onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.4)"}
                                >
                                    {/* Author */}
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                                style={{ background: "rgba(79,142,247,0.15)", color: "#4F8EF7" }}>
                                                {review.author[0]}
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: "#E8EDF5" }}>{review.author}</span>
                                        </div>
                                    </td>

                                    {/* Product */}
                                    <td className="px-4 py-3.5 text-sm" style={{ color: "#7A8BA3", maxWidth: "160px" }}>
                                        <span className="line-clamp-1">{review.product}</span>
                                    </td>

                                    {/* Rating */}
                                    <td className="px-4 py-3.5">
                                        <StarRating rating={review.rating} />
                                    </td>

                                    {/* Comment */}
                                    <td className="px-4 py-3.5 text-sm" style={{ color: "#7A8BA3", maxWidth: "240px" }}>
                                        <span className="line-clamp-2">{review.comment}</span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap" style={{ color: "#7A8BA3" }}>
                                        {new Date(review.date).toLocaleDateString("en-GB", {
                                            day: "2-digit", month: "short", year: "numeric"
                                        })}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3.5">
                                        {review.approved ? (
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                                                Approved
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.2)" }}>
                                                Pending
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-200"
                                                style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}
                                                title="Approve review"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-200"
                                                style={{ background: "rgba(240,78,55,0.1)", color: "#F04E37", border: "1px solid rgba(240,78,55,0.2)" }}
                                                title="Delete review"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
