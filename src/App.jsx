import './App.css'
import { Route, Routes } from "react-router-dom"
import Header from "./components/header.jsx"
import HomePage from "./pages/homePage.jsx"
import AdminPage from "./pages/adminPage.jsx"
import LoginPage from "./pages/loginPage.jsx" 
import TestPage from "./pages/testPage.jsx"
import { Toaster } from "react-hot-toast"

function App() {

  return (
        <div className= "w-full min-h-screen bg-primary">
        <Toaster position = 'top-right'/>
        <Header/>

        <div className="pt-25 min-h-screen">
            <Routes>
              <Route path="/*" element={<HomePage/>}></Route>
              <Route path="/admin/*" element={<AdminPage/>}></Route>
              <Route path="/test" element = {<TestPage/>}></Route>
              <Route path="/login" element = {<LoginPage/>}></Route>
            </Routes>
        </div>
        </div>
  )
}

export default App
