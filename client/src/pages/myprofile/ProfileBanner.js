import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/authcontext";
import { useLocation } from "react-router-dom";
import Hamburgertwo from "../../Hamburgers/hamburgers2.js";
import axios from "axios";
import { useCommentContext } from "../../Hooks/useCommentContext";
import { UseContextFunction } from "../../Hooks/useWorkoutContext";







const ProfileBanner = ({myprofile}) => {
    const {user,dispatch} = useContext(AuthContext);
    const{dispatch2} = useCommentContext();
    const {rumors} =UseContextFunction()
    const [profileDetails, setProfileDetails] = useState('')
    const [menuOpen,setMenuOpen] =useState(false)
    const myusername =user?.username
    const idlocation = useLocation()
    const userId = idlocation.pathname.split('/')[2]    

    useEffect(() => {
        const fetchit = async() => {
      
      
            try {
            const response = await axios.get('/profile')
            const pdetails = await response.data
            setProfileDetails(pdetails)
          
            dispatch2({payload:pdetails})
           
        
           } catch (error) {
            console.log(error)
           }
        }
        fetchit()
    },[dispatch2,userId])


    // Logging out

 const handleLogout = async(e) => {
    e.preventDefault()
    dispatch({type:"SUCCESS"})
    try {
      const res = await axios.post(" https://backendrumors.onrender.com/api/auth/logout")
      dispatch({type:"LOGOUT",payload:res.data})
      setMenuOpen(false)
    } catch (error) {
      console.log(error)
    }
  }


return ( 

<div className="relative flex">

     
<Hamburgertwo handleLogout={handleLogout} setMenuOpen={setMenuOpen} menuOpen={menuOpen} myusername={myusername}/>

</div>

     );
}
 
export default ProfileBanner;