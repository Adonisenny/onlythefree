import mongoose from "mongoose"
const Schema = mongoose.Schema
const commentSchema = new Schema({
    postId:{
        type:String,
        require:true,
    
    },
    userId:{
        type:String,
        required:true,
    },
    thecomments:{
        type:String
        
    },
    parentId: {
        type:String,
         default:null

    },
    postedBy:{
        type:String
    },

   
   
},{timestamps:true})

export default mongoose.model("Comment",commentSchema)
