import { useEffect, useState } from "react"
import api from "../utils/api.js"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

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

        // Fetch current user when token exists but user state is empty
        api.get("/users/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            console.log(error)
            setUser(null)
        })
    }, [user, setUser])

    return (
        <div>
            {
                user ?
                <div className="flex items-center gap-2">
                    <img src={user.profilePicture} alt="Profile Picture" className="w-10 h-10 rounded-full aspect-square"></img>
                    <span className="text-white text-lg font-semibold">{user.firstName} {user.lastName}
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
                        className="bg-gray-800 text-white rounded-md px-2 py-1 ml-2 text-center"
                        >
                            <option value="option1" className="bg-secondary">{user.firstName}</option>
                            <option value="option2" className="bg-secondary">My Orders</option>
                            <option value="option3" className="bg-secondary">Settings</option>
                            <option value="option4" className="bg-secondary">Logout</option>
                        </select>
                    </span>
                </div>
                :
                <>
                    <Link className="text-white hover:text-gray-300 mr-2" to="/login">Login</Link>
                    <Link className="text-white hover:text-gray-300" to="/register">Register</Link>
                </>
            }
        </div>
    )
}
