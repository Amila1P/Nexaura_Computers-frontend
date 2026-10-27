import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link as RouterLink } from "react-router-dom";

export default function BottomNavigationBar({ user }) {
    const location = useLocation();

    const NAV = [
        { to: "/",        icon: GoHome,          label: "Home" },
        { to: "/products", icon: CiSearch,        label: "Products" },
        { to: "/cart",    icon: CiShoppingCart,   label: "Cart" },
        { to: user ? "/settings" : "/login", icon: CiUser, label: user ? "Account" : "Sign In" },
    ];

    return (
        <nav
            className="flex lg:hidden fixed bottom-0 left-0 w-full z-40"
            style={{
                background: "rgba(15,22,35,0.97)",
                backdropFilter: "blur(16px)",
                borderTop: "1px solid #1E2D45",
                paddingBottom: "env(safe-area-inset-bottom)",
            }}
        >
            {NAV.map(({ to, icon: Icon, label }) => {
                const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
                return (
                    <Link
                        key={to}
                        to={to}
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors duration-200"
                        style={{ color: isActive ? "#4F8EF7" : "#7A8BA3", textDecoration: "none" }}
                    >
                        <Icon className="text-2xl" />
                        <span className="text-[10px] font-medium">{label}</span>
                        {isActive && (
                            <span
                                className="absolute bottom-0 w-8 h-[2px] rounded-full"
                                style={{ background: "#4F8EF7" }}
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}