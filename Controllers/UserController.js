const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const userPhotos = require('./helpers/helpers')
const User = require('../Models/UserModel');
const { Jwt_Token } = require('./helpers/Jwt');
const fs = require('fs');
exports.PostUser = asyncHandler(async (req, res) => {
    const getPath = async (photo) => {
        var getPaths = await userPhotos(photo);
        let photoPaths = getPaths;
        console.log(photoPaths)

        return photoPaths;
    }
    try {
        if (req.body.password) {
            const genSalt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, genSalt);
        }

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
            photo: req.files ? await getPath(req.files.file) : "",
        })
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})



exports.signin = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        res.status(201).json({
            success: true,
            data: {
                user,
                token: Jwt_Token(user._id)
            }
        })
    } else {
        res.status(404).json({ success: false, data: "you entered invalid credential" })
    }

})

exports.updateUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (req.body.password) {
        const genSalt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, genSalt);
    }
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }
    if (req.files){
        const preData = await User.findById(req.params.id);
        if (preData.photo !== "") {
            fs.unlink(`${process.env.USER_DELETE_PHOTO_PATH}/${preData.photo}`, (err) => {
                if (err) {
                    return res.status(404).json('error while deleteing photo')
                }
            })
        }
        const newPhoto = await userPhotos(req.files.file);
        user.photo = newPhoto;
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, user, { new: true });
    if (updateUser) {
        return res.status(201).json({
            success: true,
            data: updateUser
        })
    } else {
        return res.status(404).json({ success: false, data: "you are not valid user" })

    }
})




exports.getUser=asyncHandler(async(req,res)=>{
    User.find({},(err,user)=>{
        if(err){
            return res.status(401).json({success:false,data:"some thing went wrong"})
        }
        return res.status(201).json({success:true,data:user})


    })
})

exports.getById=asyncHandler(async(req,res)=>{
       const user=await User.findById(req.params.id);
       if(user){
        res.status(201).json({success:true,data:user})
       }else{
        res.status(404).json({success:true,data:"User Not found"})
        

       }
})
