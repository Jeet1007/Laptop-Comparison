const express = require('express');
const mongoose = require('mongoose');


const cors=require('cors');

const corsOptions={
    origin: ["http://localhost:5173"]
}

const app=express();

app.use(cors(corsOptions));

connectDB().catch(err=> console.log(err));
async function connectDB(){
    //add your own connection string
    await mongoose.connect('mongodb://127.0.0.1:27017/LCS');
    console.log('Database Connected');
}



//api routes

app.get('/api',(req,res)=>{
    res.json({name:['John','Doe','Jane']});
})

app.listen(8080,()=>{
    console.log('Server Started at port 8080');
})