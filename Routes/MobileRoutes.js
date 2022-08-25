const { verifyToken } = require('../Controllers/helpers/Jwt');
const { postMobile } = require('../Controllers/MobileController');

const router=require('express').Router();

router.post('/post',postMobile);
module.exports=router;