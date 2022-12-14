const express=require('express')
require('colours');
const app=express();
require('dotenv').config();
const mongodb= require('./Config/DB')
const cors=require('cors');
const cloudinary = require("cloudinary");
const morgan=require('morgan');
const path=require('path');
const helmet=require('helmet');
const xss = require("xss-clean");
const mongoSanitizer = require("express-mongo-sanitize");
//   required Routes
const fileupload = require("express-fileupload");
const userRoutes=require('./Routes/UserRoutes');
const mobileRoutes=require('./Routes/MobileRoutes');

mongodb();
app.use(express.static(path.join(__dirname, "Public")))
app.use(mongoSanitizer());
app.use(xss());
app.use(helmet());
app.use(express.json())
app.use(cors());
app.use(fileupload({useTempFiles:true}));
app.use(morgan('dev'));
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/mobiles',mobileRoutes);


cloudinary.config({ 
    cloud_name: 'ddqmhn3sa', 
    api_key: '768749173658598', 
    api_secret: 'rbLCBj060oTkyN3S1COjUWPLaRc' 
  });

const PORT = process.env.PORT || 5050;
app.listen((PORT),()=>{
    console.log(`Server running with portNo of ${process.env.PORTNO}`.blue.underline)
})