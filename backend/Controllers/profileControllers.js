import Profile from "../models/profileModel.js"

export const createProfile = async(req,res) => {
    const profile = new Profile({
bio:req.body.bio,
userId:req.body.userId,
imageUrl:req.file?.path

    })
    try {
        const savedProfile = await profile.save()
        res.status(200).json(savedProfile)
      
    } catch (error) {
        console.log(error)
        res.json({error:'failed to create profile'})
    }

}

export const getAllProfile = async(req,res,next) => {
    try {

const theprofiles = await Profile.find({}).sort({createdAt:-1})

        res.status(200).json(theprofiles)
    } catch (error) {
        res.status(500).json({error:"profile not found"})
    }
}
export const getProfile = async(req,res) => {
   
    try {
     const userId = req.params.userId

    const profile = await Profile.find({userId:userId})
    if(!profile){
     return res.status(404).json({message:'profile not found'})
    }
    res.status(200).json(profile)
    
    } catch (error) {
        res.status(500).json({error:"profile not found"})
}
}
export const updatedProfile = async(req,res,next) => {
  const userId =req.body.userId
  const updateData = req.body


   
        
    
        

        if(req.file){
            updateData.imageUrl = req.file.path||req.file.location;
        }

        try {
        let profile = await Profile.findOne({userId:userId})

        if(profile){
        profile = await Profile.findOneAndUpdate(
            {userId:userId},
            {$set:updateData},
            {new:true}
        );
        return res.status(200).json({profile,message:'Profile updated'}) 
        }else {
            const newProfile = new Profile({
                userId:userId,
                ...updateData,
        })
        await newProfile.save();
        return res.status(201).json({profile:newProfile, message:'profile created successfuly'})
    }     
        
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}