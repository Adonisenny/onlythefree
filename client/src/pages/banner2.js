import { FaEdit,FaEnvelope } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";


import { useCommentContext } from "../Hooks/useCommentContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authcontext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useConversationContext } from "../Hooks/useConversationContext";


const ProfileBanner2 = () => {
    const {user} = useContext(AuthContext);
    const{dispatch2} = useCommentContext();
    const {conversation, dispatch4} =useConversationContext()

   
    const [profileDetails, setProfileDetails] = useState()
    const navigate = useNavigate()
     const userA = user?._id
   
  
   
     const idlocation = useLocation()
  
     const userB = idlocation.pathname.split('/')[2]
console.log(userB)

     useEffect(() => {
        const fetchit = async() => {
          
    try {
             const response = await axios.get(`https://backendrumors.onrender.com/api/profile/${userB}`)
            const pdetails =  response.data
            setProfileDetails(pdetails)
          
          
            dispatch2({payload:pdetails})
           
        
           } catch (error) {
            console.log(error)
           }
        }
        fetchit()
    },[dispatch2,userB])



     const handleMessageClick=async() => {
        try{
        const response = await axios.get(`https://backendrumors.onrender.com/api/conversation/${userA}/${userB}`)
        const otherJson =response.data
        console.log(userA,userB)
        if(otherJson){
            console.log('conversation found', response.data)
            dispatch4({type:'CREATE_CONVERSATION',payload:otherJson})

            
        }else{
            throw new Error('conversation found')
        }
    }catch(error){
        if(error.response && error.response.status===404){
            await axios.post('https://backendrumors.onrender.com/api/conversation',{
                senderId:userA,
                receiverId:userB
            })
            
            

        }else{
            console.error('Error Fetching conversation', error)
        }
    }
     
        navigate(`directmessage/${userA}/${userB}`)
    
      }
     

    

console.log(conversation)
    





    return (  


<div className="flex flex-col gap-6 items-center justify-center relative ">
    
{profileDetails?.map((detail) => {
    return <div className="text-center" key={detail?._id}> 
    
    <img src={`https://backendrumors.onrender.com/${detail?.imageUrl}`} alt="No Profile yet"  className="w-[110px] h-[110px] rounded-[50%]"/>

        <p>{detail?.bio}</p>

          {userB === userA ?<Link to={`/profilesetup/${user?._id}`} className="text-black absolute top-36  "><FaEdit /></Link>:
     <Link className="text-black absolute top-36" onClick={handleMessageClick}><FaEnvelope /></Link>} 
        </div>
   })}


</div>


    );
}
 
export default ProfileBanner2;