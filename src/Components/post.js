import { useState,useEffect } from "react";
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import '../App.css';

export function Post(){
    const [post,setPost] = useState({title: '', body: '', id:''});
    const {postId} = useParams()
    const navigate = useNavigate()

    const handleClick = (postId)=>{
        navigate(`/Editor/${postId}`)
    }

    useEffect(()=>{
        async function getPost(){
            await axios.get(`http://127.0.0.1:8000/post/${postId}`).then(response=>{
                console.log(response.data)
                setPost(response.data)
            })
        }

        getPost()
    },[])

    return(<div>
        <div className="postBody">
        <div className="singleTitle">{post.title}</div>
        <div className="singleBody">{post.body}</div>
    </div>
    <button className="button" onClick={()=>{handleClick(postId)}}>Edit</button>
    <button className="button">Delete</button>
    </div>)

}