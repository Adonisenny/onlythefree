import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authcontext";
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import { Link } from "react-router-dom";
import Notification from "./Notifications";


const Regform = () => {
    const {dispatch} = useContext(AuthContext)
    const [email,setEmail] =useState('')
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('' && Number)
    const [Error,setError] =useState(null)
    const [isdisabled,setIsdisabled] =useState(true)
    const[allUsername,setAllUsername] =useState('')
    const[pops,setPops] =useState()
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
          
            const res = await axios.post('https://backendrumors.onrender.com/api/auth/register',information)
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
                    const response = await axios.get(' https://backendrumors.onrender.com/api/auth/users')
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


    return (
        <> {pops && <Notification message="Registered successfully!" onClose={closeNotify} />}  
<form className="contains">
  
    
<input 
className="myinput rounded-2xl"
type="text"
placeholder="Email"
onChange= {(e) => setEmail(e.target.value)}
value={email}


/>

<input 
className="myinput rounded-2xl"
type= "text"
placeholder="username"
onChange= {(e) => setUsername(e.target.value)}
value={username}

/>

<input 
className="myinput rounded-2xl"
type="password"
placeholder="password must include letters and numbers"
onChange= {(e) => setPassword(e.target.value)}
value={password}


/>

<button onClick={handleSubmit} disabled={isdisabled}>Submit</button>
<br /> <br />

<p>If you are registered <Link to='/login' className='loglink'>Login.</Link></p>
</form>

</>
    );
}
 
export default Regform;