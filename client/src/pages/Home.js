import {useEffect, useState} from "react"
import { UseContextFunction } from "../Hooks/useWorkoutContext.js"
import Card from "./Card.js"
import SearchBar from "./searchbar.js"

import { Link } from "react-router-dom"






const Home = () => {
    
    const {rumors,dispatch} =UseContextFunction()
    const [inputed,setInputed] =useState('')
   
    
   
   
   

    useEffect(() => {
        const fetchit = async() => {
           try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rumors`)
           
            const newrumors = await response.json()
            
           dispatch({type:'SET_RUMORS',payload:newrumors})
                   
        
            
           } catch (error) {
            console.log(error)
           }
        }
        fetchit()

    },[dispatch])


  



    const therumours = rumors?.filter(rum => {
        if(inputed === ''){
            return rum
        }else if(rum?.postedBy?.toLowerCase().includes(inputed.toLocaleLowerCase())){
            return rum

        }

        
    }).map((rumor) => {
        return <Card
            key={rumor._id}
            rumor={rumor}
        />
    })

    




    return ( 
        <div className="Home   md:grid grid-cols-[3fr,1fr] bg-green-700 bg-opacity-50 ">
         <div className="workout-details overflow-y-auto " >
         
    {rumors ? <div>{therumours}</div>:<p>loading...</p>}

    
    </div>
    
    
   <div className="hidden md:block overflow-y-auto">
    
    <SearchBar inputed={inputed} setInputed={setInputed} />
   
    </div>
    <div className="right-[35px] top-[200px]  bg-slate-800   md:top-[500px] md:right-[476px] fixed w-[47px] h-[47px] rounded-[50%] opacity-75">
<Link to ='/form' >
<img src='https://cdn.icon-icons.com/icons2/2248/PNG/512/broom_icon_136857.png' alt="broom2" className="h-[42px] w-[42px]"/>
</Link>
</div>
        </div>
     );
}
 
export default Home;