import { useContext, useEffect, useState } from "react";
import { useCommentCommentContext } from "../Hooks/useCommentCommentContext";
import { AuthContext } from "../Context/authcontext";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaComment, FaThumbsUp, FaTrash } from "react-icons/fa";

const CommentCommentContent = ({commentcomment}) => {
    const {dispatch3} = useCommentCommentContext()
    const  {user} = useContext(AuthContext)

    const [like, setLike] = useState(commentcomment?.likes?.length);
    const [isLiked, setIsLiked] = useState(false);
    const [color,setColor] = useState(false)
    const [isdisabled,setIsDisabled] =useState(false)
    const myusername = user?.username
  

    
    const likeHandler = () => {
        try {
          axios.put("https://backendrumors.onrender.com/api/comments/" + commentcomment?._id + "/like", { myid: user._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };
      const handleDelete = async() => {
        
        try {
             const trydelete = await axios.delete('https://backendrumors.onrender.com/api/comments/' + commentcomment?._id)
             const deletedComments =await trydelete.data
            
             dispatch3({type:'DELETE_COMMENTSCOMMENTS', payload:deletedComments})
         } catch (error) {
             console.log('It has not been deleted')
         }
     
     }
     const handleClick3 = (id) =>{


     }



     const mystyle ={
        backgroundColor:"#0F172A",
        borderRadius:'12px'
        
      }
      const mystyles ={
        backgroundColor:"",
        color:'#292524'
      
      }
      useEffect(() => {
        setIsLiked(commentcomment?.likes?.includes(user?._id));
      }, [user?._id, commentcomment?.likes]);


      useEffect(() => {
        if(myusername !==commentcomment?.postedBy ){
          setIsDisabled(true)
        }
      },[myusername,commentcomment.postedBy])
    

      useEffect(() => {
        if(like >= 1){
          setColor(true)
        }else{
          setColor(false)
        }
      },[like])
        
    
    
    return (  
<div>

    
<div className='workout-details2' >
        <i className="absolute  right-[12px] bottom-[1px] bg-slate-800 rounded-[12px] p-[4px] text-white">@{commentcomment?.postedBy}</i>
        <p>{commentcomment?.content}</p> 
       <br/>
   
      <span className='span2' style={color ? mystyle:mystyles}><button onClick={likeHandler}><FaThumbsUp size={14}   style={color ? mystyle:mystyles} /></button></span>
     <p className="absolute left-[38px] bottom-2">{like}</p>
    
      <span> <button  onClick={handleDelete} disabled={isdisabled} ><FaTrash size={14}  className="text-stone-800" /></button></span>
      <Link    to={`/comments/${commentcomment?.myid}/commentscomments/${commentcomment._id}`} className="absolute left-[99px] bottom-[13px] text-white"  onClick={() => handleClick3(commentcomment._id)} ><FaComment size={14}  className="text-stone-800"/></Link>
      
</div>
</div>


    );
}
 
export default CommentCommentContent;