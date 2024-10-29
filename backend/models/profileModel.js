
import mongoose from 'mongoose'


const Schema = mongoose.Schema

const profileSchema = new Schema({
  bio:String,
  
  imageUrl:{
    type:String,
    },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
  
  }
  

  
   
},{timestamps:true})

export default mongoose.model("Profile",profileSchema)


