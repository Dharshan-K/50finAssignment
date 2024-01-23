import { useEffect,useState } from "react"
import axios from "axios"
export function Home(){
    const [postState, setPostState] = useState(null)
    useEffect(()=>{
        async function getBlogs(){
            await axios.get("http://127.0.0.1:8000/blogs").then((response)=>{
                setPostState(response.data)
            })
        }

        getBlogs()
    },[])

    return(
        <div>
            <div>
                <button className="button" id="create">Create</button>
            </div>
            {
                postState && postState.length>=0 ? (<div>{postState.map((post,index)=>(<div id="BlogBody" key={index}><a href="http://localhost:3000/"><div className="title">{post.title}</div><div className="body">{post.body}</div></a><button className="button">Edit</button></div>))}</div>): (<div>No posts</div>)
            }
        </div>
    )
}