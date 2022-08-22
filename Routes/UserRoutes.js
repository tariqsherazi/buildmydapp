const { verifyToken } = require('../Controllers/helpers/Jwt');
const { PostUser, signin, updateUser, getUser } = require('../Controllers/UserController');

const router=require('express').Router();

router.post('/post',PostUser);
router.post('/signin',signin);
router.put('/update/:id',verifyToken,updateUser);
router.get('/getAllUser',getUser);

module.exports=router;