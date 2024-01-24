import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Post } from './Components/post'; 
import { BrowserRouter,RouterProvider,createBrowserRouter } from 'react-router-dom';
import Editor from './Components/Editor';
const forEdit = true;
const forPost = false;


const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/post/:postId", element: <Post />},
  {path: "/Editor/:postId", element:<Editor edit={forEdit}/>},
  {path: "/Editor", element:<Editor edit={forPost}/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
