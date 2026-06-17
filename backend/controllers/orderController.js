const Cart=require("../models/Cart");
const Order=require("../models/Order");


// PLACE ORDER

exports.placeOrder=async(req,res)=>{

try{

const cartItems=
await Cart.find()
.populate("product");


if(cartItems.length===0){

return res.status(400).json({
message:"Cart is empty"
});

}


const items=
cartItems.map(item=>({

product:item.product._id,

quantity:item.quantity,

price:item.product.price

}));


const totalAmount=
cartItems.reduce(

(total,item)=>

total +
(item.product.price * item.quantity),

0

);


const order=
await Order.create({

user:null,

items,

totalAmount,

status:"Placed"

});


await Cart.deleteMany();


res.status(201).json(order);

}
catch(err){

res.status(500).json(err);

}

};




// VIEW ORDERS

exports.getOrders=async(req,res)=>{

try{

const orders=
await Order.find()
.populate("items.product");


res.json(orders);

}
catch(err){

res.status(500).json(err);

}

};




// CANCEL ORDER

exports.cancelOrder=async(req,res)=>{

try{

const order=
await Order.findByIdAndUpdate(

req.params.id,

{
status:"Cancelled"
},

{
new:true
}

);


res.json(order);

}
catch(err){

res.status(500).json(err);

}

};