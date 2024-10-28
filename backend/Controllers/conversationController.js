import mongoose from 'mongoose'
import Conversation from '../models/conversationModel.js'


export const CreateConversation = async (req,res)=> {
    const {senderId,receiverId} = req.body
try {
    let existingConversation = await Conversation.findOne({
      members:{ $all:[senderId, receiverId]}  
    });
    if(existingConversation){
        return res.status(200).json(existingConversation)
    }
    //If no conversation CREATE NEW CONVO
    const newConversation = new Conversation({
        members:[senderId, receiverId]
    });
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation)
    
} catch (error) {
    res.status(500).json({error:error.message})
}
}






export const getConversationIdControl = async(req, res) => {
    try {
        const { conversationId } = req.params;
        console.log(req.params);

        const theconversation = await Conversation.findOne({ _id: conversationId });
        console.log(theconversation);

        if (!theconversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json(theconversation);
    } catch (error) {
        res.status(500).json({ error: "Conversation not found" });
    }
}





export const getConversation = async(req,res) => {
    try {
        const {userA,userB} =req.params;
        
        const conversation = await Conversation.findOne({
            members:{$all:[new mongoose.Types.ObjectId(userA),new mongoose.Types.ObjectId(userB)]}
        });
        if(!conversation){
            return res.status(404).json("No conversation found.")
        }
        res.status(200).json(conversation)
    } catch (error) {
        console.log(error)
        
    }
}