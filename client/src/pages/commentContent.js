import { FaTrash,FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import { useCommentContext } from "../Hooks/useCommentContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authcontext";
import { FaComment } from "react-icons/fa";

const CommentContent = ({comment,setActiveReplyid,activereplyid}) => {

  const{dispatch2}=useCommentContext()
  const  {user} = useContext(AuthContext)
  const [like, setLike] = useState(comment?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [color,setColor] = useState(false)
  const [isdisabled,setIsDisabled] =useState(false)
  const [deletedPost,SetDeletedPost] = useState(false)
  const[showReplies,setShowReply] =useState(false)
  const myusername = user?.username
  
const [replyText,setReplyText]  =useState('')

     const mystyle ={
        backgroundColor:"#0F172A",
        borderRadius:'12px'
        
      }
      const mystyles ={
        backgroundColor:"",
        color:'#292524'
      
      }

//Handlesubmit
const HandleSubmitR= async(e) => {
e.preventDefault()
await axios.post(`${process.env.REACT_APP_API_URL}/api/comments`,{
  postId:comment?.postId,
  userId:user?._id,
  thecomments:replyText,
  parentId:comment?._id,
  postedBy:myusername

})
setReplyText('')
setActiveReplyid(null)

}

//handleReply

const HandleReply = () => {
  setActiveReplyid(comment?._id)
}
//like function

    const likeHandler = () => {
        try {
          axios.put(`${process.env.REACT_APP_API_URL}/api/comments/` + comment?._id + "/like", { postId: user._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };

//delete function
      const handleDelete = async() => {
    const wannadelete = window.confirm('Do you really wanna delete?')

    if(wannadelete === true){
        try {
             const trydelete = await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/` + comment?._id)

             const deletedComments =await trydelete.data
            if(trydelete.status ===200){
      SetDeletedPost(true)
         }
             setTimeout(() => {
              dispatch2({type:'DELETE_COMMENTS', payload:deletedComments})
             },3000)
         } catch (error) {
             console.log('It has not been deleted')
         }
        }
     }








      useEffect(() => {
        setIsLiked(comment?.likes?.includes(user?._id));
      }, [user?._id, comment?.likes]);


      useEffect(() => {
        if(myusername !==comment?.postedBy ){
          setIsDisabled(true)
        }
      },[myusername,comment.postedBy])
    

      useEffect(() => {
        if(like >= 1){
          setColor(true)
        }else{
          setColor(false)
        }
      },[like])





      // comment date
      const inputDate = comment?.updatedAt.slice(0,10);
      const date = new Date(inputDate);
      
      // Convert month number to abbreviated month name
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = months[date.getMonth()];
      
      // Get the day and year in shortened form
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(2);
      
      // Combine the parts into the desired format



        
    
    return (  
      <div className= "cursor-pointer" >
      {activereplyid==null &&
      <div className='workout-details2' >
      {deletedPost && <p className='fixed top-[60px] left-[360px] p-2 rounded-md text-black bg-slate-800'>comment deleted</p>}

        <i className="absolute  right-[12px] bottom-[1px]  bg-slate-800 rounded-[12px] p-[4px] text-white">@{comment?.postedBy}</i>
        <p>{comment?.thecomments}</p> 
   {comment.children?.length > 0 && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setShowReply(prev => !prev);
    }}
    className="text-xs text-blue-400"
  >
    {showReplies ? "Hide replies" : `View replies (${comment.children.length})`}
  </button>
    )}
       <br/>
   
      <span className='span2' style={color ? mystyle:mystyles}><button onClick={likeHandler}><FaThumbsUp size={14} style={color ? mystyle:mystyles} /></button></span>
     <p className="absolute left-[38px] bottom-2">{like}</p>
    
      <span> <button  onClick={handleDelete} disabled={isdisabled} ><FaTrash size={14}  className="text-stone-800" /></button></span>



      <button onClick={(e)=>{e.stopPropagation(); HandleReply()}}  className="absolute left-[45px] bottom-[12px]" ><FaComment size={14}  className="text-stone-800"/></button>
      <p className="absolute bottom-[7px] left-[130px]">{`${day} ${monthName} ${year}`}</p>
    </div>}

{ activereplyid===comment?._id &&

     <form className="text-center" onSubmit={HandleSubmitR}>

 <textarea  

className=" bg-slate-800 text-red rounded-[12px] h-[80px] w-[185px] md:w-[350px]"
value={replyText}
onChange={(e)=>setReplyText(e.target.value)}
style={{"borderRadius":"4px","color":"white"}}
>
</textarea>
<br />
<div className="flex justify-center">
<button type="submit"  disabled={isdisabled} className="text-[10px] bg-slate-800 text-white" >comment</button>
</div>
</form>
}


<br />
{showReplies && comment.children?.length >0 && (
    <div style={{marginLeft:"20px"}}>
<div>
      {comment.children?.map(child=> (
        <CommentContent key={child._id} comment={child}  setActiveReplyid={setActiveReplyid} activereplyid={activereplyid} />
      ))}
      </div>
    </div>
)}
       </div>

        
    );
}
 
export default CommentContent;
