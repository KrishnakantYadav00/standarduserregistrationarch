import {useContext} from "react";
import {CartContext} from "../context/CartContext";

const ProductCard=({product})=>{
const {addToCart}=useContext(CartContext);

return (

<div>

<h3>{product.name}</h3>

<p>{product.description}</p>

<p>
₹{product.price}
</p>
<button
onClick={()=>addToCart(product)}
>
Add To Cart
</button>
<p>
{product.category}
</p>

<p>
Stock: {product.stock}
</p>



</div>

)


}


export default ProductCard;