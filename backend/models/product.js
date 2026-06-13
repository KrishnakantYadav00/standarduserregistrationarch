const mongoose=require("mongoose");


const prodSchema=new mongoose.Schema({

name:{
type:String,
required:true
},

description:{
type:String,
unique:true,

},

price:{
type:Number,
required:true
},
category:{type:String,required:true},
stock:{type:Number,required:true},},{

timestamps:true
});


module.exports=mongoose.model("Product",prodSchema);