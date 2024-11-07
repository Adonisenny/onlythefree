import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/authcontext";
import { useCommentCommentContext } from "../Hooks/useCommentCommentContext.js";
import CommentCommentContent from "./CommentCommentContent";
const CommentsComments = () => {
   const {commentscomments,dispatch3} = useCommentCommentContext()
   const idlocate = useLocation()
   const  {user} = useContext(AuthContext)
   const postId = idlocate.pathname.split('/')[2]
   const [content,setContent] = useState('')
   const postedBy = user?.username


const handleContent = (e) => {
        setContent(e.target.value)
    }

    
    const handleSubmit = async(e) => {
        e.preventDefault()
try {
    
    
    const response = await axios.post(`https://backendrumors.onrender.com   /api/commentcomment/comments`,{
        
    postId,content})
 
    
    
    setContent('')
 
    

    
} catch (error) {
   console.log('can not be posted')
    
}
    }
    

useEffect(() => {
    const fetchcomments = async () => {
        const res =await axios.get(`https://backendrumors.onrender.com   /api/commentcomment/comments/${postId}`)
        const jsonc = await res.data
        dispatch3({type:'SET_COMMENTSCOMMENTS',payload:jsonc})
        
        
    }
    fetchcomments()
},[postId,dispatch3])

   
    


return ( 

<div className="mt-8">

<form  className="text-center" > 
<div>
    <textarea 
    className=" bg-slate-800 text-red rounded-[12px] h-[80px] w-[185px] md:w-[350px]"
    value={content}
    style={{"borderRadius":"4px","color":"white"}}
    onChange={handleContent}
    placeholder="write your comment"
    required
>




    </textarea>
    <br />
    <button onClick={handleSubmit} className=" text-[10px]">Reply</button>
</div>


</form>
<div className="workout-details">
    {/* Map the commentcomment */}
{commentscomments?.map((commentcomment) => {
return <div >
    <CommentCommentContent commentcomment={commentcomment} />
   

     </div>
})}


</div>
</div>

     );
}
 
export default CommentsComments;