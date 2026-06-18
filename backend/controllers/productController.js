const Product = require("../models/product");


// CREATE PRODUCT
const createProduct = async (req,res)=>{

    try{

        const product = await Product.create(req.body);

        res.status(201).json(product);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// GET ALL PRODUCTS
const getProducts = async(req,res)=>{

    try{

        const products = await Product.find();

        res.json(products);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// UPDATE PRODUCT
const updateProduct = async(req,res)=>{

    try{

        const product =
        await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );


        res.json(product);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// DELETE PRODUCT
const deleteProduct = async(req,res)=>{

    try{

        await Product.findByIdAndDelete(
            req.params.id
        );


        res.json({
            message:"Product deleted"
        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// GET PRODUCT BY ID
const getProductById = async(req,res)=>{

    try{

        const product = await Product.findById(req.params.id);
        
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.json(product);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports={
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};