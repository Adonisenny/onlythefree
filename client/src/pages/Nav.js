import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../Context/authcontext";
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Hamburger from './hamburger';


const Navbar = () => {
 
   const  {user,dispatch} = useContext(AuthContext)
  const myusername =user?.username
  const [menuOpen,setMenuOpen] =useState(false)
  const [isdisabled,setIsDisabled] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async(e) => {
    e.preventDefault()
    dispatch({type:"SUCCESS"})
    try {
      const res = await axios.post("https://backendrumors.onrender.com/api/auth/logout")
      
      dispatch({type:"LOGOUT",payload:res.data})
      setMenuOpen(false)
      navigate('/logout')
    } catch (error) {
      console.log(error)
    }
  }



useEffect(() => {
  if(!user){
    setIsDisabled(true)
  }else{
    setIsDisabled(false)
  }

},[user])
 
  const handledisappear = () => {

  }





  
  return (
    <header className='header1'>
      <div className='bg-slate-800 rounded-[8px]'><Link to="/">
          <h2>OnlyRumors</h2>
        </Link></div>
        <hr/>
      <div className="container">
        
        {!myusername && <Link to="/registration" style={{"textDecoration":"none", "display":"flex"}} className='hidden md:block'>Register here</Link>}
       {myusername&& <Link to={`/profile/${user._id}`}  style={{"textDecoration":"none", "display":"flex"}}>{myusername}</Link>}
      
       
        {myusername && <button onClick={handleLogout}className='hidden md:block text-white'>Logout</button> }
        {myusername ?<Link to='/form' onClick={handledisappear} disabled={isdisabled} className='mr-16'>Spread</Link> : <Link to="/login" style={{"textDecoration":"none", "display":"flex"}} className='mr-16'>Login</Link>}
    
    
      </div>
      <div>
    <Hamburger setMenuOpen={setMenuOpen} menuOpen={menuOpen} handleLogout={handleLogout} myusername={myusername}/>
    </div>
    </header>
  )
}

export default Navbar