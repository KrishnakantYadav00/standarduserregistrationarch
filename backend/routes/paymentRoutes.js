const router=require("express").Router();

const {
createPayment,
verifyPayment,
getPayments
}=require("../controllers/paymentController");


router.post(
"/create",
createPayment
);


router.put(
"/verify/:id",
verifyPayment
);


router.get(
"/",
getPayments
);


module.exports=router;
