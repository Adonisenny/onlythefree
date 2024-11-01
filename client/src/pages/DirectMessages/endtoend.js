import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField, Box } from '@mui/material';
import { useDmContext } from '../../Hooks/useDmContext'
import { useConversationContext } from '../../Hooks/useConversationContext';
import { AuthContext } from '../../Context/authcontext';
import { SendMessage } from './SendMessage';
import Navbar from '../Nav';




// Function to format date in "Day Month Year" format
const formatDateHeader = (date) => {
  return date?.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Function to format time for each message
const formatTime = (date) => {
  return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Group messages by date
const groupMessagesByDate = (messages) => {
  return messages?.reduce((acc, message) => {
    const messageDate = new Date(message?.createdAt);
    const dateKey = formatDateHeader(messageDate);

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(message);
    return acc;
  }, {});
};






export const Endtoend =()=> {
     const[Text,setText] =useState('')
     const {conversation} =useConversationContext()
     const {user} = useContext(AuthContext)
     const {message =[],dispatch3}=useDmContext();

     const conversationId =conversation[0]?._id
     const senderId = user?._id


     
  
   
     
   
   
    const handleSubmit = async(e) => {
      e.preventDefault()
      
        try{
            const res = await axios.post('https://backendrumors.onrender.com/api/directmessages',{conversationId,senderId,Text})
            const otherJson = res.data
            setText('')
            dispatch3({type:'CREATE_DM',payload:otherJson})
            
        }catch(error){
            console.error('error sending message', error)
        } 
    
     }
   
   


     useEffect(() => {
      const fetchit = async() => {
       
    
    
          try {
         
          const response = await axios.get(`https://backendrumors.onrender.com/api/directmessages/${conversationId}`)
          
          const otherJson = response.data
          localStorage.setItem('messages',JSON.stringify(otherJson))
       
           dispatch3({type:'SET_DM',payload:otherJson})
            
         
      
         } catch (error) {
          console.log("could not get reply")
         }
      }
      fetchit()
  },[dispatch3,conversationId]) 
    
  useEffect(()=> {
    const savedMessages = JSON.parse(localStorage.getItem('messages'));
    if(savedMessages){
      dispatch3({type:'SET_DM', payload:savedMessages})
    }


  },[])
    

    
       
  const groupedMessages = groupMessagesByDate(message);

  return (
    <div >
      <Navbar />
      <div style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
        {Object?.keys(groupedMessages)
        .sort((a,b) => new Date(b) - new Date(a))
        .map((date)=> (
          <div key={date}>
            {/* Date Header */}
            <h1 className="text-center text-xs text-gray-500">{date}</h1>





            {/* Messages for this date */}
           
           
           
            {groupedMessages[date]
              .sort((a, b) =>  new Date(b?.createdAt)-new Date(a?.createdAt)) // Sort by time descending
              .map((dm) => (
                <div key={dm._id}>
                  <SendMessage dm={dm} formatTime={formatTime} />
            
                </div>
              ))}
          </div>
        ))}
      </div>
      <Box component='form' onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
        <TextField
          multiline
          value={Text}
          label='Message'
          rows={4}
          fullWidth
          margin='normal'
          onChange={(e) => setText(e.target.value)}
        />
        <Button type='submit' variant='contained' color='inherit' fullWidth>send</Button>
      </Box>
    </div>
  
  )
}


export default Endtoend;
