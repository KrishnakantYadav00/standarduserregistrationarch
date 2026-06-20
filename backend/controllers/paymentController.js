const Payment=require("../models/Payment");


exports.createPayment=async(req,res)=>{

try{

const payment =
await Payment.create({

order:req.body.orderId,

amount:req.body.amount,

paymentId:
"PAY_"+Date.now()

});


res.json(payment);

}
catch(err){

res.status(500).json({
message:"Payment creation failed",
error:err.message
});

}

};


exports.verifyPayment=async(req,res)=>{

try{

const payment =
await Payment.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
},

{
new:true
}

);


res.json(payment);

}
catch(err){

res.status(500).json({
message:"Payment verification failed",
error:err.message
});

}

};


exports.getPayments=async(req,res)=>{

try{

const payments =
await Payment.find()
.populate("order");


res.json(payments);

}
catch(err){

res.status(500).json({
message:"Failed to fetch payments",
error:err.message
});

}

};
