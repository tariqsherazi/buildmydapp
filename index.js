const express=require('express')
require('colours');
const app=express();
require('dotenv').config();
const mongodb= require('./Config/DB')
const cors=require('cors');
const morgan=require('morgan');
const path=require('path');
//   required Routes
const fileupload = require("express-fileupload");
const userRoutes=require('./Routes/UserRoutes');

mongodb();
app.use(express.static(path.join(__dirname, "Public")))

app.use(express.json())
app.use(cors());
app.use(fileupload());
app.use(morgan('dev'));
app.use('/api/v1/users',userRoutes);




app.listen((process.env.PORTNO),()=>{
    console.log(`Server running with portNo of ${process.env.PORTNO}`.blue.underline)
})