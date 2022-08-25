const mongoose=require('mongoose');
const buildSchema=new mongoose.Schema({
    os:{
        type:{type:String},
        description:{type:String},
    },
    ui:{
        type:String
    }

} ,{ _id: false })
const batterySchema=new mongoose.Schema({
       capacity:{ type:Number },
       desc:{ type:String}
},{ _id: false })
const memorySchema=new mongoose.Schema({
        ram:{ value:[Number],
             unit: {
                type: String,
                required: [true, 'must end ram size']
            }},
        rom:{ value:[Number],
            unit: {
                type: String,
                required: [true, 'must end ram size']
            }},
},{ _id: false })
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    stars: {
        type: String,
    },
    oppinion: {
        type: String,
    },
}, { timestamps: true })

const mobileSchema=new mongoose.Schema({
    brandName:{type:String,required:[true,'this field is required']},
    model:{type:String,required:[true,'this field is required']},
    price:{type:String,required:[true,'this field is required']},
    build:buildSchema,
    memory:memorySchema,
    battery:batterySchema,
    review:[reviewSchema]
})
module.exports=mongoose.model("Mobile",mobileSchema);
