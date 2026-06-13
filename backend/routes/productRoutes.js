const express=require("express");

const router=express.Router();


const {

createProduct,
getProducts,
updateProduct,
deleteProduct

}=require("../controllers/productController");



router.post(
"/",
createProduct
);


router.get(
"/",
getProducts
);



router.put(
"/:id",
updateProduct
);



router.delete(
"/:id",
deleteProduct
);
const getProductById = async(req,res)=>{

    try{

        const product =
        await Product.findById(req.params.id);


        res.json(product);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


module.exports=router;