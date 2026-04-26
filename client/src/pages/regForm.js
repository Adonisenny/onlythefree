import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authcontext";
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import { Link } from "react-router-dom";
import Notification from "./Notifications";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Regform = () => {
    const {dispatch} = useContext(AuthContext)
    const [email,setEmail] =useState('')
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('' && Number)
    const [Error,setError] =useState(null)
    const [isdisabled,setIsdisabled] =useState(true)
    const[allUsername,setAllUsername] =useState('')
    const[pops,setPops] =useState()
    const[showPassword,setShowPassword] =useState(false)
    const navigate = useNavigate()
   
const mymail= email.includes('@')
const mypassword = /\d/.test(password);





useEffect(()=>{
    if(!mymail){
        setError("your email must include @")
    }else if(!mypassword){
        setError('include numbers')
    }else{
        setError('')
    }
},[mymail,mypassword])
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        const information= {email,username,password}
        if(!email && !username && !password){
            setError("Complete all fields")
        }
        dispatch({type:"LOGIN_START"})
       
        try {
          
            const res = await axios.post('http://localhost:7000/api/auth/register',information)
             const otherJson = await res.data
           
            
                setUsername("")
                setPassword("")
                setEmail("")
                dispatch({payload:otherJson})
                setError(null)
                navigate('/login')
            
        } catch (error) {
            setError("Something went wrong")
            
        }
    }
    useEffect(() => {
                const fetchit = async() => {
              
              
                    try {
                    const response = await axios.get('http://localhost:7000/api/auth/users')
                    const allusers = await response.data
                   
                    setAllUsername(allusers)
            
                   } catch (error) {
                    console.log(error)
                   }
                }
                fetchit()
            },[username])
          





const tryusers =allUsername && allUsername?.map((allu) => {
  return allu?.username
})
const checkusers = tryusers?.includes(username)
useEffect(()=> {
    if(checkusers){
        setError('username already exist')
    }else{
        setError('')
    }
},[checkusers])



    const  passwordLength =password.length
    useEffect(()=>{
        if(passwordLength >=8 && mymail && !checkusers && mypassword){
            setIsdisabled(false)
        }else{
            setIsdisabled(true)
        }
    },[passwordLength,mymail,checkusers,mypassword])
    const closeNotify = () =>{
        setPops(false)
            }



            const handleShow =() => {
                setShowPassword((prev)=> !prev)
            }


    return (
        <>
         {pops && <Notification message="Registered successfully!" onClose={closeNotify} />} 
         <Link to='/' className="text-white block">OnlytheFree</Link>

 <div className="body"> 
<div className="container">
<div className="login-box">
<h2>Register</h2>


<form>

    
<input 
className="myinput"
type="text"
placeholder="email"
onChange= {(e) => setEmail(e.target.value)}
value={email}


/>

<input 
className="myinput"
type= "text"
placeholder="username"
onChange= {(e) => setUsername(e.target.value)}
value={username}

/>

<input 
className="myinput"
placeholder="password(include numbers)"
onChange= {(e) => setPassword(e.target.value)}
value={password}
type={showPassword ? 'text':'password'}

/>
{/*the eyes */}

<span 
onClick={handleShow}
className="password-toggle-icon left-[312px] top-[52%] md:top-[50%] md:left-[765px]"

><i>{showPassword ? <FaEyeSlash /> : <FaEye />}</i>

</span>






<Link onClick={handleSubmit} className="link" disabled={isdisabled}>
<span></span>
            <span></span>
            <span></span>
            <span></span>

Submit</Link>


<p>If you are registered <Link to='/login' className='reglink'>Login.</Link></p>
</form>
</div>
</div>
</div>
</>
    );
}
 
export default Regform;