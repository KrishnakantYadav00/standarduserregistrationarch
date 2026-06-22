const User=require("./models/user");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
require("dotenv").config();



mongoose.connect(process.env.MONGO_URI)
.then(async()=>{


const hashed =
await bcrypt.hash(
"admin",
10
);


await User.updateOne(
{
email:"krishna@gmail.com"
},
{
password:hashed,
role:"admin"
}
);


console.log("admin fixed");

process.exit();

});