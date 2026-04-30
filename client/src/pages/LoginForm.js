import { useContext, useState } from "react";
import { AuthContext } from "../Context/authcontext";
import { useNavigate } from "react-router-dom";
import './form.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import Notification from "./Notifications";




const Loginform = () => {
    const {dispatch} = useContext(AuthContext)

    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
    const [Error,setError] =useState(null)
    const [poping,setPoping] = useState(false)
    const [showpassword,setShowPassword] =useState(false)
     const navigate = useNavigate()
   


    const handleSubmit = async(e) => {
        e.preventDefault()
        const loginfo= {username,password}
        if(!username && !password){
            setError("Complete all fields")
        }
        dispatch({type:"LOGIN_START"})
       
        try {
          
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,loginfo)
             const otherJson =  res.data
           
            
                setUsername("")
                setPassword("")
                
                dispatch({type:"LOGIN_SUCCESS",payload:otherJson})
                setError(null)
                
                    setPoping(true)
                    setTimeout(() => {
                        navigate('/')
                    },2000)
                  
    
                  


        } catch (error) {
            setError("username or password incorrect")
           
        }
    }

    const closeNotify = () =>{
        setPoping(false)
            }

const handleShow =() => {
    setShowPassword((prev)=> !prev)
}




    return (  
        <>
         {poping && <Notification message="Logged in successfully!" onClose={closeNotify} />}
         {poping && <Notification message={`welcome ${username}`}
         
         
         onClose={closeNotify} />}



        


<div className="body">
<div className="container">
    
<div className="login-box">
    <h2>Login</h2>
<form>
   
<input 
className="myinput"
type= "text"
onChange= {(e) => setUsername(e.target.value)}
value={username}
placeholder="Username"


/>

 
<input 
className="myinput"
type={showpassword ? 'text':'password'}
placeholder="password"

onChange= {(e) => setPassword(e.target.value)}
value={password}


/>

         
<Link onClick={handleSubmit} className="link"><span>

</span>
            <span></span>
            <span></span>
            <span></span>
            Submit</Link>
</form>
 {Error &&  <p style={{"backgroundColor":"white","color":"red","paddingLeft":"30px","paddingTop":"15px",'paddingBottom':'15px','borderRadius':'8px'}}>{Error}</p>}
<p>If you are not registered <Link to='/registration' className='reglink'>Register.</Link></p>
</div>
</div>
</div>
</>

    );
}
 
export default Loginform;
