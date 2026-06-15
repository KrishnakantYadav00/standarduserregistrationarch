import {useContext,useEffect} from "react";
import {CartContext} from "../context/CartContext";


function Cart(){

const {
cart,
fetchCart,
removeFromCart,
updateQuantity
}=useContext(CartContext);


useEffect(()=>{

fetchCart();

},[]);



return (

<div>

<h1>Cart</h1>


{
cart.map(item=>(

<div key={item._id}>


<h3>
{item.product.name}
</h3>


<p>
₹ {item.product.price}
</p>


<p>
Quantity:
{item.quantity}
</p>


<button
onClick={()=>updateQuantity(
item._id,
item.quantity+1
)}
>
+
</button>


<button
onClick={()=>removeFromCart(item._id)}
>
Remove
</button>



</div>

))
}

<a href="/checkout">

<button>
Proceed To Checkout
</button>

</a>
</div>

)

}

export default Cart;