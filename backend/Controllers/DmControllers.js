import mongoose from "mongoose";
import MyMessage from '../models/DmModel.js'



export const PostMessages = async(req,res) => {
   
try {
    if(!mongoose.Types.ObjectId.isValid(req.body.conversationId)){
        return res.status(400).json({error:'invalid conversationId'})
    }
    if(!mongoose.Types.ObjectId.isValid(req.body.senderId)){
        return res.status(400).json({error:'invalid senderId'})
    }
    const newMessage = new MyMessage({
        conversationId:req.body.conversationId,
        senderId:req.body.senderId,
        Text:req.body.Text
        })
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
    
} catch (error) {
    res.status(500).json({error:error.message})
}
}


export const getMessagecontrols = async(req,res) => {
    try {
     const messages = await MyMessage.find({conversationId:req.params.conversationId})
     res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error:"messages not found"})
    }
    }




    
    export const deleteDmControls = async(req,res,next) => {
        try {
            const id =req.params.id
            if(!mongoose.Types.ObjectId.isValid){
                return res.status(404).json({error:"can't delete"})
            }
            const deleted = await MyMessage.findByIdAndDelete(id)
            return res.status(200).json(deleted)
        } catch (error) {
            res.status(500).json({error:"message not created"})
            
        }
        }



        
       

