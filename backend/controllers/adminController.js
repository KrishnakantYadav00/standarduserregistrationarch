const User=require("../models/user");
const Product=require("../models/product");
const Order=require("../models/Order");


// ─── Dashboard Stats ──────────────────────────────────────────────────────────

exports.getStats=async(req,res)=>{

  try{

    const totalUsers =
    await User.countDocuments();

    const totalProducts =
    await Product.countDocuments();

    const totalOrders =
    await Order.countDocuments();

    const revenue =
    await Order.aggregate([
      {
        $group:{
          _id:null,
          total:{
            $sum:"$totalAmount"
          }
        }
      }
    ]);

    res.json({
      users:totalUsers,
      products:totalProducts,
      orders:totalOrders,
      revenue: revenue[0]?.total || 0
    });

  }
  catch(err){
    res.status(500).json({ message:err.message });
  }

};


// ─── Admin Product CRUD ───────────────────────────────────────────────────────

// GET all products
exports.getAdminProducts = async(req,res)=>{

  try{

    const products = await Product.find().sort({ createdAt:-1 });
    res.json(products);

  }
  catch(err){
    res.status(500).json({ message:err.message });
  }

};


// POST create product
exports.createAdminProduct = async(req,res)=>{

  try{

    const { name, description, price, category, stock } = req.body;

    if(!name || !price || !category || !stock){
      return res.status(400).json({
        message:"name, price, category and stock are required"
      });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock)
    });

    res.status(201).json(product);

  }
  catch(err){
    res.status(500).json({ message:err.message });
  }

};


// PUT update product by id
exports.updateAdminProduct = async(req,res)=>{

  try{

    const { name, description, price, category, stock } = req.body;

    const product =
    await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock },
      { new:true, runValidators:true }
    );

    if(!product){
      return res.status(404).json({ message:"Product not found" });
    }

    res.json(product);

  }
  catch(err){
    res.status(500).json({ message:err.message });
  }

};


// DELETE product by id
exports.deleteAdminProduct = async(req,res)=>{

  try{

    const product =
    await Product.findByIdAndDelete(req.params.id);

    if(!product){
      return res.status(404).json({ message:"Product not found" });
    }

    res.json({ message:"Product deleted successfully" });

  }
  catch(err){
    res.status(500).json({ message:err.message });
  }

};