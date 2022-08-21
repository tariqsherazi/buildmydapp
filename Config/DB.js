const mongoose=require('mongoose')
const DB=async()=>{
    try{
      const conn= await mongoose.connect(process.env.MONGO);
      console.log(`Mongodb connected to ${conn.connection.host}`.yellow.underline)
    }catch(err){
     console.log (`Error ${err.message}`)
     process.exit(1)
    }
}
module.exports=DB;