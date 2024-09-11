import { useState } from 'react'
import './Write.css'
import axios from 'axios';
import { useContext } from 'react'
import { Context } from "../../context/Context"

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const  newPost = {
            username: user.username,
            title,
            desc
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {

            }
        }
        try {
            
            const res = await axios.post("/posts", newPost);
            // console.log(res);
            // console.log(newPost);

            window.location.replace("/post/"+ res.data._id);
            // window.location.replace("/");

        } catch (err) {

        }

    }
    return (
        <div className='Write'>
            {
                file &&
                <img src={URL.createObjectURL(file)}
                    alt=""
                    className="WriteImg" />
            }

            <form className="Writeform" onSubmit={handleSubmit}>
                <div className="WriteformGroup">
                    <label htmlFor="FileInput">
                        <i className="WriteIcon fa-solid fa-plus"></i>

                    </label>
                    <input
                        type='file'
                        id='FileInput'
                        style={{ display: 'none' }}
                        onChange={e => setFile(e.target.files[0])} />
                    <input
                        type="text"
                        placeholder='Title'
                        className='WriteInput'
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="WriteformGroup">
                    <textarea
                        placeholder='Write your Story'
                        type='text'
                        className='WriteInput WriteText'
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="WriteSubmit" type='submit' >Publish!</button>
            </form>
        </div>
    )
}
