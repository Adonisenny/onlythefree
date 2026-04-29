import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";


const RenderNavbar = ({children}) => {

    const [showNavbar,setShowNavbar] = useState(false)
    const locateit = useLocation()
    const profilepath =locateit.pathname.split('/')[1]
    const messagepath =locateit.pathname.split('/')[3]
    
  
    

useEffect(() => {

    if(profilepath === 'login' || profilepath==='registration' ||profilepath==='profile' || messagepath ==='directmessage' || profilepath ===''){
       
        setShowNavbar(false)
    }else{
        setShowNavbar(true)
    }
    },[profilepath,messagepath])
    // useEffect(() => {

    //     if(messagepath === 'directmessage'){
           
    //         setShowNavbar(false)
    //     }else{
    //         setShowNavbar(true)
    //     }
    //     },[messagepath])
      
        
   
    

    return ( 

        <div>

        {showNavbar &&   children}
        </div>
     );
}
 
export default RenderNavbar;
