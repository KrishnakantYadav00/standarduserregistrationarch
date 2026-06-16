import {useContext} from "react";
import {CartContext} from "../context/CartContext";

import {toast} from "react-toastify";

import {addWishlist} from "../api/wishlistApi";


const ProductCard=({product})=>{


const {addToCart}=useContext(CartContext);



const handleWishlist=async()=>{

try{

await addWishlist(product._id);


toast.success(
"Added to Wishlist ❤️"
);


}
catch(error){

toast.error(
"Failed to add Wishlist"
);

}

}



return (

<div>


<h3>
{product.name}
</h3>


<p>
{product.description}
</p>


<p>
₹{product.price}
</p>



<button

onClick={()=>addToCart(product)}

>

Add To Cart

</button>



<button

onClick={handleWishlist}

>

❤️ Wishlist

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