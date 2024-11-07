import { useContext, useEffect, useState } from "react";
import { useCommentContext } from "../Hooks/useCommentContext";
import axios from "axios";
import '../MycssPages/commentcss.css'
import { AuthContext } from "../Context/authcontext";
import {useLocation } from 'react-router-dom';
import CommentContent from "./commentContent";


const Comments = ({slicedcomms}) => {
const{comments,dispatch2}=useCommentContext()
const location =useLocation()
const locateAccount = location.pathname.split('/')[2]
const  {user} = useContext(AuthContext)
const [thecomments,setTheComments] =useState('')
const [myid,setMyId] = useState(locateAccount)
const postedBy = user?.username
const theId = user?._id
const [isdisabled,setIsDisabled] =useState(false)

                       
    
  //Post comments
    const handleSubmit = async(e) => {
        e.preventDefault()
       if(postedBy === undefined){
        alert('Please login to make a comment')
       }
       
        try {
            const myComments = {thecomments,postedBy,myid,theId}
         
            const res = await axios.post('https://backendrumors.onrender.com   /api/comments',myComments)
            const otherJson = await res.data
           setTheComments('')
               dispatch2({type:'CREATE_COMMENTS',payload:otherJson})
              
               
      } catch (error) {
             console.log(error)
           
        }
    }
    








    let thelength =thecomments.length
    useEffect(() => {
        if(thelength < 15 || thelength > 150 ){
            setIsDisabled(true)
           }else{
            setIsDisabled(false)
           }
       },[thelength,postedBy])

      



    useEffect(() => {
        const fetchit = async() => {
      
      
            try {
            const response = await axios.get(`https://backendrumors.onrender.com   /api/comments/${myid}`)
            
            const comms = await response.data
          
         
             dispatch2({type:'SET_COMMENTS',payload:comms})
           
        
           } catch (error) {
            console.log("could not get reply")
           }
        }
        fetchit()
    },[dispatch2,myid])
    
   

    
   



// stamp date













  


    return ( 
        <div className="mt-8">
        <form className="text-center ">
<textarea  

className=" bg-slate-800 text-red rounded-[12px] h-[80px] w-[185px] md:w-[350px]"
value={thecomments}
onChange={(e) =>setTheComments(e.target.value)}
style={{"borderRadius":"4px","color":"white"}}
>
</textarea>
<br />
<button onClick={handleSubmit}  disabled={isdisabled} className=" text-[10px] ">comment</button>

</form>
<br />


<div className="workout-details"> 
 {comments?.map((comment) => (
    
<CommentContent comment={comment}/>
))}
</div>
</div>

     );
}
 
export default Comments;