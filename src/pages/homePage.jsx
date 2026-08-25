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

export default function HomePage({ user, setUser }) {
    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-white">
            <div className="w-full min-h-[calc(100vh-100px)] overflow-y-auto">
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Home Page</h1>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/contact-us" element={<h1>Welcome to the Contact Us Page</h1>}/>
                    <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/my-orders" element={<CustomerOrdePage/>}/>
                    <Route path="/settings" element={<SetingsPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>

                    <Route path="/test" element={<TestPage/>}/>
                </Routes>
                <BottomNavigationBar user={user} setUser={setUser}/>
            </div>
        </div>
    )
}

// Deep Navy Blue (#0B192C) - Primary color
// Crisp White / Light Gray (#F3F4F6) -Secondary color
// Electric Cyan (#00D2C4) or Vivid Blue (#2563EB) - Accent color