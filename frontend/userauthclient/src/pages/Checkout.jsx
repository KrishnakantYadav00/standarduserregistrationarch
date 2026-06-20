import {useContext,useState} from "react";
import {CartContext} from "../context/CartContext";
import {useEffect} from "react";
import {placeOrder} from "../api/orderApi";
import {createPayment,verifyPayment} from "../api/paymentApi";
import {toast} from "react-toastify";

function Checkout(){

const {cart,fetchCart}=useContext(CartContext);
const [order,setOrder]=useState(null);
const [paying,setPaying]=useState(false);
const [savedTotal,setSavedTotal]=useState(0);


useEffect(()=>{

fetchCart();

},[]);


const total = cart.reduce(
(total,item)=>
total + ((item.product ? item.product.price : 0) * item.quantity),
0
);

const handlePlaceOrder = async()=>{

try{

const currentTotal=total;
const res = await placeOrder();

setOrder(res.data);
setSavedTotal(currentTotal);

toast.success(
"Order placed successfully"
);

fetchCart();

}
catch(err){

toast.error(
"Failed to place order"
);

console.log(err);

}

};


const pay=async()=>{

if(!order){
toast.error("Place an order first");
return;
}

setPaying(true);

try{

const res =
await createPayment(
order._id,
savedTotal
);


toast.success(
"Payment Created"
);


await verifyPayment(
res.data._id,
"Success"
);


toast.success(
"Payment Successful"
);

setOrder(null);

}

catch(err){

toast.error(
"Payment Failed"
);

}

setPaying(false);

};


return (

<div>

<h1>Checkout</h1>


<div>

<h2>Order Summary</h2>


{
cart.map(item=>(

<div key={item._id}>

<h3>
{item.product ? item.product.name : "Product unavailable"}
</h3>

<p>
Quantity: {item.quantity}
</p>

<p>
Price: ₹{item.product ? item.product.price : "N/A"}
</p>


</div>

))
}


<h2>
Total Amount: ₹{total}
</h2>


</div>


<div>

<h2>Shipping Details</h2>


<input
placeholder="Full Name"
/>


<br/>


<input
placeholder="Address"
/>


<br/>


<input
placeholder="Phone Number"
/>


<br/>


{!order ? (

<button
onClick={handlePlaceOrder}
>
Place Order
</button>

) : (

<button
onClick={pay}
disabled={paying}
>
{paying ? "Processing..." : "Pay Now"}
</button>

)}


</div>


</div>

)

}


export default Checkout;