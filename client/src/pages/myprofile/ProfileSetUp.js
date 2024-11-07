import { useEffect, useState } from "react";
import { useCommentContext } from "../../Hooks/useCommentContext";
import axios from "axios";
import { useLocation, useNavigate} from "react-router-dom";

const ProfileSetUP = () => {
    const {dispatch2} =useCommentContext()
    const idlocation = useLocation()
    const userId = idlocation.pathname.split('/')[3]
    const [bio,setBio] = useState('')
    const [image,setPImg] = useState('')
    const [error,setError] = useState(false)
    const [steps,setSteps] =useState(1)
    const[isdisabled,setIsDisabled] =useState(false)
    const [iscolor,setColor] =useState('white')
    
const navigate = useNavigate()
    const thebioLength =bio.length;   



const handleUploads = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('bio',bio)
    formData.append('image',image)
    formData.append('userId',userId)


try{

    const response = await axios.post('https://backendrumors.onrender.com   /api/profile/',formData)

    const otherjson = await response.data

    dispatch2({payload:otherjson})
     navigate(`/profile/${userId}`)
}catch(error){
    setError(true)
    console.error('Error uploading profile:', error.response ? error.response.data : error.message);
}
    }



    const getCircleBgColor = () => {
        const bioLength = bio.length
        const maxLength = 35

        const percentage =Math.min(bioLength / maxLength,1)
        const opacity = percentage;
       

         return `rgba(51,65,85, ${opacity})`;
        
        
    }







  
       const handleNext = (e) => {
        e.preventDefault()
        setSteps(prev => prev + 1)

    }
    const handlePrev = () => {
        setSteps(prev => prev -1)

    }
    const remainingCharacters =35 -thebioLength
    useEffect(()=>{
        if(remainingCharacters < 0){
            setIsDisabled(true)
            setColor('red')
        }else{
            setColor('white')
            setIsDisabled(false)
        }
       },[remainingCharacters])


   
    return ( 

<form  className="flex flex-col items-center justify-center h-[70vh]">
{steps ===1 && <div>
<label className="text-center">Bio</label>
<textarea
cols='28' rows='4'
style={{"borderRadius":"12px","color":"white"}}
className="bg-slate-700"

value={bio}
onChange={(e) => setBio(e.target.value)}
placeholder="One thing about you"

>
</textarea>

<main
 className="circle ml-[44%]"
 style={{ backgroundColor: getCircleBgColor() }}
>
    <span className="p-2" style={{color:`${iscolor}`}}>{remainingCharacters}</span>
</main>
</div>}

{steps===2 &&
<div>
<input 
type="file"
multiple
accept=".jpg,.png"


id='image'
className="w-[230px] bg-slate-600 rounded-xl"
onChange={(e) => setPImg(e.target.files[0])}
/>



{error && <p style={{color:'white',font:'4px'}}>upload unsuccessfully</p>}
<div className="grid grid-flow-col gap-4">
<button onClick={handlePrev} className="bg-slate-700 text-sm text-white rounded-xl">Prev</button>

{steps ===2 && <button onClick={handleUploads} className="bg-slate-700 text-sm text-white rounded-xl px-3">Upload</button>}
</div>
</div>}

{steps ===1 &&<button onClick={handleNext} disabled={isdisabled} className="bg-slate-700 text-sm text-white rounded-xl">Next</button>}

</form>


     );
}
 
export default ProfileSetUP;