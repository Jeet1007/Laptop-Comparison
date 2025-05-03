const express = require('express');
const mongoose = require('mongoose');
const {importCSVData}= require('./csvtojson.js')
const Laptop = require('./model/Laptop.js');
const Comment = require('./model/Review.js'); // adjust path as needed
const path = require('path');
//.env
require('dotenv').config({ path: path.resolve(__dirname, '.env') });



const cors=require('cors');

// const PORT = process.env.PORT || 8080;
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
    try{
        await mongoose.connect(process.env.Local_URL || process.env.Mongo_URL);
        // console.log(process.env.Mongo_URL);
        console.log('Database Connected');
    }catch(err){
        console.log(err);
    }
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
//All details API
app.get('/api/search',async(req,res)=>{
    const {id,name,price,processor,ram,os,storage,img_link,display,rating,no_of_ratings,no_of_reviews,laptop_brand,os_brand, page=1}=req.query;

    
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
 
      const limit=50;
      const skip=(page-1)*limit;

      try {
        const laptops = await Laptop.find(query)
            .limit(limit)
            .skip(skip);

        const totalResults = await Laptop.countDocuments(query); // Get total number of matching documents
        const hasNext = page * limit < totalResults; // Check if there are more results

        res.status(200).json({
            success: true,
            laptops,
            hasNext,
            totalResults,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalResults / limit)
        });
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Server Error'});
    }

})
//Suggestion API (auto complete)
app.get('/api/suggestions', async (req, res) => {
    const query = req.query.query || '';
    try {
      const suggestions = await Laptop.find({
        name: { $regex: query, $options: 'i' }
      })
      .limit(30)
      .select('name laptop_id img_link price processor ram rating laptop_brand');
  
      res.json(suggestions);
    } catch (err) {
      console.error('Error fetching suggestions:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //Filer API
  app.get('/api/filter', async (req, res) => {
    const { processor, ram, os, storage, price } = req.query;
  
    let filter = {};
  
    if (processor) {
      filter.processor = { $regex: processor, $options: 'i' };
    }
    if (ram) {
      filter.ram = { $regex: ram, $options: 'i' };
    }
    if (os) {
      filter.os = { $regex: os, $options: 'i' };
    }
    if (storage) {
      filter.storage = { $regex: storage, $options: 'i' };
    }
    if (price) {
      const [minPrice, maxPrice] = price.split('-').map(Number);
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    try {
      const laptops = await Laptop.find(filter);
      res.status(200).json({ success: true, laptops });
    } catch (err) {
      console.error('Error fetching filtered laptops:', err.message);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });

//Comment API
app.post('/api/comment',async(req,res)=>{
    const {name,comment}=req.body;
    try{
        const newComment=new Comment({
            name,
            comment
        });
        // console.log(newComment);
        await newComment.save();
        res.status(200).json({success:true,message:'Comment added successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Server Error'});
    }
});
app.listen(8080,()=>{
    console.log('Server Started at port 8080');
})