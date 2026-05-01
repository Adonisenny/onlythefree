import { useContext, useEffect, useState } from "react";
import { useCommentContext } from "../Hooks/useCommentContext";
import axios from "axios";
import '../MycssPages/commentcss.css'
import { AuthContext } from "../Context/authcontext";
import {useLocation } from 'react-router-dom';
import CommentContent from "./commentContent";
import {Link} from 'react-router-dom';



const Comments = ({slicedcomms}) => {
const{comments,dispatch2}=useCommentContext()
const location =useLocation()
const locateAccount = location.pathname.split('/')[2]
const  {user} = useContext(AuthContext)
const [thecomments,setTheComments] =useState('')
const [postId,setPostId] = useState(locateAccount)
const postedBy = user?.username
const userId= user?._id
const [isdisabled,setIsDisabled] =useState(false)
const [activereplyid,setActiveReplyid] =useState(null)

                       
    
  //Post comments
    const handleSubmit = async(e) => {
        e.preventDefault()
       if(postedBy === undefined){
        alert('Please login to make a comment')
       }
       
        try {
            const myComments = {thecomments,postedBy,postId,userId}
         
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/comments`,myComments)
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



       const Comment = ({ comment }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <p>{comment.text}</p>

      {/* replies */}
      {comment.children.map(child => (
        <Comment key={child._id} comment={child} />
      ))}
    </div>
  );
};

      



    useEffect(() => {
        const fetchit = async() => {
      
      
            try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${postId}`)
            
            const comms = await response.json()
          
         
             dispatch2({type:'SET_COMMENTS',payload:comms})
             
           
        
           } catch (error) {
            console.log("could not get reply")
           }
        }
        fetchit()
    },[dispatch2,postId])
    
   



  


    return ( 
      <div>
       <Link to='/' className='text-white'>onlythefree</Link>
        <div className="mt-8">
          {activereplyid==null &&
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

</form>}
<br />


<div className="workout-details"> 
 {comments?.map((comment) => (
    
<CommentContent comment={comment} key={comment?._id} setActiveReplyid={setActiveReplyid} activereplyid={activereplyid}/>
))}
</div>
</div>
  </div>

     );
}
 
export default Comments;
