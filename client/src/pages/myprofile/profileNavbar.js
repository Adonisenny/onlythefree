import { Link } from 'react-router-dom'
import { AuthContext } from "../../Context/authcontext";
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

import { useLocation } from 'react-router-dom';
import Hamburger from '../hamburger';
import { useCommentContext } from '../../Hooks/useCommentContext';


const ProfileNavbar = () => {
 
   const  {user,dispatch} = useContext(AuthContext)
  const myusername =user?.username
  const [menuOpen,setMenuOpen] =useState(false)
  const [isdisabled,setIsDisabled] = useState(false)
  const [profileDetails, setProfileDetails] = useState('')
  const{dispatch2} = useCommentContext();
  const idlocation = useLocation()
  const userId = idlocation.pathname.split('/')[2]   
  const user_id = user?._id
  
  const handleLogout = async(e) => {
    e.preventDefault()
    dispatch({type:"SUCCESS"})
    try {
       const res = await axios.post("https://backendrumors.onrender.com/api/auth/logout")
    
      dispatch({type:"LOGOUT",payload:res.data})
      setMenuOpen(false)
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





useEffect(() => {
    const fetchit = async() => {
  
  
        try {
      
        const response = await axios.get('https://backendrumors.onrender.com/api/profile')
        const pdetails = await response.data
        setProfileDetails(pdetails)
        
      
        dispatch2({payload:pdetails})
       
    
       } catch (error) {
        console.log(error)
       }
    }
    fetchit()
},[dispatch2,userId])

  
  
  return (
    <header className='header2 bg-slate-800 rounded-[14px]' >
        <div className=' only flex '>
     
  <div className="hidden md:flex">
{(profileDetails || null ) && profileDetails?.filter(profileDetail => profileDetail?.userId === user_id).map((filteredprofile) =>{
  return <div key={filteredprofile?._id}>


 
 <img src={`https://backendrumors.onrender.com/${filteredprofile?.imageUrl}`} alt="Not seen yet"  className="w-[60px] h-[60px] rounded-[50%]"/>

   
  
    
    
   </div>
   
})

}
</div>
  
        </div>
        <hr/>
      <div className="container">
        <Link to='/'>Home</Link>
        {!myusername && <Link to="/registration" style={{"textDecoration":"none", "display":"flex"}}>Register here</Link>}
       {myusername&& <Link to={`/profile/${user._id}`}  style={{"textDecoration":"none", "display":"flex"}}>{myusername}</Link>}
      
       
        {myusername && <button onClick={handleLogout}className='hidden md:block'>Logout</button> }
        <Link to='/form' onClick={handledisappear} disabled={isdisabled} className='mr-16'>Spread</Link>
      </div>
      <div>
    <Hamburger setMenuOpen={setMenuOpen} menuOpen={menuOpen} handleLogout={handleLogout} myusername={myusername}/>
    </div>
    </header>
  )
}

export default ProfileNavbar;