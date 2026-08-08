import { Routes, Route } from "react-router-dom"
import Header from "../components/header.jsx"
import ProductPage from "./productPage.jsx"

export default function HomePage() {
    return (
        <div className="w-full h-screen bg-primary">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)] overflow-y-scroll border">
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Home Page</h1>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/contact-us" element={<h1>Welcome to the Contact Us Page</h1>}/>
                </Routes>
            </div>
        </div>
    )
}

// Deep Navy Blue (#0B192C) - Primary color
// Crisp White / Light Gray (#F3F4F6) -Secondary color
// Electric Cyan (#00D2C4) හෝ Vivid Blue (#2563EB) - Accent color