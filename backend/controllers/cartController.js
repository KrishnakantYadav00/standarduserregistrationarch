const Cart=require("../models/Cart");


// ADD

exports.addToCart=async(req,res)=>{

try{

const item=await Cart.create(req.body);

res.status(201).json(item);

}
catch(err){

res.status(500).json(err);

}

};



// GET CART

exports.getCart=async(req,res)=>{

const cart=await Cart
.find()
.populate("product");


res.json(cart);

};



// UPDATE

exports.updateCart=async(req,res)=>{


const item=await Cart.findByIdAndUpdate(

req.params.id,

{
quantity:req.body.quantity
},

{
new:true
}

);


res.json(item);


};




// DELETE

exports.removeCart=async(req,res)=>{


await Cart.findByIdAndDelete(req.params.id);


res.json({
message:"removed"
});


};