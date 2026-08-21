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
            return;
         }
    }

    async  function updatePassword(){
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
    }

    return(
        <div className="w-full h-full flex items-center justify-center gap-6">
            {user ? (
                <>
                    <div className="w-[400px] h-[400px] bg-white shadow-1g p-6">
                        <h1 className="text-2xl font-semibold mb-4">Basic Information</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
                            <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80 "
                        onClick={updateProfile}
                        >
                            Update Profile</button>
                    </div>



                    <div className="w-[400px] h-[400px] bg-white shadow-1g p-6 relative">
                        <h1 className="text-2xl font-semibold mb-4">Change Password</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80 absolute bottom-6"
                        onClick={updatePassword}
                        >
                            Update Password
                        </button>
                    </div>
                </>
            ) : (
                <LoadingAnimation/>
            )}
        </div>
    )
}