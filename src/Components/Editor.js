
/** @format */
import '../App.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Editor({ edit }) {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("")
  const blogId = useParams();
  const navigate = useNavigate()

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  useEffect(() => {
    const getBlog = async () => {
      await axios.get(
        `https://five0fin-backend.onrender.com/post/${blogId.postId}`
      ).then((response)=>{
        setTitle(response.data.title)
        setValue(response.data.body)
        console.log(response.data)
        console.log(blogId.postId)
      })
      
    };

    if(edit){
        getBlog();
        console.log("getting the blog")
    }
  }, []);


  const updatePost = async () => {
    const postTitle = document.getElementById("title");

    const postData = {
      title: postTitle.value,
      body: value,
    };
    console.log(postData);
    await axios
      .put(`https://five0fin-backend.onrender.com/post/${blogId.postId}`, postData)
      .then((response) => {
        navigate("/");

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createPost = async () => {
    const postTitle = document.getElementById("title");

    const postData = {
      title: postTitle.value,
      body: value,
    };
    console.log(postData);
    await axios
      .post(`https://five0fin-backend.onrender.com/posts`, postData)
      .then((response) => {
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (editedContent) => {
    console.log(editedContent);
    setValue(editedContent);
  };

  return (
    <div>
      {edit ? (
        <div>
            <div className='editTitle'>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
            </div>
          <ReactQuill
            value={value}
            modules={modules}
            theme="snow"
            onChange={handleChange}
            className='reactQuill'
          />
          <div>
            <button className="btn btn-primary" onClick={updatePost}>
              Finish
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
          <div>
            <ReactQuill
              value={value}
              modules={modules}
              theme="snow"
              onChange={handleChange}
              placeholder="Compose your blog......"
            />
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  createPost();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}