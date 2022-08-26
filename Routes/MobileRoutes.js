const { verifyToken } = require('../Controllers/helpers/Jwt');
const { postMobile,updateMobile, getMobiles } = require('../Controllers/MobileController');

const router=require('express').Router();

router.post('/post',postMobile);
router.get('/allmob',getMobiles);
router.put('/update/:id',updateMobile);
module.exports=router;