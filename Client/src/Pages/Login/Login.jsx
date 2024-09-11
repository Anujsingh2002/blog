import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch ,isFetching}=useContext(Context);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});

    try {
      const res=await axios.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    } catch (err) {
      dispatch({type:"LOGIN_FAILURE"});
    }
  };
  // console.log(user);
  // console.log(isFetching);
  return (
    <div className='Login'>
        <span className="LoginTitle">Login</span>
        <form className="LoginForm" onSubmit={handleSubmit}>
            <label >Username</label>
            <input 
            type="text" 
            className='LoginInput' 
            placeholder='Enter your username' 
            ref={userRef}/>

            <label >Password</label>
            <input 
            type="password" 
            className='LoginInput' 
            placeholder='Enter your Passwword' 
            ref={passwordRef}/>

            <button className="LoginButton" type='submit' disabled={isFetching}>Login</button>
            
        </form>
        <button className="LoginRegisterButton">
          <Link className='link' to='/register'>Register</Link></button>
    </div>
  )
}
