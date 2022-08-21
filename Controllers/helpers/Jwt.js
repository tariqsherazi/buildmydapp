
const jwt=require('jsonwebtoken')
const Jwt_Token=(id)=>{
   const token= jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'2h'})
   return token;

}
const User=require('../../Models/UserModel');
const verifyToken=async(req,res,next)=>{
      if(req.headers.authorization){
           try{
            const token = req.headers.authorization.split(' ')[1];
            const decode=jwt.verify(token,process.env.SECRET_KEY);
             req.user=await User.findById(decode.id);
            next()
        }catch(error){
            res.status(401) 
            throw new Error('you are not authorized')
        }
      }else{
        return res.status(401).json('Your are not Valid User')

      }

}


module.exports={Jwt_Token,verifyToken};


