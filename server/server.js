const express = require('express');
const mongoose = require('mongoose');
const {importCSVData}= require('./csvtojson.js')
const Laptop = require('./model/Laptop.js');

const cors=require('cors');

const corsOptions={
    origin: ["http://localhost:5173"]
}

const app=express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB().catch(err=> console.log(err));
async function connectDB(){
    //add your own connection string
    await mongoose.connect('mongodb://127.0.0.1:27017/LCS');
    console.log('Database Connected');
}



//api routes

app.get('/api/insertonetime',async(req,res)=>{
    res.send('API is working');
    try{
        const data =await importCSVData();
        // console.log(data);
        await Laptop.insertMany(data);
        console.log('Data Imported Successfully');

    }catch(err){
        console.log(err);
    }


});

app.get('/api/search',async(req,res)=>{
    const {id,name,price,processor,ram,os,storage,img_link,display,rating,no_of_ratings,no_of_reviews,laptop_brand,os_brand}=req.query;

    
    let query = {
        ...(id && { laptop_id: id }),
        ...(name && { name }),
        ...(price && { price }),
        ...(processor && { processor }),
        ...(ram && { ram }),
        ...(os && { os }),
        ...(storage && { storage }),
        ...(img_link && { img_link }),
        ...(display && { display }),
        ...(rating && { rating }),
        ...(no_of_ratings && { no_of_ratings }),
        ...(no_of_reviews && { no_of_reviews }),
        ...(laptop_brand && { laptop_brand }),
        ...(os_brand && { os_brand })
      };
 


    try{
        const laptops=await Laptop.find(query);
        res.status(200).json({success:true,laptops});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Server Error'});
    }



})

app.listen(8080,()=>{
    console.log('Server Started at port 8080');
})