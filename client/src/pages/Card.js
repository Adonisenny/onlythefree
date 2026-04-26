import axios from 'axios' 
import { FaComment } from "react-icons/fa";

import {  useContext, useEffect, useState} from 'react';
import { useRef } from 'react';
import { UseContextFunction } from '../Hooks/useWorkoutContext';
import { AuthContext } from '../Context/authcontext';
import { Link} from 'react-router-dom';
import FourIcons from './fouricons';




const Card = ({rumor,slicedcomms}) => {
  
const {dispatch} = UseContextFunction()
const {user} = useContext(AuthContext)
const myusername =user?.username
const [color,setColor] = useState(false)
const [addlink,setAddLink] = useState(true)
const [isdisabled,setIsDisabled] = useState(false)
const [like, setLike] = useState(rumor?.likes?.length);
const [isLiked, setIsLiked] = useState(false);
const[able,setLikeDisabled] = useState(false)
const [deletedPost,SetDeletedPost] = useState(false)
const divref = useRef(null)


useEffect(() => {
const handleDivRef = (event) => {
  if(divref.current && !divref.current.contains(event.target)){
setAddLink(true)

  }

}
document.addEventListener('click', handleDivRef)
return  () => {
document.removeEventListener('click',handleDivRef)
}


},[])



// the date code //
const myday = rumor.createdAt
const postday = new Date(myday)
const currentDate = new Date()
const trydate = (postday.getDate() +  " " + postday.toLocaleString('default', { month: 'short' }) + " " + postday.getFullYear().toString().slice(2))
currentDate.setHours(0,0,0,0)

//delete Icons
const handleClick = async () => {
  
   
   try {
    const deletejson = await axios.delete("https://backendrumors.onrender.com/api/rumors/" + rumor._id)
    


    const ideleted =  deletejson.data
    
    
     
    if(deletejson.status ===200){
      SetDeletedPost(true)
         }
         setTimeout(() => {
          dispatch({type:'DELETE_RUMORS', payload:ideleted})
         },3000)


   } catch (error) {
    console.log(error)
}

  }

//knowing who can delete
  useEffect(() => {
    if(myusername !==rumor?.postedBy ){ 
      setIsDisabled(true)
    }
  },[myusername,rumor.postedBy])



const mystyle ={
  backgroundColor:"#0F172A",
  borderRadius:'12px',
  color:'white'
}
const mystyles ={
  backgroundColor:"",
  color:'#292524'
}




useEffect(() => {
  setIsLiked(rumor?.likes?.includes(user?._id));
}, [user?._id, rumor?.likes]);



const likeHandler = () => {
  
  try {
    axios.put("https://backendrumors.onrender.com/api/rumors/" + rumor._id + "/like", { theId: user._id });
  } catch (err) {}
  setLike(isLiked ? like - 1 : like + 1);
  setIsLiked(!isLiked);
};

  
  useEffect(() => {
    if(like >= 1){
      setColor(true)
    }else{
      setColor(false)
    }
  },[like])
    

  const filterLikes = rumor?.likes?.filter(rums => rums === user?._id).map((flikes) => {
return   flikes 
 })
// anyone  not logged in can not make a comment
useEffect(() =>{
  if(myusername===undefined){
    setLikeDisabled(true)
   
    }
},[myusername])
  


    return (
      <div className='scroll-bar'>
        {deletedPost && <p className='fixed top-[60px] left-[360px] p-2 rounded-md text-black bg-slate-800'>rumor deleted</p>}
        <div className="workout-details   bg-transparent" >
        <div >
        <p className='' style={{textWrap:'wrap',color:'white'}}>{rumor?.story}</p>
       <Link to={`/profile/${rumor?.theId}`}> <i className='absolute right-[12px] bottom-[1px] bg-slate-800 rounded-[12px] p-[4px] text-white'>{rumor.postedBy}</i></Link>
        
       
        </div> 
<div>
 <br />
   
          <div>
  <span> <Link to={`/comments/${rumor._id}`}  className="absolute left-[45px] bottom-[12px]" disabled={able} ><FaComment size={14} className="text-stone-800" /></Link></span>

 </div>  
<div>
  <br />

<FourIcons trydate={trydate} able={able} mystyle={mystyle} mystyles={mystyles} handleClick={handleClick}  isdisabled={isdisabled}  rumourid={rumor?._id} likeHandler={likeHandler} like={like} color={color}/>
</div>

</div>
        </div>
  
        </div>
      );
}
 
export default Card;