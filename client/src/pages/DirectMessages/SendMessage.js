
import { useContext, useState} from "react";
import { useDmContext } from "../../Hooks/useDmContext.js";
import { AuthContext } from "../../Context/authcontext.js";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";





export const SendMessage = ({dm,formatTime}) => {
    const[deletedPost,SetDeletedPost] =useState(false)
    const {user} =useContext(AuthContext)
    const [isShow,setIsShow]=useState(false)
    const {dispatch3} =useDmContext()
    if (!dm) return null;
 const myuserId =user?._id
    const theSenderId = dm?.senderId
    const userId =user?._id
    const whoPosted =dm?.senderId

    const isDisabled = userId !== whoPosted;



   

    const alignmentClass = myuserId === theSenderId ? 'justify-end' : 'justify-start';
const messageStyle ={
    color:'white',
    fontSize:'12px',
    lineHeight: '16px',
    opacity: 1,
    backgroundColor:theSenderId ===myuserId? '#1e293b':'black',
    borderRadius:'12px',
    padding:'12px',
   width:'160px',
   
   
     


}
const handleShow =() =>{
    setIsShow(!isShow)
}
const handleClick = async () => {
   
   
    try {
        
     const deletejson = await axios.delete("https://backendrumors.onrender.com/api/directmessages/" + dm?._id)
     
 
 
     const ideleted =  deletejson.data
     
     
      
     if(deletejson.status ===200){
       SetDeletedPost(true)
          }
          setTimeout(() => {
           dispatch3({type:'DELETE_DM', payload:ideleted})
          },3000)
 
 
    } catch (error) {
     console.log(error)
 }
 
   }



   




    return(
        <>
          <div className={`flex ${alignmentClass} mb-2`}>
           <div className="flex flex-col thecontainer">
           {deletedPost && <p className='fixed top-[60px] sm:left-[150px] md:left-[360px] p-2 rounded-md text-black bg-slate-800 text-xs'>message deleted</p>}
           {isShow && (
           <div className="rounded-sm bg-slate-700 flex flex-col  ">
          <Link className="text-red text-xs rounded-md p-[6px] text-center ">Delete?</Link>
          <hr />

           <div className="gap-[79px] flex p-2 "> 
            
            <Link onClick ={handleShow}className="text-white">No</Link>  <Link className="hover:text-red-500" onClick={handleClick}>Yes</Link>

           </div>
               </div>)}
                <p className='mb-[3px]' style={messageStyle}>{dm?.Text}</p>
                <div className="flex gap-6 relative">
                <p className="text-xs text-gray-400 ">{formatTime(new Date(dm.createdAt))}</p>
                
                {!isDisabled && (
               <Link onClick={handleShow}><FaTrash color="grey" size='12px' className="mt-[3px]"/></Link>)}

                </div>
                
                </div>
               
            </div>
            </>

          
      
    )


}