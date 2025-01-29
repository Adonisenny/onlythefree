import Rumor from '../models/rumormodel.js'  
import mongoose from 'mongoose'

export const createRumorControls = async(req,res,next) => { 
   
try {

    const newRumor = new Rumor({
        story:req.body.story,
        postedBy:req.body.postedBy,
        theId:req.body.theId,
       
       
    
    })
    await newRumor.save()
    
    res.status(200).json(newRumor)
} catch (error) {
    res.status(500).json({error:"rumor not created"})

}    
}




     export const getRumorcontrol = async(req,res) => {
         const {id} = req.params
         if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"not such workout"})
         }
         const myRumor = await Rumor.findById(id)
         if(!myRumor){
             res.status(400).json({error: "no such error"})
         }
         res.status(200).json(myRumor)
         }

         export const getallRumorcontrols = async(req,res) => {
             try {
              const myRumor = await Rumor.find({}).sort({createdAt:-1})
                  res.status(200).json(myRumor)


             } catch (error) {
                res.status(500).json({error:"rumor not found"})
            }
            }

            export const deleteRumorControls = async(req,res,next) => {
                try {
                    const id =req.params.id
                    if(!mongoose.Types.ObjectId.isValid){
                        return res.status(404).json({error:"can't delete"})
                    }
                    const deleted = await Rumor.findByIdAndDelete(id)
                    return res.status(200).json(deleted)
                } catch (error) {
                    console.log('it was not deleted')
                    
                }
                }
            

export const updateLikes = async(req,res,next) => {
   
        try {
          const rumor = await Rumor.findById(req.params.id);
          if (!rumor.likes.includes(req.body.theId)) {
            await rumor.updateOne({ $push: { likes: req.body.theId } });
            res.status(200).json("The post has been liked");
          } else {
            await rumor.updateOne({ $pull: { likes: req.body.theId } });
            res.status(200).json("The post has been disliked");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      
        }

        
        export const getProfileRumour = async(req,res) => {
   
            try {
             const theId = req.params.theId
           
            const profilerumour = await Rumor.find({theId:theId})
            if(!profilerumour){
             return res.status(404).json({message:'profile  not found'})
            }
            res.status(200).json(profilerumour)
             
            } catch (error) {
             console.log(error)
            }
        }  
                

                


              
                            
                
