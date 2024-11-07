import { Link } from "react-router-dom";
import { FaComment,  FaTrash,FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import { useCommentContext } from "../Hooks/useCommentContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authcontext";


const CommentContent = ({comment}) => {

  const{dispatch2}=useCommentContext()
  const  {user} = useContext(AuthContext)
  const [like, setLike] = useState(comment?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [color,setColor] = useState(false)
  const [isdisabled,setIsDisabled] =useState(false)
  const [deletedPost,SetDeletedPost] = useState(false)
  const myusername = user?.username

//like function

    const likeHandler = () => {
        try {
          axios.put("https://backendrumors.onrender.com/api/comments/" + comment?._id + "/like", { postId: user._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };

//delete function
      const handleDelete = async() => {
    const wannadelete = window.confirm('Do you really wanna delete?')

    if(wannadelete === true){
        try {
             const trydelete = await axios.delete('https://backendrumors.onrender.com/api/comments/' + comment?._id)

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
const handleClick3 = (id) => {}


     const mystyle ={
        backgroundColor:"#0F172A",
        borderRadius:'12px'
        
      }
      const mystyles ={
        backgroundColor:"",
        color:'#292524'
      
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
      <div>
      
      <div className='workout-details2' >
      {deletedPost && <p className='fixed top-[60px] left-[360px] p-2 rounded-md text-black bg-slate-800'>comment deleted</p>}

        <i className="absolute  right-[12px] bottom-[1px] bg-slate-800 rounded-[12px] p-[4px] text-white">@{comment?.postedBy}</i>
        <p>{comment?.thecomments}</p> 
       <br/>
   
      <span className='span2' style={color ? mystyle:mystyles}><button onClick={likeHandler}><FaThumbsUp size={14}   style={color ? mystyle:mystyles} /></button></span>
     <p className="absolute left-[38px] bottom-2">{like}</p>
    
      <span> <button  onClick={handleDelete} disabled={isdisabled} ><FaTrash size={14}  className="text-stone-800" /></button></span>
      {/* <Link to={`/comments/${comment?.myid}/commentscomments/${comment._id}`} className="absolute left-[99px] bottom-[13px] text-white"  onClick={() => handleClick3(comment._id)} ><FaComment size={14}  className="text-stone-800"/></Link> */}
      <p className="absolute bottom-[7px] left-[130px]">{`${day} ${monthName} ${year}`}</p>
    </div>
       </div>

        
    );
}
 
export default CommentContent;