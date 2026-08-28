import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function RegisterPage({ setUser }) {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister() {

        if(password !== confirmPassword){
            toast.error("Passwords do not match.")
            return;
        }

        api.post("/users", {
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName
        }).then((response)=>{

            toast.success("Registered Successful.")
            navigate("/login")
            {/*if(response.data.isAdmin){
                navigate("/login")
            }*/}

        }).catch((error)=>{
            toast.error(error.response.data.message)
        });
    }


    return (
        <div className = " w-full min-h-[calc(100vh-100px)] flex items-center justify-center bg-[url('/login-bg.jpg')] bg-cover" >
            
            <div className = "w-0 lg:w-1/2 h-full">
            </div>

            <div className = "w-80 lg:w-1/2 h-full flex justify-center items-center ">
                <div className = "w-100 h-145 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">

                    <h1 className="text-4xl font-bold mb-8 text-secondary">Sign Up</h1>
                    
                    <input 
                        onChange = {
                            (e) => {
                                setEmail(e.target.value)
                            }
                        }
                        value = {email}

                        placeholder="Email" 
                        className="w-3/4 p-3 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input 
                        onChange = {
                            (e) => {
                                setFirstName(e.target.value)
                            }
                        }
                        value = {firstName}

                        placeholder="First Name" 
                        className="w-3/4 p-3 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input 
                        onChange = {
                            (e) => {
                                setLastName(e.target.value)
                            }
                        }
                        value = {lastName}

                        placeholder="Last Name" 
                        className="w-3/4 p-3 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        onChange = {
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                        value = {password}

                        placeholder="Password"
                        type="password"
                        className ="w-3/4 p-3 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        onChange = {
                            (e) => {
                                setConfirmPassword(e.target.value)
                            }
                        }
                        value = {confirmPassword}

                        placeholder="Confirm Password"
                        type="password"
                        className ="w-3/4 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />                
                    <button onClick={handleRegister} className="w-3/4 p-3 mt-6 rounded-lg bg-accent text-primary font-bold hover:bg-accent-dark transition duration-300">
                        Sign Up
                    </button>
                </div>
            </div>
        
        </div>
    )
}
