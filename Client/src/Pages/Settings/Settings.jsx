import './Settings.css'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import axios from "axios";


export default function Settings() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const { user,dispatch } = useContext(Context);

  const PF="http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
        
      } catch (err) {

      }
    }
    try {
       const res=await axios.put("/users/"+user._id, updatedUser);
       setSuccess(true);
       dispatch({type:"UPDATE_START",payload:res.data})
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"})
    }

  }

  ///////////////////////////////////////////////
  console.log(user);
                      
  const handleDelete=async ()=>{                                     
    try {  
        console.log(`/users/${user._id}`);
                                                                
        await axios.delete(`/users/${user._id}`,{data:{userId:user._id}});      
        localStorage.clear();
        window.location.replace("/");   
                                  
    } catch (err) {                                                
        console.log(err);                                          
    }                                                               
                                                                     
}                                                                      
 ////////////////////////////////////////////////////////////
  return (
    <div className='Settings'>
      <div className="SettingsWrapper">
        <div className="settingsTitle">
          <span className="SettingsUpdateTitle">Update your Account</span>
          <span className="SettingsDeleteTitle"
          onClick={handleDelete}    //
          >Delete Account</span>
        </div>
        <form className="SettingsForm" onSubmit={handleSubmit}>
          <label >Profile Picture</label>
          <div className="SettingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />

            <label htmlFor="FileInput">
              <i className="SettingsPPIcon fa-regular fa-user"></i>
            </label>
            <input type="file" id='FileInput' style={{ display: "none" }} 
              onChange={e => setFile(e.target.files[0])}
            />

          </div>

          <label>Username : </label>
          <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)}/>
          <label>Email : </label>
          <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)}/>
          <label>Password : </label>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
          <button className="SettingsSubmit" type='submit'>Update</button>
          {success && <span style={{color: "green ",textAlign:'center' , marginTop:'20px' }}>Updated Successfully!</span>}
        </form>

      </div>
      <Sidebar />
    </div>
  )
}
