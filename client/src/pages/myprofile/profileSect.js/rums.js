import {useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import axios from 'axios';
const Rums = () => {

    const [myRumors,setMyRumors] = useState()
   
     const {_id} =useParams()
     

     useEffect(()=>{
        const fetchmyProfile = async()=> {
            try {
                const res = await axios.get(`https://backendrumors.onrender.com   /api/rumors/profilerumors/${_id}`)
                const otherRes =  res.data
                setMyRumors(otherRes)
                
            } catch (error) {
                console.log('not gotten')
            }
            
        }
        fetchmyProfile()
       

     },[_id])
    


    return (  

<div>

{myRumors?.map((myRumor) => {
    return <div  className='workout-details' key={myRumor?._id}>
        <p>{myRumor?.story}</p>
        <p className='absolute right-[12px] bottom-[1px] bg-slate-800 rounded-[12px] p-[4px]'style={{color:"white"}}>{myRumor?.postedBy}</p>

        </div>
})}



   {/* {rumors?.filter(rums => rums?.postedBy === myusername).map((filterRumor) => {
return <div className='workout-details' key={filterRumor._id}>
    <p>{filterRumor?.story}</p> 
   
    <br />
    <p className='absolute right-[12px] bottom-[1px] bg-slate-800 rounded-[12px] p-[4px]'style={{color:"white"}}>{filterRumor?.postedBy}</p>
    
    </div>
   })} */}
  
</div>



    );
}
 
export default Rums;