import { Link } from "react-router-dom";
import {
    HiShieldCheck,
    HiLockClosed,
    HiDocumentText,
    HiServer,
    HiEye,
    HiMail,
    HiChevronRight,
} from "react-icons/hi";
import Footer from "../components/footer.jsx";

export default function PrivacyPolicyPage() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-between" style={{ background: "#080C14" }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-1">
                
                {/* ── HEADER ── */}
                <div className="text-center mb-12">
                    <div 
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                        style={{
                            background: "rgba(79,142,247,0.12)",
                            color: "#4F8EF7",
                            border: "1px solid rgba(79,142,247,0.25)",
                        }}
                    >
                        <HiShieldCheck className="text-base" /> Legal & Transparency
                    </div>
                    <h1 
                        className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
                        style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}
                    >
                        Privacy Policy
                    </h1>
                    <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "#7A8BA3" }}>
                        At NexAura Computers, we are committed to safeguarding your personal information, maintaining transparency, and securing your online transactions.
                    </p>
                    <p className="text-xs mt-3 font-mono" style={{ color: "#4B5563" }}>
                        Effective Date: November 2026 • Version 2.4
                    </p>
                </div>

                {/* ── POLICY CONTENT SECTIONS ── */}
                <div className="space-y-8">
                    
                    {/* 1. Introduction */}
                    <section 
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(79,142,247,0.12)", color: "#4F8EF7" }}>
                                <HiDocumentText className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                1. Overview & Scope
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#A0AEC0" }}>
                            This Privacy Policy outlines how NexAura Computers ("we", "us", or "our") collects, uses, protects, and discloses personal information when you browse our storefront, register for an account, purchase computer hardware or custom rigs, and interact with our services via our website.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>
                            By accessing or using our platform, you acknowledge that you have read and understood this policy and consent to the data practices described herein.
                        </p>
                    </section>

                    {/* 2. Information We Collect */}
                    <section 
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>
                                <HiEye className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                2. Information We Collect
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm" style={{ color: "#A0AEC0" }}>
                            <div>
                                <h3 className="font-semibold text-white mb-1">A. Personal Identification Details</h3>
                                <p className="leading-relaxed">
                                    When creating an account or placing an order, we collect your name (first and last name), email address, telephone contact numbers, and profile avatars.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">B. Shipping & Delivery Address</h3>
                                <p className="leading-relaxed">
                                    To fulfill and dispatch your orders across Sri Lanka, we record recipient names, street address lines, city, state/province, postal codes, and contact phone numbers.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">C. Authentication Credentials</h3>
                                <p className="leading-relaxed">
                                    We store cryptographically hashed passwords using the industry-standard bcrypt algorithm (10 salt rounds). We never store or have access to plaintext user passwords.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">D. Google OAuth Data</h3>
                                <p className="leading-relaxed">
                                    If you choose to sign in with Google, we receive token-validated profile metadata (your Google account email, given name, family name, and profile photo) as authorized by your Google account permissions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 3. How We Use Your Data */}
                    <section 
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(157,111,255,0.12)", color: "#9D6FFF" }}>
                                <HiServer className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                3. How We Use Your Information
                            </h2>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>
                            <li>To process, verify, package, and deliver your hardware orders.</li>
                            <li>To provide customer service, warranty support, and dispatch order tracking notifications.</li>
                            <li>To authenticate user sessions securely with JSON Web Tokens (JWT).</li>
                            <li>To prevent fraudulent transactions, unauthorized account access, and enforce system security.</li>
                            <li>To compute aggregated platform analytics (e.g., anonymized sales velocity and inventory forecasts).</li>
                        </ul>
                    </section>

                    {/* 4. Storage & Security */}
                    <section 
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B" }}>
                                <HiLockClosed className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                4. Data Security & Cloud Storage
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#A0AEC0" }}>
                            All database records are hosted on secure MongoDB Atlas cloud clusters with transport-layer encryption (TLS/SSL) and strict connection whitelisting.
                        </p>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#A0AEC0" }}>
                            Product and customer avatar media assets are securely hosted on Supabase Storage buckets, ensuring reliable content delivery with granular access permissions.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#A0AEC0" }}>
                            Session authentication uses signed JWTs with expiration bounds, preventing token tampering and enforcing role-based administrative boundaries.
                        </p>
                    </section>

                    {/* 5. Browser LocalStorage & Cookies */}
                    <section 
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <h2 className="text-xl font-bold mb-3" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            5. Browser Storage (LocalStorage)
                        </h2>
                        <p className="text-sm leading-relaxed mb-2" style={{ color: "#A0AEC0" }}>
                            We utilize your browser's <code className="text-[#4F8EF7] font-mono">localStorage</code> to maintain essential client state between page reloads, specifically:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm mb-3" style={{ color: "#A0AEC0" }}>
                            <li><strong className="text-white">cart:</strong> Stores your active shopping items, quantities, and selected hardware configurations.</li>
                            <li><strong className="text-white">token:</strong> Contains your temporary signed session JWT token for authenticated operations.</li>
                        </ul>
                        <p className="text-sm leading-relaxed" style={{ color: "#7A8BA3" }}>
                            You may clear this data at any time via your browser settings or by clicking "Log Out".
                        </p>
                    </section>

                    {/* 6. User Rights & Contact */}
                    <section 
                        className="p-6 sm:p-8 rounded-3xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: "rgba(79,142,247,0.12)", color: "#4F8EF7" }}>
                                <HiMail className="text-xl" />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                6. Your Rights & Contact Details
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "#A0AEC0" }}>
                            You maintain the right to view, modify, or update your personal account information directly via your <Link to="/settings" className="text-[#4F8EF7] underline">Account Settings</Link> page.
                        </p>
                        <div 
                            className="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            style={{ background: "#151D2E", border: "1px solid #1E2D45" }}
                        >
                            <div>
                                <p className="text-xs uppercase font-bold tracking-wider" style={{ color: "#7A8BA3" }}>
                                    Privacy & Data Protection Inquiries
                                </p>
                                <p className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>
                                    privacy@nexauracomputers.lk • +94 11 234 5678
                                </p>
                            </div>
                            <Link to="/contact-us" className="btn-primary text-xs gap-1 py-2 px-4 w-fit">
                                Contact Support <HiChevronRight />
                            </Link>
                        </div>
                    </section>

                </div>

            </div>
            <Footer />
        </div>
    );
}

