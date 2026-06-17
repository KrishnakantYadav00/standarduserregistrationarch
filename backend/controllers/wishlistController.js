const Wishlist=require("../models/Wishlist");

//add any product to wishlist
exports.addWishlist = async(req,res)=>{

try{

const {productId}=req.body;

let wishlist =
await Wishlist.findOne({
user:req.user.id
});


if(!wishlist){

wishlist=await Wishlist.create({
user:req.user.id,
products:[productId]
});

}
else{

if(
!wishlist.products.includes(productId)
){

wishlist.products.push(productId);

await wishlist.save();

}

}


res.json({
message:"Added to wishlist",
wishlist
});


}

catch(err){

res.status(500).json({
error:err.message
})

}

}

exports.getWishlist = async(req,res)=>{

try{

//Get Wishlist function
const wishlist =
await Wishlist.findOne({
user:req.user.id
})
.populate("products");


res.json(
wishlist || {products:[]}
);


}

catch(err){

res.status(500).json({
error:err.message
})

}

}
//remove a product 
exports.removeWishlist = async(req,res)=>{

try{

const {productId}=req.body;


const wishlist =
await Wishlist.findOne({
user:req.user.id
});


wishlist.products =
wishlist.products.filter(
p=>p.toString()!==productId
);


await wishlist.save();



res.json({
message:"Removed from wishlist"
})


}

catch(err){

res.status(500).json({
error:err.message
})

}


}

//clear whole of the wishlist 
exports.clearWishlist = async(req,res)=>{

try{

const wishlist =
await Wishlist.findOne({
user:req.user.id
});


wishlist.products=[];


await wishlist.save();


res.json({
message:"Wishlist cleared"
})


}

catch(err){

res.status(500).json({
error:err.message
})

}


}
// DEV BYPASS: Get all wishlists in the database
exports.getAllWishlists = async(req,res)=>{
try{
  const wishlists = await Wishlist.find().populate("products");
  res.json(wishlists);
}catch(err){
  res.status(500).json({error:err.message})
}
}
