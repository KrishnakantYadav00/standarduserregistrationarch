const express=require("express");

const router=express.Router();


const {
addWishlist,
getWishlist,
removeWishlist,
clearWishlist

}=require("../controllers/wishlistController");


const auth=require("../middleware/authMiddleware");



router.post(
"/add",
auth,
addWishlist
);


router.get(
"/",
auth,
getWishlist
);


router.delete(
"/remove",
auth,
removeWishlist
);


router.delete(
"/clear",
auth,
clearWishlist
);



module.exports=router;