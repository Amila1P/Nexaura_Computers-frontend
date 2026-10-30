import './App.css'
import { Route, Routes } from "react-router-dom"
import Header from "./components/header.jsx"
import HomePage from "./pages/homePage.jsx"
import AdminPage from "./pages/adminPage.jsx"
import AdminRoute from "./components/adminRoute.jsx"
import LoginPage from "./pages/loginPage.jsx"
import TestPage from "./pages/testPage.jsx"
import { Toaster } from "react-hot-toast"
import { useState } from "react"
import { GoogleOAuthProvider } from '@react-oauth/google'

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = "86279703990-j8qdi40v3l350prq7p54608s4r2ef21j.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-full min-h-screen" style={{ background: "#080C14" }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1C2740",
              color: "#E8EDF5",
              border: "1px solid #1E2D45",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
            },
            success: { iconTheme: { primary: "#10B981", secondary: "#fff" } },
            error:   { iconTheme: { primary: "#F04E37", secondary: "#fff" } },
          }}
        />
        <Header user={user} setUser={setUser} />

        <Routes>
          <Route path="/*"       element={<HomePage user={user} setUser={setUser} />} />
          <Route path="/admin/*" element={
            <AdminRoute user={user} setUser={setUser}>
              <AdminPage />
            </AdminRoute>
          } />
          <Route path="/test"    element={<TestPage />} />
          <Route path="/login"   element={<LoginPage user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
