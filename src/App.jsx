import './App.css'
import { Route, Routes } from "react-router-dom"
import Header from "./components/header.jsx"
import HomePage from "./pages/homePage.jsx"
import AdminPage from "./pages/adminPage.jsx"
import LoginPage from "./pages/loginPage.jsx" 
import TestPage from "./pages/testPage.jsx"
import { Toaster } from "react-hot-toast"
import { useState } from "react"
import { GoogleOAuthProvider } from '@react-oauth/google'

//client ID (google login console) = 86279703990-j8qdi40v3l350prq7p54608s4r2ef21j.apps.googleusercontent.com

function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId="86279703990-j8qdi40v3l350prq7p54608s4r2ef21j.apps.googleusercontent.com">
        <div className= "w-full min-h-screen bg-primary">
        <Toaster position = 'top-right'/>
        <Header user={user} setUser={setUser} />

        <div className="pt-25 min-h-screen">
            <Routes>
              <Route path="/*" element={<HomePage user={user} setUser={setUser} />}></Route>
              <Route path="/admin/*" element={<AdminPage/>}></Route>
              <Route path="/test" element = {<TestPage/>}></Route>
              <Route path="/login" element = {<LoginPage user={user} setUser={setUser} />}></Route>
            </Routes>
        </div>
        </div>
    </GoogleOAuthProvider>
  )
}

export default App
