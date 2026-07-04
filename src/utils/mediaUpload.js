import {createClient} from "@supabase/supabase-js"

let url = "https://uxnhrsevcgwxorbkqpwu.supabase.co"
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4bmhyc2V2Y2d3eG9yYmtxcHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNTI4NjUsImV4cCI6MjA5ODcyODg2NX0.6oVES7TJaGHyIaIBWckdqnepDjXznmnDATCNBA6jAmk"
const supabase = createClient (url, key);

export default function uploadMedia(file){
    return new Promise(
        (resolve, reject) => {
            if(file == null){
                reject("No file selected."); 
            }else {
                const timeStamp = new Date().getTime();
                const fileName = timeStamp + "_" + file.name;

                supabase.storage
                .from("i-computers-images")
                .upload(fileName, file, {
                upsert : false,
                cacheControl : "3600",

            }).then((response)=>{
                
                console.log("Upload Successful.", response);
                const publicUrl = supabase.storage
                .from("i-computers-images")
                .getPublicUrl(fileName).data.publicUrl;

                resolve(publicUrl);

            }).catch((error)=>{

                reject(error);
            })
            }
        }
    )
}
