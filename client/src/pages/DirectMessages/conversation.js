import { useContext, useEffect } from "react"
import { AuthContext } from "../../Context/authcontext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";





export const Conversation = () => {
    const  {user,dispatch} = useContext(AuthContext)
    const idlocation = useLocation()
  const navigate = useNavigate()
    const userId = idlocation.pathname.split('/')[2]
  const userA = user?._id
  const userB = userId
  // const handleMessageClick=async() => {
  //   const response = await axios.get(`https://backendrumors.onrender.com/api/conversation/${userA}/${userB}`)
  //   if(!response.data){
  //       await axios.post('https://backendrumors.onrender.com/api/conversation',{
  //           senderId:userA,
  //           receiverId:userB
  //       })
  //   }
  //   navigate('/messages')

  // }

  useEffect(() => {
    const res = axios.get('https://backendrumors.onrender.com/')
  })

    return(
        <div>

        </div>
    )
    
}