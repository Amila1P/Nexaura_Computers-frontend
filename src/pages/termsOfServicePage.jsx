import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    HiScale,
    HiTruck,
    HiShieldCheck,
    HiCurrencyRupee,
    HiCheckCircle,
    HiInformationCircle,
    HiChevronRight,
} from "react-icons/hi";
import Footer from "../components/footer.jsx";

export default function TermsOfServicePage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col justify-between" style={{ background: "#080C14" }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-1">

                {/* ── HEADER ── */}
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                        style={{
                            background: "rgba(157,111,255,0.12)",
                            color: "#9D6FFF",
                            border: "1px solid rgba(157,111,255,0.25)",
                        }}
                    >
                        <HiScale className="text-base" /> Legal Agreements & User Terms
                    </div>
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
                        style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}
                    >
                        Terms of Service
                    </h1>
                    <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "#7A8BA3" }}>
                        Please review these terms and conditions carefully before placing orders or utilizing services provided by NexAura Computers.
                    </p>
                    <p className="text-xs mt-3 font-mono" style={{ color: "#4B5563" }}>
                        Effective Date: November 2026 • Version 3.1
                    </p>
                </div>

                {/* ── TERMS CONTENT SECTIONS ── */}
                <div className="space-y-8">

                    {/* 1. Acceptance */}
                    <section
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(79,142,247,0.12)", color: "#4F8EF7" }}>
                                <HiScale className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                1. Acceptance of Terms
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#A0AEC0" }}>
                            By creating an account, browsing our catalog, or completing a hardware purchase through NexAura Computers (the "Service"), you agree to be legally bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations of Sri Lanka.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>
                            If you do not agree with any part of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    {/* 2. Products, Pricing & Accuracy */}
                    <section
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>
                                <HiCurrencyRupee className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                2. Products, Specifications & Pricing
                            </h2>
                        </div>
                        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>
                            <p>
                                <strong className="text-white">A. Currency:</strong> All prices displayed on NexAura Computers are quoted in Sri Lankan Rupees (<strong className="text-[#10B981]">LKR</strong>) and represent retail pricing inclusive of statutory levies where applicable.
                            </p>
                            <p>
                                <strong className="text-white">B. Technical Accuracy:</strong> We endeavor to display technical specifications, images, and descriptions of laptops, PC components, and gaming rigs with maximum precision. However, manufacturers occasionally adjust physical packaging or revisions without prior notice.
                            </p>
                            <p>
                                <strong className="text-white">C. Pricing Errors:</strong> In the rare event a product is listed at an incorrect price due to a clerical or database error, NexAura reserves the right to cancel orders placed under the erroneous listing prior to dispatch.
                            </p>
                        </div>
                    </section>

                    {/* 3. Orders & Payment */}
                    <section
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B" }}>
                                <HiCheckCircle className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                3. Order Processing & Verification
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#A0AEC0" }}>
                            When you submit an order through our checkout system, an automated order confirmation is issued with a unique identifier (e.g. <span className="font-mono text-[#4F8EF7]">ORD00000001</span>). This confirms receipt of your purchase intent.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>
                            We verify stock availability, shipping validity, and contact numbers before updating order status to <span className="text-[#4F8EF7] font-semibold">"In Progress"</span> and scheduling dispatch.
                        </p>
                    </section>

                    {/* 4. Shipping & Delivery */}
                    <section
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(6,182,212,0.12)", color: "#06B6D4" }}>
                                <HiTruck className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                4. Island-Wide Shipping & Delivery
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                            <div className="p-4 rounded-2xl" style={{ background: "#151D2E", border: "1px solid #1E2D45" }}>
                                <p className="font-bold text-white mb-1">Colombo & Suburbs Delivery</p>
                                <p style={{ color: "#7A8BA3" }}>Standard turnaround of 1 to 2 business days. Express same-day courier dispatch is available on eligible pre-paid orders.</p>
                            </div>
                            <div className="p-4 rounded-2xl" style={{ background: "#151D2E", border: "1px solid #1E2D45" }}>
                                <p className="font-bold text-white mb-1">Outstation Island-Wide Delivery</p>
                                <p style={{ color: "#7A8BA3" }}>Delivered safely via registered courier networks within 2 to 4 business days. Fragile parts (GPUs, tempered glass cases) are double-boxed.</p>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "#7A8BA3" }}>
                            Customers are required to inspect the exterior condition of parcels upon delivery and notify the delivery agent or our support team immediately in case of obvious transit damage.
                        </p>
                    </section>

                    {/* 5. Warranties & Returns */}
                    <section
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>
                                <HiShieldCheck className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                5. Manufacturer Warranty & Return Policy
                            </h2>
                        </div>
                        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>
                            <p>
                                <strong className="text-white">A. Official Brand Warranties:</strong> All products are 100% brand new and backed by official manufacturer warranties (e.g. ASUS, MSI, Dell, Razer, Corsair, Logitech, Intel, AMD). Warranty claims follow the authorized distributor RMA guidelines.
                            </p>
                            <p>
                                <strong className="text-white">B. 7-Day Return Guarantee:</strong> Unopened, sealed items in original condition may be returned within 7 calendar days of receipt for exchange or refund.
                            </p>
                            <p>
                                <strong className="text-white">C. Warranty Exclusions:</strong> Physical damage, burnt PCBs, liquid spills, improper overclocking/voltages, or removal of serial number stickers voids warranty protection.
                            </p>
                        </div>
                    </section>

                    {/* 6. Governing Law */}
                    <section
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(79,142,247,0.12)", color: "#4F8EF7" }}>
                                <HiInformationCircle className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                6. Governing Law & Dispute Resolution
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "#A0AEC0" }}>
                            These Terms of Service and any related transaction disputes shall be governed by and construed in accordance with the substantive laws of the Democratic Socialist Republic of Sri Lanka, under the exclusive jurisdiction of the competent courts in Colombo.
                        </p>
                        <div
                            className="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            style={{ background: "#151D2E", border: "1px solid #1E2D45" }}
                        >
                            <div>
                                <p className="text-xs uppercase font-bold tracking-wider" style={{ color: "#7A8BA3" }}>
                                    Questions Regarding These Terms?
                                </p>
                                <p className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>
                                    legal@nexauracomputers.lk • Colombo 03, Sri Lanka
                                </p>
                            </div>
                            <Link to="/contact-us" className="btn-primary text-xs gap-1 py-2 px-4 w-fit">
                                Contact Legal Team <HiChevronRight />
                            </Link>
                        </div>
                    </section>

                </div>

            </div>
            <Footer />
        </div>
    );
}

