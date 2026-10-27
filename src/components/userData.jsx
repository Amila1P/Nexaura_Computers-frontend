import { useEffect, useState } from "react"
import api from "../utils/api.js"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { CiUser } from "react-icons/ci"

export default function UserData({ user, setUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")

        // If there's no token, ensure user state is null
        if (!token) {
            setUser(null)
            return
        }

        // If we already have a user, no need to re-fetch
        if (user) return

        try {
            const payloadBase64 = token.split(".")[1]
            const payload = JSON.parse(atob(payloadBase64))

            if (payload?.exp && Date.now() >= payload.exp * 1000) {
                localStorage.removeItem("token")
                setUser(null)
                return
            }
        } catch {
            localStorage.removeItem("token")
            setUser(null)
            return
        }

        // Fetch current user when token exists but user state is empty
        api.get("/users/me", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            if (error?.response?.status === 401) {
                localStorage.removeItem("token")
            }
            setUser(null)
        })
    }, [user, setUser])

    return (
        <div>
            {
                user ?
                <div className="flex h-full lg:w-[150px] lg:h-[50px] aspect-square relative rounded-lg">
                    <img src={user.profilePicture} referrerPolicy="no-referrer" alt="Profile Picture" className="w-full lg:w-auto aspect-square absolute lg:static rounded-lg"></img>
                    
                    <select onChange={(e) => {
                        if (e.target.value === "option2") {
                            navigate("/my-orders");
                        } else if (e.target.value === "option3") {
                            navigate("/settings");
                        } else if (e.target.value === "option4") {
                            localStorage.removeItem("token");
                            setUser(null);
                            navigate("/login");
                        }

                        e.target.value = "option1";
                    }}
                    className="absolute lg:static text-transparent lg:text-white text-center w-full h-full"
                    >
                        <option value="option1" className="bg-secondary text-white">{user.firstName}</option>
                        <option value="option2" className="bg-secondary text-white">My Orders</option>
                        <option value="option3" className="bg-secondary text-white">Settings</option>
                        <option value="option4" className="bg-secondary text-white">Logout</option>
                    </select>
                </div>
                :
                <>
                    <Link className="lg:text-white lg:text-lg lg:font-semibold lg:mr-4 lg:hover:text-gray-300" to="/login">
                        <CiUser />
                    </Link>
                    <Link className="text-white text-lg font-semibold mr-4 hover:text-gray-300 hidden lg:block" to="/register">
                        Register
                    </Link>
                </>
            }
        </div>
    )
}
