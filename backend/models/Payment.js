const mongoose=require("mongoose");


const paymentSchema=new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

order:{
type:mongoose.Schema.Types.ObjectId,
ref:"Order"
},


amount:{
type:Number,
required:true
},


paymentId:{
type:String
},


status:{
type:String,
enum:[
"Created",
"Success",
"Failed"
],
default:"Created"
}


},
{
timestamps:true
});


module.exports =
mongoose.model("Payment",paymentSchema);
