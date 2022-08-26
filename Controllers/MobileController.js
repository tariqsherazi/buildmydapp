const Mobile=require('../Models/MobileModel');
const cloudinary = require("cloudinary").v2;

const asyncHandler=require('express-async-handler')
exports.postMobile=asyncHandler(async(req,res)=>{
    try{

    const ImageLinks=[];
    if(req.files){
            for (let i = 0; i < req.files.file.length; i++) {
         const result = await cloudinary.uploader.upload(req.files.file[i].tempFilePath, {
            folder: "mobiles",
          });
          ImageLinks.push(result.secure_url) 
        }  
    }
    const mob=new Mobile({
        "brandName":req.body.brandName || req.body.brandName,
        "model":req.body.model,
        "price":req.body.price,
        "build.os.type": req.body.type ||req.body.build.os.description ,
        "build.os.description": req.body.description ||req.body.build.os.description ,
        "build.ui":  req.body.ui || req.body.build.ui ,
        "battery.capacity":  req.body.capacity || req.body.battery.capacity,
        "battery.desc":  req.body.desc || req.body.battery.desc,
        "memory.ram.value":   req.body.ram || req.body.memory.ram.value,
        "memory.ram.unit":  req.body.ramunit ||req.body.memory.ram.unit,
        "memory.rom.value":  req.body.rom || req.body.memory.rom.value,
        "memory.rom.unit":   req.body.romunit || req.body.memory.rom.unit,
        "image":ImageLinks!=[]? ImageLinks: [],

    });
    const save=await mob.save();
       return res.status(201).json({success:true,data:save})
    }catch(err){
    
       return res.status(404).json({success:false,data:err.message})

    }

})

exports.updateMobile=asyncHandler(async(req,res)=>{
    try{
        const ImageLinks=[];
        if(req.files){
            for (let i = 0; i < req.files.file.length; i++) {
         const result = await cloudinary.uploader.upload(req.files.file[i].tempFilePath, {
            folder: "mobiles",
          });
          ImageLinks.push(result.secure_url) 
          
        }
    //    updateData.image=ImageLinks
    }
    const updateData={
        // "brandName":req.body.brandName,
        // "model":req.body.model,
        // "price":req.body.price,
        // "build.os.type":req.body.build.os.type,
        // "build.os.description":req.body.build.os.description,
        // "build.ui":req.body.build.ui,
        // "battery.capacity":req.body.battery.capacity,
        // "battery.desc":req.body.battery.desc,
        // "memory.ram.value":req.body.memory.ram.value,
        // "memory.ram.unit":req.body.memory.ram.unit,
        // "memory.rom.value":req.body.memory.rom.value,
        // "memory.rom.unit":req.body.memory.rom.unit,   

        "brandName":req.body.brandName || req.body.brandName,
        "model":req.body.model,
        "price":req.body.price,
        "build.os.type": req.body.type ||req.body.build.os.description ,
        "build.os.description": req.body.description ||req.body.build.os.description ,
        "build.ui":  req.body.ui || req.body.build.ui ,
        "battery.capacity":  req.body.capacity || req.body.battery.capacity,
        "battery.desc":  req.body.desc || req.body.battery.desc,
        "memory.ram.value":   req.body.ram || req.body.memory.ram.value,
        "memory.ram.unit":  req.body.ramunit ||req.body.memory.ram.unit,
        "memory.rom.value":  req.body.rom || req.body.memory.rom.value,
        "memory.rom.unit":   req.body.romunit || req.body.memory.rom.unit,
        image:req.files? ImageLinks: undefined,
       

    }
    

    const update=await Mobile.findByIdAndUpdate(req.params.id,updateData,{
        new:true
    })
    res.status(201).json({success:true,data:update})

}catch(err){
    res.status(500).json({success:false,data:err.message})
}

    
})


exports.getMobiles=asyncHandler(async(req,res)=>{
    try{
        const allMob=await Mobile.find({});

        res.status(201).json({success:true,data:allMob})

    }catch(err){
        res.status(500).json({success:false,data:err.message})
    }
})