import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";


const RenderNavbar = ({children}) => {

    const [showNavbar,setShowNavbar] = useState(false)
    const locateit = useLocation()
    const profilepath =locateit.pathname.split('/')[1]
    console.log(profilepath)
    

useEffect(() => {

if(profilepath === 'profile'){
   
    setShowNavbar(false)
}else{
    setShowNavbar(true)
}
},[profilepath])
useEffect(() => {

    if(profilepath === 'login' || profilepath==='registration'){
       
        setShowNavbar(false)
    }else{
        setShowNavbar(true)
    }
    },[profilepath])

   
    

    return ( 

        <div>

        {showNavbar &&   children}
        </div>
     );
}
 
export default RenderNavbar;