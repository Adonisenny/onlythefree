import axios from "axios"; 
import { useEffect } from "react";

import { useLocation } from "react-router-dom";


const Likes = () => {
    const idlocation = useLocation()
    const userId = idlocation.pathname.split('/')[3]
    console.log(userId)

  
    useEffect(() => {
const fetchIt = async() => {
   try {
    const res = await axios.get(`http://localhost:7000/api/profile/likes/${userId}`)
   
   } catch (error) {
    console.log('can not not get the data')
   }
}
fetchIt()
    },[userId])
    return ( 
<div>


</div>

     );
}
 
export default Likes;
<div>


</div>
