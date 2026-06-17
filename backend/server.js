const express=require("express");
const cors=require("cors");

require("dotenv").config();
const orderRoutes=
require("./routes/orderRoutes");
const cartRoutes=require("./routes/cartRoutes");
const productRoutes=require("./routes/productRoutes");
const wishlistRoutes=require("./routes/wishlistRoutes");

const connectDB=require("./config/db"); 


const app = express();  


// middleware
app.use(cors());

app.use(express.json());


// database
connectDB();


// routes

app.use(
"/api/auth",
require("./routes/authRoutes")
);
app.use(
"/api/orders",
orderRoutes
);

app.use(
"/api/cart",
cartRoutes
);


app.use(
"/api/products",
productRoutes
);


app.use(
"/api/wishlist",
wishlistRoutes
);


// server
app.listen(
process.env.PORT,
()=>console.log("Server running")
);