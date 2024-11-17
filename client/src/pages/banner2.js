import { FaEdit,FaEnvelope, FaHome } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { useCommentContext } from "../Hooks/useCommentContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authcontext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useConversationContext } from "../Hooks/useConversationContext";
import ImageModal from "./myprofile/Modal";


const ProfileBanner2 = () => {
    const {user} = useContext(AuthContext);
    const{dispatch2} = useCommentContext();
    const { dispatch4} =useConversationContext()
    const [isModalOpen,setIsModalOpen] =useState(false)
   
    const [profileDetails, setProfileDetails] = useState()
    const navigate = useNavigate()
     const userA = user?._id
     const idlocation = useLocation()
     const userB = idlocation.pathname.split('/')[2]


     const toggleModal =() => setIsModalOpen(!isModalOpen)


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



  
        

//function for handling message routing
     const handleMessageClick=async() => {
        try{
        const response = await axios.get(`https://backendrumors.onrender.com/api/conversation/${userA}/${userB}`)
        const otherJson =response.data
        
        if(otherJson){
          
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
     
     

    
 return (  
<>
<Link to='/' className="text-white hidden md:block">OnlytheFree</Link>
<div className="flex flex-col gap-6 items-center justify-center relative ">
    
{profileDetails?.map((detail) => {
    return <div className="text-center " key={detail?._id} > 
    
    <img src={`https://backendrumors.onrender.com/${detail?.imageUrl}`}
     alt="No Profile yet"  
     className="w-[110px] h-[110px] rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer"
    onClick={toggleModal}
    
    
    />
    <ImageModal
    isOpen={isModalOpen}
    onClose={toggleModal}
    imageUrl={`https://backendrumors.onrender.com/${detail?.imageUrl}`}
   

    
    />
{console.log(detail?.imageUrl)}


        <p>{detail?.bio}</p>

          {userB === userA ?<Link to={`/profile/profilesetup/${user?._id}`} className="text-black absolute top-36  "><FaEdit /></Link>:
     <Link className="text-black absolute top-36" onClick={handleMessageClick}><FaEnvelope /></Link>} 
        </div>
   })}


</div>
</>

    );
}
 
export default ProfileBanner2;