/**
 * seedOrders.js
 * Wipes all existing orders and seeds 3 fresh demo orders.
 * Run: node seedOrders.js
 */

const mongoose = require("mongoose");
const bcrypt    = require("bcryptjs");
require("dotenv").config();

const User    = require("./models/user");
const Product = require("./models/product");
const Order   = require("./models/Order");


async function seed(){

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // ── 1. Wipe all existing orders ──────────────────────────────────────────
  await Order.deleteMany({});
  console.log("Cleared existing orders");

  // ── 2. Ensure 3 demo customers exist ─────────────────────────────────────
  const demoUsers = [
    { name:"Alice Demo",   email:"alice@demo.com",   password:"demo1234" },
    { name:"Bob Demo",     email:"bob@demo.com",     password:"demo1234" },
    { name:"Charlie Demo", email:"charlie@demo.com", password:"demo1234" },
  ];

  const userDocs = [];

  for(const u of demoUsers){
    let existing = await User.findOne({ email: u.email });
    if(!existing){
      const hash = await bcrypt.hash(u.password, 10);
      existing   = await User.create({ name:u.name, email:u.email, password:hash });
      console.log(`Created user: ${u.email}`);
    } else {
      console.log(`User exists: ${u.email}`);
    }
    userDocs.push(existing);
  }

  // ── 3. Grab up to 3 products from DB ─────────────────────────────────────
  const products = await Product.find().limit(3);

  if(products.length === 0){
    console.error("No products found — add at least 1 product first, then re-run.");
    process.exit(1);
  }

  // ── 4. Create 3 demo orders ───────────────────────────────────────────────
  const orderData = [
    {
      user  : userDocs[0]._id,
      items : [{ product: products[0]._id, quantity:2, price: products[0].price }],
      totalAmount: products[0].price * 2,
      status:"Placed"
    },
    {
      user  : userDocs[1]._id,
      items : [
        { product: products[0]._id, quantity:1, price: products[0].price },
        ...(products[1]
          ? [{ product: products[1]._id, quantity:1, price: products[1].price }]
          : [])
      ],
      totalAmount:
        products[0].price +
        (products[1] ? products[1].price : 0),
      status:"Placed"
    },
    {
      user  : userDocs[2]._id,
      items : [{ product: products[products.length-1]._id, quantity:3, price: products[products.length-1].price }],
      totalAmount: products[products.length-1].price * 3,
      status:"Placed"
    },
  ];

  await Order.insertMany(orderData);
  console.log("Created 3 fresh demo orders");

  // ── 5. Summary ────────────────────────────────────────────────────────────
  const totalUsers   = await User.countDocuments();
  const totalOrders  = await Order.countDocuments();
  const totalProducts= await Product.countDocuments();
  const rev          = await Order.aggregate([{$group:{_id:null,total:{$sum:"$totalAmount"}}}]);
  const revenue      = rev[0]?.total || 0;

  console.log("\n── Dashboard Preview ──────────────────────");
  console.log(`Users:    ${totalUsers}`);
  console.log(`Orders:   ${totalOrders}`);
  console.log(`Products: ${totalProducts}`);
  console.log(`Revenue:  ₹${revenue}`);
  console.log("──────────────────────────────────────────\n");

  process.exit(0);

}

seed().catch(err=>{ console.error(err); process.exit(1); });
