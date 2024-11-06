import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { UseContextFunction } from "../Hooks/useWorkoutContext";
import { AuthContext } from "../Context/authcontext";
import Notification from "./Notifications";




const CreateForm = ({likes}) => {
    
    const  {user} = useContext(AuthContext)
    const {dispatch} = UseContextFunction()
    let whopost = user?.username
    const myId = user?._id
    
    const navigate = useNavigate()
    const [story,setStory] =useState('')
    const [pop,setPop] = useState(false)
   const [postedBy,setpostedBy] =useState(whopost)

   const [theId,settheId] =useState(myId)
     const [isdisabled,setIsDisabled] =useState(false)
    
     const [Error,setError] =useState(null)
   
    
    // Protecting the form from few words
     let thelength =story.length
   useEffect(() => {
    if(thelength < 15 || thelength > 150){
        setIsDisabled(true)
       }else{
        setIsDisabled(false)
       }
   },[thelength])



   // Posting the rumor and who posted it
   
    const handleSubmit = async(e) => {
        e.preventDefault()
       
        const mypost = {story,postedBy,theId}
        
         if(!story){
           setError("Complete all fields")
          }
        
       
        try {
            const res = await axios.post('https://backendrumors.onrender.com/api/rumors',mypost)
    
        const otherJson = await res.data
           
          setStory("")
              dispatch({type:'CREATE_RUMORS',payload:otherJson})
          setError(null)
           setPop(true)
        
             if(res.status===200){
                    navigate('/')
               }else{
                 setError('unexpected network error status')
             }
              
              

               
            
     } catch (error) {
            console.log(error)
           
        }
    }
    const closeNotify = () =>{
        setPop(false)
            }

return (  
    <>{pop &&  <Notification message="Rumor sent successfuly !" onClose={closeNotify} />}
       
<form style={{"textAlign":"center", "marginTop":"10%"}}>
    <h2><i>Spread it</i></h2>

    <br />
    
<textarea 
className="bg-slate-700 h-[200px] w-[220px] md:w-[350px]"
placeholder="Write your Rumor"
onChange= {(e) => setStory(e.target.value)}
value={story}
style={{"borderRadius":"7px","color":"white"}}

></textarea>
<br />

<button className="bg-slate-700 text-white" disabled={isdisabled} onClick={handleSubmit} style={{'display':'inline-block'}}>Spread</button>
 &nbsp; &nbsp; &nbsp;  
<p style={{'display':'inline-bslock'}}>{thelength}</p>

{Error &&  <p style={{'backgroundColor':'white','paddingBottom':'15px','borderRadius':'8px'}}>{Error}</p>}

</form>

</>
 );
}
 
export default CreateForm;
