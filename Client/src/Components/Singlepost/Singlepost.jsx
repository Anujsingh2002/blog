import { useLocation, Link } from 'react-router-dom';
import './Singlepost.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import {Context} from "../../context/Context"

export default function Singlepost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    // console.log(path);


    const [post, setPost] = useState({});

    const PF = "http://localhost:5000/images/"

    const {user}=useContext(Context);

    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [updateMode,setUpdateMode]=useState(false);


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/posts/' + path);
            setPost(res.data);

            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path])

    const handleUpdate=async ()=>{
        try {
            await axios.put(`/posts/${post._id}`,
                {username : user.username,title:title,desc:desc},);
            
            // window.location.reload();
            setUpdateMode(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete=async ()=>{
        try {
            await axios.delete(`/posts/${post._id}`,{data:{username:user.username}});
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        }
        
    }
    return (
        <div className='Singlepost'>
            <div className="SinglepostWrapper">

                {post.photo &&
                    (<img
                        src={PF + post.photo}
                        alt="post ki tasvir"
                        className="SinglepostIMG"
                    />)
                }
                {updateMode?<input type='text' value={title} className="SinglepostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>:(
                <h1 className="SinglepostTitle">
                    {title}
                    {/* <span>title</span> */}
                    {post.username === user?.username &&
                        <div className="SinglepostEdit">
                            <i className="SinglepostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                            <i className="SinglepostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                        </div>
                    }
                </h1>
                )}

                <div className="SinglepostInfo">
                    <span className="SinglepostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>

                    </span>

                    <span className="SinglepostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>

                {updateMode?<textarea className='SinglepostDesc' value={desc}  onChange={(e)=>setDesc(e.target.value)}/>:(
                <p className='SinglepostDesc'>
                    {desc}
                </p>
                )}
                {updateMode && <button className="SinglePostButton" onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
}
