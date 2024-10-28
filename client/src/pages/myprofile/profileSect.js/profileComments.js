import { useState } from "react";

import { useCommentContext } from "../../../Hooks/useCommentContext";
import axios from 'axios'
import {useEffect} from 'react'
import { useLocation } from "react-router-dom";

const ProfileComments = () => {
const{comments,dispatch2}=useCommentContext()

const [profComment,setProfComment] = useState('')
const [error, setError] = useState()

const idlocation = useLocation()
const theId = idlocation.pathname.split('/')[2]
     

useEffect(() => {
    const fetchit = async() => {
  
  
        try {
        
        const response = await axios.get(`https://backendrumors.onrender.com/api/comments/profilecomment/${theId}`)
        
       const comms = await response.data
       
      
      setProfComment(comms)
      

dispatch2({type:'SET_COMMENTS',payload:comms})
       
    
       } catch (error) {
        setError({error:'comments not found'})
       }
    }
    fetchit()
},[dispatch2,theId])



    return ( 



<div>
    {profComment && profComment?.map((prof) => {
        return <div key={prof?.id} className="workout-details2">
            <p>{prof?.thecomments}</p>
            <p className="absolute  right-[12px] bottom-[1px] bg-slate-800 rounded-[12px] p-[4px]" style={{'color':'white'}}>{prof?.postedBy}</p>
            <br/>


        </div>
    })}
</div>




    )
}
export default ProfileComments;