const express=require("express");
const cors=require("cors");
require("dotenv").config();
const cartRoutes=require("./routes/cartRoutes");
const productRoutes =
require("./routes/productRoutes");
const connectDB=require("./config/db");
const wishlistRoutes =
require("./routes/wishlistRoutes");


app.use(
"/api/wishlist",
wishlistRoutes
);

connectDB();


const app=express();


app.use(cors());

app.use(express.json()); 


app.use(
"/api/auth",
require("./routes/authRoutes")
);
app.use(
"/api/cart",
cartRoutes
);
app.use(
"/api/products",
require("./routes/productRoutes")
);



app.listen(
process.env.PORT,
()=>console.log("Server running")
);