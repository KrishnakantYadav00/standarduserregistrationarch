import {useContext} from "react";
import {CartContext} from "../context/CartContext";
import {Link} from "react-router-dom";

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


<Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
<h3>
{product.name}
</h3>
</Link>


<p>
{product.description}
</p>


<p>
₹{product.price}
</p>

<p>
Rating: {product.averageRating ? product.averageRating.toFixed(1) : 0} / 5 ({product.numReviews || 0} reviews)
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

<Link to={`/products/${product._id}`}>
<button>
View / Add Review
</button>
</Link>



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