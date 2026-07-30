import './App.css'
import ProductCard from "./components/productCard.jsx"
import TrendingProducts from './components/trendingProducts.jsx'
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homePage.jsx"
import AdminPage from "./pages/adminPage.jsx"
import LoginPage from "./pages/loginPage.jsx" 
import TestPage from "./pages/testPage.jsx"
import { Toaster } from "react-hot-toast"

function App() {

  return (
        <div className= "w-full h-screen border-black border-[5px] flex justify-center items-center bg-primary">

        <Toaster position = 'top-right'/>
          <Routes>
            <Route path="/*" element={<HomePage/>}></Route>
            <Route path="/admin/*" element={<AdminPage/>}></Route>
            <Route path="/test" element = {<TestPage/>}></Route>
            <Route path="/login" element = {<LoginPage/>}></Route>
          </Routes>
          
        </div>
  )
}

export default App
