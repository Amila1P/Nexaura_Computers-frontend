import { useState } from "react"
import uploadMedia from "../utils/mediaUpload"

export default function TestPage() {

    const [file, setFile] = useState(null);

    async function handleUpload(){
        try{
            const url = await uploadMedia(file);
            console.log(url);
        }catch(error){
            console.log(error);
        }

    }

    return (

        <div className = " w-full h-screen flex-col items-center justify-center bg-primary text-secondary">
            
            <input onChange={
                    (e) =>{ 
                        setFile(e.target.files[0])

                    }
                } type = "file"/>

            <button onClick = {handleUpload} className = "bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/80 transition-all duration-300">
                Upload
            </button>

        </div>

    )
}