import { Routes, Route, Link } from "react-router-dom"
import AdminProductPage from "./admin/adminProductPage.jsx"
import AdminAddProductPage from "./admin/adminAddProductPage.jsx"
import AdminEditProductPage from "./admin/adminEditProductPage.jsx"
import AdminOrdersPage from "./admin/adminOrdersPage.jsx"

export default function AdminPage() {
    return (
        <div className = "w-full min-h-[calc(100vh-100px)] flex justify-center bg-accent">

            <div className = "w-[300px] h-full fixed left-0 z-[9999] bg-accent text-white">

                {/*
                <a href = "/admin/products" className = "block py-2 px-4 hover:bg-gray-700">Products</a>
                <a href = "/admin/users" className = "block py-2 px-4 hover:bg-gray-700">Users</a>
                <a href = "/admin/reviews" className = "block py-2 px-4 hover:bg-gray-700">Reviews</a>
                */}

                <Link to="/admin/" className = "block py-2 px-4 hover:bg-gray-700">Orders</Link>
                <Link to="/admin/products" className = "block py-2 px-4 hover:bg-gray-700">Products</Link>
                <Link to="/admin/users" className = "block py-2 px-4 hover:bg-gray-700">Users</Link>
                <Link to="/admin/reviews" className = "block py-2 px-4 hover:bg-gray-700">Reviews</Link>

            </div>

            <div className = "w-full ml-[300px] h-full bg-blue-900 border-[10px] border-accent rounded-2xl ">

                <Routes>
                    <Route path = "/" element = { <AdminOrdersPage/>} />
                    <Route path = "/products" element = { <AdminProductPage />} />
                    <Route path = "/add-products" element = {<AdminAddProductPage/>} />
                    <Route path = "/edit-products" element = {<AdminEditProductPage/>} />
                    <Route path = "/users" element = { <h1>User Management</h1>} />
                    <Route path = "/reviews" element = { <h1>Review Management</h1>} />
                </Routes>

            </div>

        </div>
    )
}