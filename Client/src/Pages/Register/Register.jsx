import { useState } from 'react'
import axios from 'axios';
import './Register.css'
import { Link } from 'react-router-dom'
export default function Register() {
  const [username,setUsername]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [error,setError]=useState(false);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError(false);
    try{
    const res=await axios.post('/auth/register',{
      username,
      email,
      password
    });
    res.data && window.location.replace('/login');
  }
  catch(err){
    setError(true);
  }
   
  }
  return (
    <div className='Register'>
        <span className="RegisterTitle">Register</span>
        <form className="RegisterForm" onSubmit={handleSubmit}>
            <label >Username</label>
            <input 
            type="text" 
            className='RegisterInput' 
            placeholder='Enter your Username'
            onChange={e=>setUsername(e.target.value)}
            />
            <label >Email</label>
            <input 
            type="email" 
            className='RegisterInput' 
            placeholder='Enter your Email'
            onChange={e=>setEmail(e.target.value)}
            />
            <label >Password</label>
            <input 
            type="password" 
            className='RegisterInput' 
            placeholder='Enter your Password'
            onChange={e=>setPassword(e.target.value)}
            />
            <button className="RegisterButton" type='submit'>Register</button>
            
        </form>
        <button className="RegisterLoginButton">
        <Link className='link' to='/login'>Login</Link>
        </button>
          {error && <span style={{color:'red',marginTop:'11px'}}>Something went wrong!</span>}
    </div>
  )
}
