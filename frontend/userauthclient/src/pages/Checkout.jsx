import {useContext} from "react";
import {CartContext} from "../context/CartContext";
import {useEffect} from "react";

function Checkout(){

const {cart,fetchCart}=useContext(CartContext);


useEffect(()=>{

fetchCart();

},[]);


const total = cart.reduce(
(total,item)=>
total + ((item.product ? item.product.price : 0) * item.quantity),
0
);


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


<button>
Place Order
</button>


</div>


</div>

)

}


export default Checkout;