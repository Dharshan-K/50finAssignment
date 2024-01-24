import { useEffect,useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
export function Home(){
    const [postState, setPostState] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        async function getBlogs(){
            await axios.get("https://five0fin-backend.onrender.com/blogs").then((response)=>{
                setPostState(response.data)
            })
        }

        getBlogs()
    },[])

    const handleClick = (postId)=>{
        navigate(`/Editor/${postId}`)
    }

    const handleCreate=()=>{
        navigate('/Editor')
    }

    const handleDelete = async(postId)=>{
        await axios.delete(`https://five0fin-backend.onrender.com/post/${postId}`).then(response=>{
            console.log(response)
            navigate("/")
        })
    }

    return(
        <div>
            <div>
                <button className="button" id="create" onClick={handleCreate}>Create</button>
            </div>
            {
                postState && postState.length>=0 ? (
                <div>{postState.map((post,index)=>
                    (<div id="BlogBody" key={index}>
                        <Link className="Link" to={`/post/${post.id}`}>
                            <div className="title">{post.title}</div>
                            <div className="body"><div dangerouslySetInnerHTML={{ __html: post.body }}></div></div></Link>
                        <button className="button" onClick={()=>{handleClick(post.id)}}>Edit</button>
                        <button className="button" onClick={()=>{handleDelete(post.id)}}>Delete</button>
                    </div>))}</div>): (<div>No posts</div>)
            }
        </div>
    )
}

