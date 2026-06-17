const express=require("express");

const router=express.Router();

const {

placeOrder,
getOrders,
cancelOrder

}=require("../controllers/orderController");



router.post(
"/",
placeOrder
);


router.get(
"/",
getOrders
);


router.put(
"/cancel/:id",
cancelOrder
);


module.exports=router;