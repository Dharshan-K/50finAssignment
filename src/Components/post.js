import { useState,useEffect } from "react";
import axios from "axios";

export function Post(){
    const [post,setPost] = useState();
    useEffect(()=>{
        async function getPost(){
            await axios.get(`http://127.0.0.1:8000/post/${postId}`).then(response=>{
                console.log(response.data)
            })
        }
    })

    return(<div>
        <h1>post</h1>
    </div>)

}