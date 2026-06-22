const express=require("express");
const cors=require("cors");

require("dotenv").config();
const orderRoutes=
require("./routes/orderRoutes");
const cartRoutes=require("./routes/cartRoutes");
const productRoutes=require("./routes/productRoutes");
const wishlistRoutes=require("./routes/wishlistRoutes");
const reviewRoutes=require("./routes/reviewRoutes");

const connectDB=require("./config/db"); 


const app = express();  


// middleware
app.use(cors());

app.use(express.json());


// database
connectDB();


// routes
app.use(
"/api/admin",
require("./routes/adminRoutes")
);
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

app.use(
"/api/reviews",
reviewRoutes
);

app.use(
"/api/payments",
require("./routes/paymentRoutes")
);


// server
app.listen(
process.env.PORT,
()=>console.log("Server running")
);