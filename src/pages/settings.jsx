import {useState, useEffect} from "react";
import LoadingAnimation from "../components/LoadingAnimation.jsx";
import api from "../utils/api.js";
import toast from "react-hot-toast";
import uploadMedia from "../utils/mediaUpload.js";

export default function SettingsPage(){
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    
    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if(token){
                api.get("/users/me", {
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                }).then((response) => {
                    setUser(response.data)
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                }).catch((error) => {
                    console.log(error)
                });
            }
        }, []
    )

    async function updateProfile(){
        setIsUpdatingProfile(true);
        const token = localStorage.getItem("token");
        let profilePicture = user.profilePicture; 
         try{
            if(imageFile){
                profilePicture = await uploadMedia(imageFile);
            }

            const response = await api.put("/users", {
                firstName: firstName,
                lastName: lastName,
                profilePicture: profilePicture
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            localStorage.setItem("token", response.data.token)
            toast.success("Profile updated successfully");
            window.location.reload();
         }catch(error){
            console.log(error);
            toast.error("Error uploading profile picture");
            setIsUpdatingProfile(false);
            return;
         }
    }

    async  function updatePassword(){
        setIsUpdatingPassword(true);
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        const token = localStorage.getItem("token");
        try{
            await api.put("/users/password", {
                newPassword: password
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            toast.success("Password updated successfully");
            setPassword("");
            setConfirmPassword("");
            window.location = "/login";
        
        }catch(error){
            console.log(error);
            toast.error("Error updating password");
        }

        setIsUpdatingPassword(false);
    }

    return(
        <div className="min-h-screen w-full bg-[#0F0F12] text-gray-100 flex items-center justify-center p-6">
            {user ? (
                <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full justify-center items-stretch">
                    {/* Basic Information Card */}
                    <div className="w-full md:w-[450px] bg-[#2A2D3E]/60 border border-[#2A2D3E] backdrop-blur-xl rounded-2xl p-8 shadow-2xl flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300">
                        <div>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2A2D3E]">
                                <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6]"></div>
                                <h1 className="text-xl font-bold tracking-wide uppercase text-white">Basic Information</h1>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-[#0F0F12] border border-[#2A2D3E] rounded-xl py-3 px-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all duration-200 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full bg-[#0F0F12] border border-[#2A2D3E] rounded-xl py-3 px-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all duration-200 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Profile Picture</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                        className="w-full bg-[#0F0F12] border border-[#2A2D3E] rounded-xl py-2 px-3 text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#2A2D3E] file:text-[#8B5CF6] hover:file:bg-[#8B5CF6] hover:file:text-white cursor-pointer focus:outline-none focus:border-[#8B5CF6] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            className="mt-8 w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs"
                            onClick={updateProfile}
                            disabled={isUpdatingProfile}
                        >
                            {isUpdatingProfile ? "Updating..." : "Update Profile"}
                        </button>
                    </div>

                    {/* Change Password Card */}
                    <div className="w-full md:w-[450px] bg-[#2A2D3E]/60 border border-[#2A2D3E] backdrop-blur-xl rounded-2xl p-8 shadow-2xl flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300">
                        <div>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2A2D3E]">
                                <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6]"></div>
                                <h1 className="text-xl font-bold tracking-wide uppercase text-white">Change Password</h1>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="password">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#0F0F12] border border-[#2A2D3E] rounded-xl py-3 px-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all duration-200 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="confirmPassword">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#0F0F12] border border-[#2A2D3E] rounded-xl py-3 px-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all duration-200 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            className="mt-8 w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs"
                            onClick={updatePassword}
                            disabled={isUpdatingPassword}
                        >
                            {isUpdatingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[300px]">
                    <LoadingAnimation/>
                </div>
            )}
        </div>
    )
}