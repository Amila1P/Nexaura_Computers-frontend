import { Routes, Route } from "react-router-dom"
import ProductPage from "./productPage.jsx"
import ProductOverviewPage from "./productOverview.jsx"
import CartPage from "./cart.jsx"
import CheckoutPage from "./checkout.jsx"
import CustomerOrdePage from "./customerMyOrdersPage.jsx"
import SetingsPage from "./settings.jsx"
import TestPage from "./testPage.jsx"
import BottomNavigationBar from "../components/bottomNavigationBar.jsx"
import NotFoundPage from "./notFoundPage.jsx"
import RegisterPage from "./registerPage.jsx"
import LandingPage from "./landingPage.jsx"
import ContactUsPage from "./contactUsPage.jsx"

export default function HomePage({ user, setUser }) {
    return (
        <div className="w-full min-h-screen" style={{ background: "#080C14" }}>
            <div className="w-full min-h-[calc(100vh-70px)] pt-[70px]">
                <Routes>
                    <Route path="/"            element={<LandingPage />} />
                    <Route path="/products"    element={<ProductPage />} />
                    <Route path="/contact-us"  element={<ContactUsPage />} />
                    <Route path="/overview/:productId" element={<ProductOverviewPage />} />
                    <Route path="/cart"        element={<CartPage />} />
                    <Route path="/my-orders"   element={<CustomerOrdePage />} />
                    <Route path="/settings"    element={<SetingsPage />} />
                    <Route path="/checkout"    element={<CheckoutPage />} />
                    <Route path="/register"    element={<RegisterPage setUser={setUser} />} />
                    <Route path="/test"        element={<TestPage />} />
                    <Route path="/*"           element={<NotFoundPage />} />
                </Routes>
                <BottomNavigationBar user={user} setUser={setUser} />
            </div>
        </div>
    )
}