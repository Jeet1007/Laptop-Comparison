const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LaptopSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
    }, 
    image:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },

})

model.exports=mongoose.model('Laptop',LaptopSchema);
