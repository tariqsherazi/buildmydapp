const Mobile=require('../Models/MobileModel');
const asyncHandler=require('express-async-handler')
exports.postMobile=asyncHandler(async(req,res)=>{
    
    console.log(req.body)

    const mob=new Mobile({
        "brandName":req.body.brandName,
        "model":req.body.model,
        "price":req.body.price,
        "build.os.type":req.body.build.os.type,
        "build.os.description":req.body.build.os.description,
        "build.ui": req.body.build.ui,
        "battery.capacity":req.body.battery.capacity,
        "battery.desc":req.body.battery.desc,
        "memory.ram.value": req.body.memory.ram.value,
        "memory.ram.unit": req.body.memory.ram.unit,
        "memory.rom.value":req.body.memory.rom.value,
        "memory.rom.unit": req.body.memory.rom.unit,

    });
    const save=await mob.save();
    if(save){
       return res.status(201).json({success:true,data:mob})
    }else{
       return res.status(404).json({success:true,data:"cont added new Mobiles"})

    }

})