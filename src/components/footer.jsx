import { Link } from "react-router-dom";
import { HiShieldCheck, HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

export default function Footer() {
    return (
        <footer 
            className="w-full mt-auto border-t" 
            style={{ background: "#0B101B", borderColor: "#1E2D45" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2 w-fit">
                            <img src="/NexAura Logo.png" alt="NexAura Computers" className="h-9 w-auto" />
                            <span 
                                className="text-lg font-black tracking-tight" 
                                style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}
                            >
                                NexAura <span style={{ color: "#4F8EF7" }}>Computers</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#7A8BA3" }}>
                            Sri Lanka's premier destination for high-performance gaming rigs, creator workstations, genuine PC components, and cutting-edge tech peripherals.
                        </p>
                        <div className="flex items-center gap-2 pt-2 text-xs" style={{ color: "#10B981" }}>
                            <HiShieldCheck className="text-base" />
                            <span>100% Genuine Products with Official Warranty</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#E8EDF5" }}>
                            Shop & Explore
                        </p>
                        <ul className="space-y-2 text-sm">
                            {[
                                { label: "All Products", to: "/products" },
                                { label: "Gaming Rigs", to: "/products?q=Gaming+PC" },
                                { label: "Laptops", to: "/products?q=Laptop" },
                                { label: "PC Components", to: "/products?q=Component" },
                                { label: "Monitors", to: "/products?q=Monitor" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.to}
                                        className="transition-colors hover:text-[#4F8EF7]"
                                        style={{ color: "#7A8BA3", textDecoration: "none" }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account & Help */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#E8EDF5" }}>
                            Customer Portal
                        </p>
                        <ul className="space-y-2 text-sm">
                            {[
                                { label: "Track My Orders", to: "/my-orders" },
                                { label: "Shopping Cart", to: "/cart" },
                                { label: "Account Settings", to: "/settings" },
                                { label: "Sign In / Register", to: "/login" },
                                { label: "Contact Support", to: "/contact-us" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.to}
                                        className="transition-colors hover:text-[#4F8EF7]"
                                        style={{ color: "#7A8BA3", textDecoration: "none" }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Legal */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#E8EDF5" }}>
                            Information & Legal
                        </p>
                        <ul className="space-y-2 text-sm">
                            {[
                                { label: "Privacy Policy", to: "/privacy-policy" },
                                { label: "Terms of Service", to: "/terms-of-service" },
                                { label: "Sitemap", to: "/sitemap" },
                                { label: "Contact Us", to: "/contact-us" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.to}
                                        className="transition-colors hover:text-[#4F8EF7]"
                                        style={{ color: "#7A8BA3", textDecoration: "none" }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-2 text-xs space-y-1" style={{ color: "#7A8BA3" }}>
                            <div className="flex items-center gap-1.5">
                                <HiLocationMarker className="shrink-0 text-sm text-[#4F8EF7]" />
                                <span>Colombo 03, Sri Lanka</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <HiPhone className="shrink-0 text-sm text-[#4F8EF7]" />
                                <span>+94 11 234 5678</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div 
                    className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
                    style={{ borderColor: "#1E2D45", color: "#7A8BA3" }}
                >
                    <p>© 2026 NexAura Computers. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy-policy" className="hover:text-[#4F8EF7] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-of-service" className="hover:text-[#4F8EF7] transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/sitemap" className="hover:text-[#4F8EF7] transition-colors">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

