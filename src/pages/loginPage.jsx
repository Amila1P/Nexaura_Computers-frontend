import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        console.log("Email : ", email);
        console.log("Password : ", password);

        //backend localhost:3000/users/login

        axios.post(import.meta.env.VITE_API_URL + "/users/login", {
            email : email,
            password : password
        }).then((response)=>{

            //console.log("Login Successful.", response.data);
            toast.success("Login Successful.")
            localStorage.setItem("token", response.data.token);

            if(response.data.isAdmin){
                //redirect to admin dashbord
                navigate("/admin")
            }else{
                //redirect to user dashbord
                navigate("/")
            }

        }).catch((error)=>{
            //alert(error.response.data.message);
            //console.log("Login Failed.", error);
            toast.error(error.response.data.message)
        });
    }


    return (
        <div className = " w-full min-h-[calc(100vh-100px)] flex items-center justify-center bg-[url('/login-bg.jpg')] bg-cover" >
            
            <div className = "w-1/2 h-full">
            </div>

            <div className = "w-1/2 h-full flex justify-center items-center ">
                <div className = "w-[400px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">

                    <h1 className="text-4xl font-bold mb-8 text-secondary">Sign In</h1>
                    
                    <input 
                        onChange = {
                            (e) => {
                                console.log(e.target.value)
                                setEmail(e.target.value)
                            }
                        }
                        value = {email}

                        placeholder="Email" 
                        className="w-3/4 p-3 mb-6 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        onChange = {
                            (e) => {
                                console.log(e.target.value)
                                setPassword(e.target.value)
                            }
                        }
                        value = {password}

                        placeholder="Password"
                        type="password"
                        className ="w-3/4 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <p className = "mb-6 w-3/4 text-right" >Forget Password? <Link to="/forgot-password" className="text-accent">Click here</Link></p>
                
                    <button onClick={handleLogin} className="w-3/4 p-3 mb-6 rounded-lg bg-accent text-primary font-bold hover:bg-accent-dark transition duration-300">
                        Sign In
                    </button>
                    <p className = "w-3/4 text-center">Don't have an account? <Link to="/register" className="text-accent">Register</Link></p> 
                </div>
            </div>
        
        </div>
    )
}